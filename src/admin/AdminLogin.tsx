import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
    const { login } = useAuth();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        setTimeout(() => {
            const success = login(password);
            if (!success) {
                setError(true);
                setPassword("");
            }
            setLoading(false);
        }, 400);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "hsl(var(--secondary))" }}>
            <div className="w-full max-w-sm">
                <div className="card-premium p-8">
                    <div className="text-center mb-8">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ background: "hsl(var(--rose-light))" }}
                        >
                            <Lock size={24} style={{ color: "hsl(var(--primary))" }} />
                        </div>
                        <h1 className="font-editorial text-2xl text-primary mb-1">Painel Admin</h1>
                        <p className="font-body text-sm text-foreground/50">Moma Cookie Lab</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="font-body text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 block">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(false); }}
                                    className="w-full px-4 py-3 rounded-xl border font-body text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    style={{ borderColor: error ? "hsl(0 84% 60%)" : "hsl(var(--border))" }}
                                    placeholder="Digite a senha de admin"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {error && (
                                <p className="font-body text-xs mt-2" style={{ color: "hsl(0 84% 60%)" }}>
                                    Senha incorreta. Tente novamente.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Verificando..." : "Entrar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
