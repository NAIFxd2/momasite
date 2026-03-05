import { useRef } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useHeroLoopAnimation } from "@/hooks/useHeroLoopAnimation";
import { useContent } from "@/content/ContentContext";

export default function ScrollHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { content } = useContent();
    const h = content.home;
    const g = content.global;

    useHeroLoopAnimation(canvasRef);

    return (
        <section className="hero-section">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                aria-label="Animação da caixa Moma Cookie Lab"
            />
            {/* Cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

            <div className="relative z-10 flex items-center min-h-screen px-6">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="max-w-xl animate-fade-up">
                        <p className="section-label mb-4 !text-white/70">{h.heroLabel}</p>
                        <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-6 text-balance">
                            {h.heroTitle}{" "}
                            <em className="not-italic" style={{ color: "hsl(var(--rose-accent))" }}>
                                {h.heroHighlight}
                            </em>{" "}
                            {h.heroTitleEnd}
                        </h1>
                        <p className="font-body text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-md">
                            {h.heroDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/sabores" className="btn-primary">Ver Sabores</Link>
                            <a href={`https://wa.me/${g.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn-rose">
                                Fazer Pedido
                            </a>
                        </div>
                        <div className="mt-10 flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {["A", "B", "C"].map((l) => (
                                    <div key={l} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center font-body text-xs font-semibold text-white">
                                        {l}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={13} fill="hsl(var(--gold))" className="text-gold" />
                                    ))}
                                </div>
                                <p className="font-body text-xs text-white/50 mt-0.5">{h.socialProofText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
