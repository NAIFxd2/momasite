import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const ADMIN_PASSWORD = "moma2024";
const SESSION_KEY = "moma-admin-auth";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => sessionStorage.getItem(SESSION_KEY) === "true"
    );

    const login = useCallback((password: string) => {
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, "true");
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(SESSION_KEY);
        setIsAuthenticated(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
