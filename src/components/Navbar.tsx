import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Menu, X, Globe, User, Check } from "lucide-react";
import logo from "@/assets/karimi-logo-new.png";
import { useLang, type Lang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import SearchDialog from "./SearchDialog";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { t, lang, setLang, dir } = useLang();
  const { count, setOpen: setCartOpen } = useCart();

  const links = [
    { to: "/", label: t("home") },
    { to: "/products", label: t("products") },
    { to: "/about", label: t("about") },
    { to: "/contact", label: t("contact") },
  ];

  const langs: { code: Lang; label: string }[] = [
    { code: "fa", label: "فارسی" },
    { code: "ps", label: "پښتو" },
    { code: "en", label: "English" },
  ];

  return (
    <>
      <nav dir="ltr" className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* LOGO - always on the left */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-card border-2 border-primary/20 shadow-md">
              <img src={logo} alt="Karimi" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-lg text-silver-gradient hidden sm:block">KARIMI</span>
          </Link>

          {/* Center menu */}
          <div dir={dir} className="hidden md:flex items-center gap-1 mx-auto">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:scale-105 ${
                  location.pathname === link.to ? "text-primary bg-primary/10" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action buttons - always on the right */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t("search")}
              className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
            >
              <Search className="w-5 h-5 text-foreground/70" />
            </button>

            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label={t("language")}
                className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all hover:scale-110 flex items-center gap-1"
              >
                <Globe className="w-5 h-5 text-foreground/70" />
                <span className="text-[10px] font-bold uppercase">{lang}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 bg-card border border-border rounded-xl shadow-2xl py-2 min-w-[140px] z-50"
                    >
                      {langs.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className="w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-primary/10 transition-colors"
                        >
                          <span>{l.label}</span>
                          {lang === l.code && <Check className="w-4 h-4 text-primary" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <Link to="/admin" aria-label={t("admin_dashboard")} className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
              <User className="w-5 h-5 text-foreground/70" />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              aria-label={t("cart")}
              className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all hover:scale-110 relative"
            >
              <ShoppingCart className="w-5 h-5 text-foreground/70" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 rounded-full hover:bg-primary/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              dir={dir}
              className="md:hidden overflow-hidden bg-card border-t border-border"
            >
              <div className="p-4 flex flex-col gap-1">
                {links.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === link.to
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-accent border-t border-border mt-2 pt-3"
                >
                  {t("admin_dashboard")}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
};

export default Navbar;
