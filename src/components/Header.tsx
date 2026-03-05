import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useContent } from "@/content/ContentContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Sabores", href: "/sabores" },
  { label: "Nossa Loja", href: "/loja" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { content } = useContent();
  const g = content.global;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Don't show header on admin pages
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      style={{ background: "hsl(var(--primary))" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between py-4">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-editorial text-2xl font-semibold text-white tracking-tight group-hover:opacity-80 transition-opacity">
            Moma
          </span>
          <span
            className="text-[10px] font-body font-semibold tracking-[0.25em] uppercase"
            style={{ color: "hsl(var(--rose-light))" }}
          >
            Cookie Lab
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-body text-sm font-medium transition-all duration-200 relative px-2 py-1 rounded-full ${location.pathname === link.href
                ? "text-white bg-white/20"
                : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`https://wa.me/${g.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rose text-sm py-2.5 px-5"
          >
            Fazer Pedido
          </a>
        </div>

        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden border-t border-white/20 px-6 py-6 flex flex-col gap-5 shadow-lg"
          style={{ background: "hsl(var(--primary))" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-body text-base font-medium transition-colors ${location.pathname === link.href
                ? "text-white"
                : "text-white/70 hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`https://wa.me/${g.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rose text-sm text-center mt-2"
          >
            Fazer Pedido
          </a>
        </div>
      )}
    </header>
  );
}
