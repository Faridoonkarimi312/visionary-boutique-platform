import { Link } from "react-router-dom";
import logo from "@/assets/karimi-logo.png";
import { Globe, MessageCircle, Share2, Play, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <img src={logo} alt="Karimi" className="h-12 w-auto mb-4" />
          <p className="text-foreground/50 text-xs leading-relaxed">
            فروشگاه آنلاین کریمی - تجربه خرید لوکس در سطح جهانی با بهترین محصولات پریمیوم
          </p>
          <div className="flex gap-3 mt-4">
            {[Globe, MessageCircle, Share2, Play].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full bg-secondary hover:bg-accent/20 transition-colors">
                <Icon className="w-4 h-4 text-foreground/60" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4 text-sm">لینک‌های سریع</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/", label: "خانه" },
              { to: "/products", label: "محصولات" },
              { to: "/about", label: "درباره ما" },
              { to: "/contact", label: "تماس با ما" },
            ].map(l => (
              <Link key={l.to} to={l.to} className="text-foreground/50 hover:text-accent text-xs transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4 text-sm">دسته‌بندی‌ها</h4>
          <div className="flex flex-col gap-2">
            {["الکترونیک", "اکسسوری", "مد و فشن", "زیبایی"].map(c => (
              <Link key={c} to="/products" className="text-foreground/50 hover:text-accent text-xs transition-colors">
                {c}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4 text-sm">تماس با ما</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              <span className="text-foreground/50 text-xs">info@karimi.store</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              <span className="text-foreground/50 text-xs">+93 700 000 000</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-foreground/50 text-xs">افغانستان، کابل</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 text-center">
        <p className="text-foreground/40 text-xs">
          © {new Date().getFullYear()} Karimi Store. تمامی حقوق محفوظ است.
        </p>
        <p className="text-accent/70 text-xs mt-2 font-display">
          ✦ ساخته شده توسط انجنیر فریدون کریمی ✦
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
