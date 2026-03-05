import { useContent } from "@/content/ContentContext";

export default function Sobre() {
  const { content } = useContent();
  const s = content.sobre;

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero editorial */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">{s.heroLabel}</p>
            <h1 className="font-editorial text-4xl md:text-5xl text-primary mb-6 leading-tight text-balance">
              {s.heroTitle}{" "}
              <em className="not-italic" style={{ color: "hsl(var(--rose-accent))" }}>
                {s.heroHighlight}
              </em>
            </h1>
            {s.heroParagraphs.map((p, i) => (
              <p key={i} className="font-body text-base text-foreground/60 leading-relaxed mb-5">
                {p}
              </p>
            ))}
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img src={s.heroImage} alt="Caixa Moma Cookie Lab" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg px-6 py-4 border border-border">
              <p className="font-body text-xs text-foreground/40 mb-0.5">Fundada em</p>
              <p className="font-editorial text-2xl text-primary font-semibold">{s.foundedYear}</p>
              <p className="font-body text-xs text-foreground/50">{s.foundedLocation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6" style={{ background: "hsl(var(--secondary))" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">{s.valuesLabel}</p>
            <h2 className="font-editorial text-3xl md:text-4xl text-primary">{s.valuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {s.values.map((v, i) => (
              <div key={v.title} className="card-premium p-8">
                <div className="font-editorial text-5xl font-bold mb-5 opacity-15" style={{ color: "hsl(var(--primary))" }}>
                  0{i + 1}
                </div>
                <h3 className="font-editorial text-xl text-primary mb-3">{v.title}</h3>
                <p className="font-body text-sm text-foreground/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial image + quote */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="order-2 md:order-1">
            <p className="section-label mb-4">{s.philosophyLabel}</p>
            <blockquote
              className="font-editorial text-2xl md:text-3xl leading-snug text-primary mb-6 pl-6 border-l-4"
              style={{ borderColor: "hsl(var(--rose-accent))" }}
            >
              {s.philosophyQuote}
            </blockquote>
            <p className="font-body text-base text-foreground/60 leading-relaxed">
              {s.philosophyDescription}
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
            <img src={s.philosophyImage} alt="Cookie artesanal Moma" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
