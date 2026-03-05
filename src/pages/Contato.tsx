import { MessageCircle, Instagram, MapPin, Clock, ArrowRight } from "lucide-react";
import { useContent } from "@/content/ContentContext";

export default function Contato() {
  const { content } = useContent();
  const c = content.contato;
  const g = content.global;
  const waLink = `https://wa.me/${g.whatsappNumber}`;

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">{c.pageLabel}</p>
          <h1 className="font-editorial text-4xl md:text-5xl text-primary mb-4">{c.pageTitle}</h1>
          <p className="font-body text-base text-foreground/60 max-w-lg mx-auto">{c.pageDescription}</p>
        </div>

        {/* Main contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <a href={`${waLink}?text=Olá! Quero fazer um pedido.`} target="_blank" rel="noopener noreferrer"
            className="card-premium p-8 flex items-start gap-6 group hover:border-primary transition-colors" style={{ borderWidth: "1.5px" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "hsl(142 50% 92%)" }}>
              <MessageCircle size={26} style={{ color: "hsl(142 60% 35%)" }} />
            </div>
            <div>
              <h2 className="font-editorial text-xl text-primary mb-1">WhatsApp</h2>
              <p className="font-body text-sm text-foreground/60 mb-3 leading-relaxed">{c.whatsappDescription}</p>
              <span className="font-body text-sm font-semibold flex items-center gap-2" style={{ color: "hsl(var(--primary))" }}>
                Chamar no WhatsApp
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </a>
          <a href={g.instagramUrl} target="_blank" rel="noopener noreferrer"
            className="card-premium p-8 flex items-start gap-6 group hover:border-primary transition-colors" style={{ borderWidth: "1.5px" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(30 80% 92%), hsl(300 50% 92%))" }}>
              <Instagram size={26} style={{ color: "hsl(300 50% 45%)" }} />
            </div>
            <div>
              <h2 className="font-editorial text-xl text-primary mb-1">Instagram</h2>
              <p className="font-body text-sm text-foreground/60 mb-1 leading-relaxed">{c.instagramDescription}</p>
              <p className="font-body text-sm text-foreground/40 mb-3">{g.instagramHandle}</p>
              <span className="font-body text-sm font-semibold flex items-center gap-2" style={{ color: "hsl(var(--primary))" }}>
                Seguir no Instagram
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          <div className="card-premium p-7 flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "hsl(var(--rose-light))" }}>
              <MapPin size={20} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div>
              <h3 className="font-editorial text-lg text-primary mb-1">{c.deliveryTitle}</h3>
              <p className="font-body text-sm text-foreground/60 leading-relaxed">{c.deliveryDescription}</p>
            </div>
          </div>
          <div className="card-premium p-7 flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "hsl(var(--rose-light))" }}>
              <Clock size={20} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div>
              <h3 className="font-editorial text-lg text-primary mb-1">{c.hoursTitle}</h3>
              <div className="font-body text-sm text-foreground/60 leading-relaxed space-y-0.5">
                {c.hours.map((h, i) => <p key={i}>{h}</p>)}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="text-center mb-10">
            <p className="section-label mb-3">Dúvidas frequentes</p>
            <h2 className="font-editorial text-3xl text-primary">FAQ</h2>
          </div>
          <div className="space-y-4">
            {c.faqs.map((faq) => (
              <div key={faq.q} className="card-premium p-7">
                <h3 className="font-editorial text-lg text-primary mb-2">{faq.q}</h3>
                <p className="font-body text-sm text-foreground/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 rounded-3xl p-12 text-center" style={{ background: "hsl(var(--primary))" }}>
          <h2 className="font-editorial text-2xl md:text-3xl text-white mb-4">{c.ctaTitle}</h2>
          <p className="font-body text-sm text-white/70 mb-8 max-w-sm mx-auto">{c.ctaDescription}</p>
          <a href={`${waLink}?text=Olá! Quero fazer um pedido na Moma Cookie Lab.`}
            target="_blank" rel="noopener noreferrer" className="btn-rose">
            {c.ctaButton}
          </a>
        </div>
      </div>
    </div>
  );
}
