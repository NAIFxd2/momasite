import { useContent } from "@/content/ContentContext";

export default function Sabores() {
  const { content } = useContent();
  const s = content.sabores;
  const g = content.global;

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">{s.pageLabel}</p>
          <h1 className="font-editorial text-4xl md:text-5xl text-primary mb-4">
            {s.pageTitle}
          </h1>
          <p className="font-body text-base text-foreground/60 max-w-xl mx-auto">
            {s.pageDescription}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {s.flavors.map((flavor) => (
            <div key={flavor.name} className="card-premium overflow-hidden group">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={flavor.image}
                  alt={flavor.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {flavor.tag && (
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-pill text-xs font-body font-semibold text-white"
                    style={{ background: "hsl(var(--rose-accent))" }}
                  >
                    {flavor.tag}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-editorial text-xl text-primary mb-2">
                  {flavor.name}
                </h3>
                <p className="font-body text-sm text-foreground/60 leading-relaxed mb-5">
                  {flavor.description}
                </p>
                <a
                  href={`https://wa.me/${g.whatsappNumber}?text=Olá! Quero pedir o cookie ${encodeURIComponent(flavor.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rose text-sm py-2.5 px-6 w-full justify-center"
                >
                  Pedir este sabor
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-20 rounded-3xl p-12 text-center"
          style={{ background: "hsl(var(--secondary))" }}
        >
          <p className="section-label mb-3">{s.customCtaLabel}</p>
          <h2 className="font-editorial text-2xl md:text-3xl text-primary mb-4">
            {s.customCtaTitle}
          </h2>
          <p className="font-body text-sm text-foreground/60 mb-8 max-w-md mx-auto">
            {s.customCtaDescription}
          </p>
          <a
            href={`https://wa.me/${g.whatsappNumber}?text=Olá! Quero um sabor personalizado.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {s.customCtaButton}
          </a>
        </div>
      </div>
    </div>
  );
}
