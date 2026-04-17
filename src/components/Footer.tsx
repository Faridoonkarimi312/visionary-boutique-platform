import { Link } from "react-router-dom";
import logo from "@/assets/karimi-logo-new.png";
import { Globe, MessageCircle, Share2, Play, Mail, Phone, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-card shadow-md">
                <img src={logo} alt="Karimi" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-xl text-silver-gradient">KARIMI</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t("hero_desc")}
            </p>
            <div className="flex gap-3 mt-4">
              {[Globe, MessageCircle, Share2, Play].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">{t("quick_links")}</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: "/", label: t("home") },
                { to: "/products", label: t("products") },
                { to: "/about", label: t("about") },
                { to: "/contact", label: t("contact") },
              ].map(l => (
                <Link key={l.to} to={l.to} className="text-muted-foreground hover:text-primary text-xs transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">{t("categories")}</h4>
            <div className="flex flex-col gap-2">
              {["الکترونیک", "اکسسوری", "مد و فشن", "زیبایی"].map(c => (
                <Link key={c} to="/products" className="text-muted-foreground hover:text-primary text-xs transition-colors">
                  {c}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">{t("contact_us")}</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-xs">info@karimi.store</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-xs">+93 700 000 000</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-xs">افغانستان، کابل</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Karimi Store
          </p>
          <p className="text-primary text-sm mt-2 font-display font-semibold">
            ✦ {t("made_by")} ✦
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
