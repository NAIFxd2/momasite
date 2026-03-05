import { useContent } from "@/content/ContentContext";
import { Cookie, Coffee, Sparkles, MapPin, Clock, Navigation } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    cookie: Cookie,
    coffee: Coffee,
    sparkles: Sparkles,
};

export default function Loja() {
    const { content } = useContent();
    const s = content.loja;
    const g = content.global;

    return (
        <div className="min-h-screen pt-28 pb-0">
            {/* Hero */}
            <section className="px-6 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="section-label mb-4">{s.heroLabel}</p>
                    <h1 className="font-editorial text-4xl md:text-6xl text-primary mb-6 leading-tight">
                        {s.heroTitle}{" "}
                        <em className="not-italic" style={{ color: "hsl(var(--rose-accent))" }}>
                            {s.heroHighlight}
                        </em>
                    </h1>
                    <p className="font-body text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                        {s.heroDescription}
                    </p>
                </div>
            </section>

            {/* Video Section */}
            <section className="relative overflow-hidden">
                {s.videoUrl ? (
                    <div className="relative">
                        <video
                            src={s.videoUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-[70vh] object-cover"
                        />
                        {/* Dark overlay with text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 flex items-end">
                            <div className="max-w-4xl mx-auto px-6 pb-16 w-full">
                                <p
                                    className="font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                                    style={{ color: "hsl(var(--rose-accent))" }}
                                >
                                    {s.videoLabel}
                                </p>
                                <h2 className="font-editorial text-3xl md:text-4xl text-white mb-4">
                                    {s.videoTitle}
                                </h2>
                                <p className="font-body text-base text-white/70 max-w-xl leading-relaxed">
                                    {s.videoDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Placeholder when no video is set */
                    <div
                        className="w-full py-32 flex flex-col items-center justify-center text-center px-6"
                        style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(210 50% 25%) 100%)" }}
                    >
                        <p
                            className="font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                            style={{ color: "hsl(var(--rose-accent))" }}
                        >
                            {s.videoLabel}
                        </p>
                        <h2 className="font-editorial text-3xl md:text-4xl text-white mb-4">
                            {s.videoTitle}
                        </h2>
                        <p className="font-body text-base text-white/70 max-w-xl leading-relaxed">
                            {s.videoDescription}
                        </p>
                    </div>
                )}
            </section>

            {/* Features */}
            <section className="py-24 px-6" style={{ background: "hsl(var(--secondary))" }}>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {s.features.map((feat, i) => {
                            const Icon = iconMap[feat.icon] || Sparkles;
                            return (
                                <div
                                    key={i}
                                    className="card-premium p-8 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110"
                                        style={{ background: "hsl(var(--rose-light))" }}
                                    >
                                        <Icon size={28} style={{ color: "hsl(var(--primary))" }} />
                                    </div>
                                    <h3 className="font-editorial text-xl text-primary mb-3">{feat.title}</h3>
                                    <p className="font-body text-sm text-foreground/60 leading-relaxed">
                                        {feat.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Map + Store Info */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="section-label mb-3">{s.mapLabel}</p>
                        <h2 className="font-editorial text-3xl md:text-4xl text-primary mb-4">
                            {s.mapTitle}
                        </h2>
                        <p className="font-body text-base text-foreground/60 max-w-xl mx-auto">
                            {s.mapDescription}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Map iframe */}
                        <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-lg border border-border h-[400px]">
                            <iframe
                                src={s.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localização Moma Cookie Lab"
                            />
                        </div>

                        {/* Store info card */}
                        <div className="card-premium p-8 flex flex-col justify-center gap-6">
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: "hsl(var(--rose-light))" }}
                                >
                                    <MapPin size={18} style={{ color: "hsl(var(--primary))" }} />
                                </div>
                                <div>
                                    <h4 className="font-editorial text-lg text-primary mb-1">Endereço</h4>
                                    <p className="font-body text-sm text-foreground/60">{s.address}</p>
                                    <p className="font-body text-xs text-foreground/40 mt-0.5">{s.addressDetails}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: "hsl(var(--rose-light))" }}
                                >
                                    <Clock size={18} style={{ color: "hsl(var(--primary))" }} />
                                </div>
                                <div>
                                    <h4 className="font-editorial text-lg text-primary mb-1">Horários</h4>
                                    {s.storeHours.map((h, i) => (
                                        <p key={i} className="font-body text-sm text-foreground/60">{h}</p>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=Rua+das+Dalias+516+Pituba+Salvador+BA`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-rose text-sm text-center py-3 px-6 mt-2 inline-flex items-center justify-center gap-2"
                            >
                                <Navigation size={16} />
                                Abrir no Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA bottom */}
            <section
                className="py-20 px-6 text-center"
                style={{ background: "hsl(var(--primary))" }}
            >
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-editorial text-3xl md:text-4xl text-white mb-4">
                        Venha nos visitar
                    </h2>
                    <p className="font-body text-base text-white/70 mb-8">
                        Cookies fresquinhos, cafés especiais e um espaço feito para encantar. Te esperamos!
                    </p>
                    <a
                        href={`https://wa.me/${g.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-rose text-base py-3.5 px-8 inline-flex items-center gap-2"
                    >
                        Falar no WhatsApp
                    </a>
                </div>
            </section>
        </div>
    );
}
