import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useContent } from "@/content/ContentContext";
import AdminLogin from "./AdminLogin";
import {
    LogOut, Home, Cookie, Info, Phone, Settings, ChevronLeft, ChevronRight, RotateCcw, Store
} from "lucide-react";
import HomeEditor from "./editors/HomeEditor";
import SaboresEditor from "./editors/SaboresEditor";
import LojaEditor from "./editors/LojaEditor";

import SobreEditor from "./editors/SobreEditor";
import ContatoEditor from "./editors/ContatoEditor";
import SiteEditor from "./editors/SiteEditor";

const sections = [
    { id: "home", label: "Home", icon: Home },
    { id: "sabores", label: "Sabores", icon: Cookie },
    { id: "loja", label: "Loja", icon: Store },
    { id: "sobre", label: "Sobre", icon: Info },
    { id: "contato", label: "Contato", icon: Phone },
    { id: "site", label: "Global", icon: Settings },
] as const;

type SectionId = (typeof sections)[number]["id"];

export default function AdminLayout() {
    const { isAuthenticated, logout } = useAuth();
    const { resetAll } = useContent();
    const [activeSection, setActiveSection] = useState<SectionId>("home");
    const [collapsed, setCollapsed] = useState(false);

    if (!isAuthenticated) return <AdminLogin />;

    const renderEditor = () => {
        switch (activeSection) {
            case "home": return <HomeEditor />;
            case "sabores": return <SaboresEditor />;
            case "loja": return <LojaEditor />;
            case "sobre": return <SobreEditor />;
            case "contato": return <ContatoEditor />;
            case "site": return <SiteEditor />;
        }
    };

    return (
        <div className="min-h-screen flex" style={{ background: "hsl(var(--secondary))" }}>
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300 ${collapsed ? "w-[72px]" : "w-[240px]"
                    }`}
                style={{ background: "hsl(var(--primary))" }}
            >
                {/* Brand */}
                <div className="p-5 flex items-center gap-3 border-b border-white/10">
                    {!collapsed && (
                        <div>
                            <p className="font-editorial text-lg text-white leading-none">Moma</p>
                            <p className="font-body text-[9px] text-white/50 tracking-[0.2em] uppercase">Admin</p>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="ml-auto p-1.5 rounded-lg hover:bg-white/10 text-white/60 transition-colors"
                    >
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 px-3 space-y-1">
                    {sections.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveSection(id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all ${activeSection === id
                                ? "bg-white/15 text-white font-medium"
                                : "text-white/60 hover:text-white hover:bg-white/8"
                                }`}
                        >
                            <Icon size={18} />
                            {!collapsed && <span>{label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Footer actions */}
                <div className="p-3 border-t border-white/10 space-y-1">
                    <button
                        onClick={() => {
                            if (confirm("Restaurar todos os textos e imagens para os valores originais?")) {
                                resetAll();
                            }
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-white/40 hover:text-white/70 hover:bg-white/8 transition-all"
                    >
                        <RotateCcw size={16} />
                        {!collapsed && <span>Resetar tudo</span>}
                    </button>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-white/40 hover:text-white/70 hover:bg-white/8 transition-all"
                    >
                        <LogOut size={16} />
                        {!collapsed && <span>Sair</span>}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main
                className={`flex-1 transition-all duration-300 ${collapsed ? "ml-[72px]" : "ml-[240px]"
                    }`}
            >
                <div className="max-w-4xl mx-auto px-6 py-8">
                    {/* Section header */}
                    <div className="mb-8">
                        <h1 className="font-editorial text-3xl text-primary mb-1">
                            {sections.find((s) => s.id === activeSection)?.label}
                        </h1>
                        <p className="font-body text-sm text-foreground/50">
                            Edite os textos e imagens desta seção do site.
                        </p>
                    </div>

                    {renderEditor()}
                </div>
            </main>
        </div>
    );
}
