import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { defaultContent, type SiteContent } from "./defaultContent";

const STORAGE_KEY = "moma-cms-content";
const VALID_SECTIONS: (keyof SiteContent)[] = ["global", "home", "sabores", "loja", "sobre", "contato"];

interface ContentContextType {
    content: SiteContent;
    updateSection: <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => void;
    updateField: (path: string, value: unknown) => void;
    removeField: (path: string) => void;
    resetSection: (section: keyof SiteContent) => void;
    resetAll: () => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

function deepMerge<T>(base: T, overrides: Partial<T>): T {
    if (!overrides) return base;
    const result = { ...base } as Record<string, unknown>;
    for (const key of Object.keys(overrides)) {
        const baseVal = (base as Record<string, unknown>)[key];
        const overVal = (overrides as Record<string, unknown>)[key];
        if (
            baseVal &&
            overVal &&
            typeof baseVal === "object" &&
            typeof overVal === "object" &&
            !Array.isArray(baseVal) &&
            !Array.isArray(overVal)
        ) {
            result[key] = deepMerge(baseVal, overVal as Partial<typeof baseVal>);
        } else if (overVal !== undefined) {
            result[key] = overVal;
        }
    }
    return result as T;
}

/** Remove stale keys (e.g. deleted "presentes" section) and empty-string image overrides */
function migrateOverrides(raw: Record<string, unknown>): Partial<SiteContent> {
    const cleaned: Record<string, unknown> = {};
    for (const key of VALID_SECTIONS) {
        if (raw[key] && typeof raw[key] === "object") {
            cleaned[key] = stripEmptyStrings(raw[key] as Record<string, unknown>);
        }
    }
    return cleaned as Partial<SiteContent>;
}

function stripEmptyStrings(obj: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
        if (v === "") continue; // skip empty-string overrides (broken image values)
        if (v && typeof v === "object" && !Array.isArray(v)) {
            const nested = stripEmptyStrings(v as Record<string, unknown>);
            if (Object.keys(nested).length > 0) result[k] = nested;
        } else {
            result[k] = v;
        }
    }
    return result;
}

function loadFromStorage(): Partial<SiteContent> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        const migrated = migrateOverrides(parsed);
        // Save migrated version back
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
    } catch {
        return {};
    }
}

function saveToStorage(overrides: Partial<SiteContent>) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch (e) {
        console.warn("Failed to save content to localStorage", e);
        // If quota exceeded, alert user
        if (e instanceof DOMException && e.name === "QuotaExceededError") {
            alert("Erro: O armazenamento está cheio. Tente usar imagens menores ou resetar o conteúdo.");
        }
    }
}

export function ContentProvider({ children }: { children: ReactNode }) {
    const [overrides, setOverrides] = useState<Partial<SiteContent>>(() => loadFromStorage());

    const content = deepMerge(defaultContent, overrides);

    useEffect(() => {
        saveToStorage(overrides);
    }, [overrides]);

    // Sync across tabs: when admin saves in one tab, the site tab picks it up
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                try {
                    setOverrides(e.newValue ? JSON.parse(e.newValue) : {});
                } catch { /* ignore */ }
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const updateSection = useCallback(<K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => {
        setOverrides((prev) => ({
            ...prev,
            [section]: { ...(prev[section] || {}), ...data },
        }));
    }, []);

    const updateField = useCallback((path: string, value: unknown) => {
        setOverrides((prev) => {
            const parts = path.split(".");
            const newOverrides = JSON.parse(JSON.stringify(prev)) as Record<string, unknown>;
            let current = newOverrides;
            for (let i = 0; i < parts.length - 1; i++) {
                if (!current[parts[i]] || typeof current[parts[i]] !== "object") {
                    current[parts[i]] = {};
                }
                current = current[parts[i]] as Record<string, unknown>;
            }
            current[parts[parts.length - 1]] = value;
            return newOverrides as Partial<SiteContent>;
        });
    }, []);

    const removeField = useCallback((path: string) => {
        setOverrides((prev) => {
            const newOverrides = JSON.parse(JSON.stringify(prev)) as Record<string, unknown>;
            const parts = path.split(".");
            let current = newOverrides;
            for (let i = 0; i < parts.length - 1; i++) {
                if (!current[parts[i]] || typeof current[parts[i]] !== "object") return prev;
                current = current[parts[i]] as Record<string, unknown>;
            }
            delete current[parts[parts.length - 1]];
            return newOverrides as Partial<SiteContent>;
        });
    }, []);

    const resetSection = useCallback((section: keyof SiteContent) => {
        setOverrides((prev) => {
            const next = { ...prev };
            delete next[section];
            return next;
        });
    }, []);

    const resetAll = useCallback(() => {
        setOverrides({});
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return (
        <ContentContext.Provider value={{ content, updateSection, updateField, removeField, resetSection, resetAll }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const ctx = useContext(ContentContext);
    if (!ctx) throw new Error("useContent must be used within ContentProvider");
    return ctx;
}

