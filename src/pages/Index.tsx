import { Link } from "react-router-dom";
import { Star, ArrowRight, Cookie, Award, Leaf, Package } from "lucide-react";
import ScrollHero from "@/components/ScrollHero";
import { useContent } from "@/content/ContentContext";

const craftIcons = [Cookie, Award, Leaf, Package];

export default function Index() {
  const { content } = useContent();
  const h = content.home;
  const g = content.global;
  const waLink = `https://wa.me/${g.whatsappNumber}`;

  return (
    <div className="min-h-screen">
      {/* ── HERO — Scroll-driven animation ── */}
      <ScrollHero />

      {/* ── FLAVORS PREVIEW ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">{h.flavorsLabel}</p>
            <h2 className="font-editorial text-3xl md:text-4xl text-primary">
              {h.flavorsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {h.featuredFlavors.map((flavor) => (
              <div key={flavor.name} className="card-premium overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-editorial text-xl text-primary mb-2">
                    {flavor.name}
                  </h3>
                  <p className="font-body text-sm text-foreground/60 leading-relaxed mb-4">
                    {flavor.description}
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm py-2 px-5"
                  >
                    Pedir
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/sabores"
              className="btn-primary inline-flex items-center gap-2"
            >
              Ver todos os sabores
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CRAFTSMANSHIP ── */}
      <section
        className="py-24 px-6"
        style={{ background: "hsl(var(--secondary))" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">{h.craftsmanshipLabel}</p>
            <h2 className="font-editorial text-3xl md:text-4xl text-primary">
              {h.craftsmanshipTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.craftsmanship.map((c, i) => {
              const Icon = craftIcons[i] || Cookie;
              return (
                <div key={c.title} className="card-premium p-7 text-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: "hsl(var(--rose-light))" }}
                  >
                    <Icon size={22} style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <h3 className="font-editorial text-lg text-primary mb-2">{c.title}</h3>
                  <p className="font-body text-sm text-foreground/60 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="py-24 px-6"
        style={{ background: "hsl(var(--secondary))" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">{h.testimonialsLabel}</p>
            <h2 className="font-editorial text-3xl md:text-4xl text-primary">
              {h.testimonialsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {h.testimonials.map((t) => (
              <div key={t.name} className="card-premium p-8">
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="hsl(var(--gold))" className="text-gold" />
                  ))}
                </div>
                <p className="font-body text-sm text-foreground/70 leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
                <div>
                  <p className="font-body text-sm font-semibold text-primary">{t.name}</p>
                  <p className="font-body text-xs text-foreground/40">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-4">{h.ctaLabel}</p>
          <h2 className="font-editorial text-3xl md:text-5xl text-primary mb-6 leading-tight">
            {h.ctaTitle}{" "}
            <em className="not-italic" style={{ color: "hsl(var(--rose-accent))" }}>
              {h.ctaHighlight}
            </em>{" "}
            {h.ctaTitleEnd}
          </h2>
          <p className="font-body text-base text-foreground/60 mb-10">
            {h.ctaDescription}
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rose text-base py-4 px-8"
          >
            {h.ctaButtonText}
          </a>
        </div>
      </section>
    </div>
  );
}
