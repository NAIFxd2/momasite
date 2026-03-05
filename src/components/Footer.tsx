import { Link } from "react-router-dom";
import { Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import { useContent } from "@/content/ContentContext";

export default function Footer() {
  const { content } = useContent();
  const g = content.global;
  const waLink = `https://wa.me/${g.whatsappNumber}`;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="font-editorial text-3xl font-semibold">Moma</div>
              <div
                className="text-[10px] font-body font-semibold tracking-[0.25em] uppercase"
                style={{ color: "hsl(var(--rose-accent))" }}
              >
                Cookie Lab
              </div>
            </div>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              {g.footerDescription}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-editorial text-lg mb-5">Navegação</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "Sabores", href: "/sabores" },
                { label: "Nossa Loja", href: "/loja" },
                { label: "Sobre", href: "/sobre" },
                { label: "Contato", href: "/contato" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-editorial text-lg mb-5">Contato</h4>
            <div className="flex flex-col gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <MessageCircle size={16} style={{ color: "hsl(var(--rose-accent))" }} />
                WhatsApp
              </a>
              <a
                href={g.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Instagram size={16} style={{ color: "hsl(var(--rose-accent))" }} />
                {g.instagramHandle}
              </a>
              <div className="flex items-center gap-3 font-body text-sm text-primary-foreground/70">
                <MapPin size={16} style={{ color: "hsl(var(--rose-accent))" }} />
                Salvador, Bahia
              </div>
              <div className="flex items-start gap-3 font-body text-sm text-primary-foreground/70">
                <Clock size={16} style={{ color: "hsl(var(--rose-accent))" }} className="mt-0.5 shrink-0" />
                <span>Seg–Sex: 9h às 18h<br />Sáb: 9h às 14h</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t text-center font-body text-xs text-primary-foreground/40"
          style={{ borderColor: "hsl(210 40% 35%)" }}
        >
          © {new Date().getFullYear()} {g.brandName} — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
