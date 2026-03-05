import { ArrowRight, Gift, Heart, Star } from "lucide-react";
import { useContent } from "@/content/ContentContext";

export default function Presentes() {
  const { content } = useContent();
  const p = content.presentes;
  const g = content.global;
  const waLink = `https://wa.me/${g.whatsappNumber}`;

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="section-label mb-4">{p.heroLabel}</p>
            <h1 className="font-editorial text-4xl md:text-5xl text-primary mb-6 leading-tight text-balance">
              {p.heroTitle}{" "}
              <em className="not-italic" style={{ color: "hsl(var(--rose-accent))" }}>
                {p.heroHighlight}
              </em>{" "}
              {p.heroTitleEnd}
            </h1>
            <p className="font-body text-base text-foreground/60 leading-relaxed mb-8">
              {p.heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`${waLink}?text=Olá! Quero montar um kit presente.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rose inline-flex items-center gap-2"
              >
                Montar meu kit
                <ArrowRight size={16} />
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Falar no WhatsApp
              </a>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img src={p.heroImage} alt="Caixa presente Moma Cookie Lab" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Unboxing steps */}
      <section className="py-20 px-6" style={{ background: "hsl(var(--secondary))" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">{p.unboxingLabel}</p>
            <h2 className="font-editorial text-3xl md:text-4xl text-primary">{p.unboxingTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.unboxingSteps.map((s) => (
              <div key={s.step} className="card-premium p-7">
                <div className="font-editorial text-4xl font-bold mb-4 opacity-20" style={{ color: "hsl(var(--rose-accent))" }}>
                  {s.step}
                </div>
                <h3 className="font-editorial text-lg text-primary mb-2">{s.title}</h3>
                <p className="font-body text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kits */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">{p.kitsLabel}</p>
            <h2 className="font-editorial text-3xl md:text-4xl text-primary">{p.kitsTitle}</h2>
            <p className="font-body text-sm text-foreground/60 mt-3 max-w-md mx-auto">{p.kitsDescription}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {p.kits.map((kit) => (
              <div key={kit.name} className="card-premium p-8 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "hsl(var(--rose-light))" }}>
                  <Gift size={20} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-editorial text-xl text-primary">{kit.name}</h3>
                    <span className="text-[11px] font-body font-semibold px-2.5 py-0.5 rounded-pill"
                      style={{ background: "hsl(var(--rose-light))", color: "hsl(var(--rose-foreground))" }}>
                      {kit.cookies}
                    </span>
                  </div>
                  <p className="font-body text-sm text-foreground/60 leading-relaxed mb-2">{kit.description}</p>
                  <p className="font-body text-xs text-foreground/40 flex items-center gap-1.5">
                    <Heart size={11} />{kit.ideal}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={`${waLink}?text=Olá! Quero saber sobre os kits de presente.`} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2">
              Consultar preços <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Photo + CTA */}
      <section className="px-6 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden relative" style={{ minHeight: "360px" }}>
            <img src={p.bottomCtaImage} alt="Variedade de cookies Moma" className="w-full h-80 object-cover object-center" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
              style={{ background: "hsl(var(--primary) / 0.72)" }}>
              <Star size={28} className="mb-3" style={{ color: "hsl(var(--rose-accent))" }} />
              <h2 className="font-editorial text-2xl md:text-3xl text-white mb-3">{p.bottomCtaTitle}</h2>
              <p className="font-body text-sm text-white/70 mb-6 max-w-sm">{p.bottomCtaDescription}</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-rose">Fazer Pedido</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
