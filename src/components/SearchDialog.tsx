import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getProducts, formatPrice, type Product } from "@/lib/store";
import { useLang } from "@/lib/i18n";

const SearchDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (open) {
      getProducts().then(setProducts);
      setQuery("");
    }
  }, [open]);

  const filtered = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            onClick={e => e.stopPropagation()}
            className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border"
          >
            <div className="p-4 border-b border-border flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t("search_placeholder")}
                className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query && filtered.length === 0 && (
                <p className="text-center text-muted-foreground p-8 text-sm">{t("no_products")}</p>
              )}
              {filtered.map(p => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
                >
                  {p.image_url && (
                    <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <span className="text-accent font-bold text-sm">{formatPrice(p.price)}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDialog;
