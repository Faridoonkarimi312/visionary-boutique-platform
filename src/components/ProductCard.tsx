import { useState } from "react";
import { motion } from "framer-motion";
import { type Product, formatPrice, dbValueToKey } from "@/lib/store";
import { ShoppingCart, Eye, ChevronDown, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

const PLACEHOLDER = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { add } = useCart();
  const { t } = useLang();
  const { toast } = useToast();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const priceAfn = product.price_afn || product.price * 70;
  const imgSrc = product.image_url || PLACEHOLDER;
  const categoryLabel = t(dbValueToKey(product.category));

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product);
    toast({ title: t("cart_added"), description: product.name });
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch(imgSrc);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${product.name.replace(/\s+/g, "-")}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({ title: t("image_downloaded") });
    } catch {
      // ignore
    }
  };

  const toggleOptions = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOptionsOpen(o => !o);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        whileHover={{ y: -6 }}
        className="group bg-card rounded-2xl overflow-hidden cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all"
      >
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Hover action buttons */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold flex items-center justify-center gap-1 hover:opacity-90"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {t("add_to_cart")}
            </button>
            <button
              onClick={handleDownload}
              title={t("download_image")}
              className="px-3 py-2 rounded-lg bg-card text-foreground text-xs font-semibold flex items-center gap-1 hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          {product.featured && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full shadow-md">
              ★
            </span>
          )}
        </div>

        <div className="p-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{categoryLabel}</p>
          <h3 className="font-display font-semibold text-foreground text-sm mb-2 line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex flex-col">
              <span className="text-primary font-bold text-base leading-tight">{formatPrice(product.price)}</span>
              <span className="text-accent text-[11px] font-semibold">{formatPrice(priceAfn, "AFN")}</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-accent text-xs">★</span>
              ))}
            </div>
          </div>

          {/* Options dropdown */}
          <div className="relative">
            <button
              onClick={toggleOptions}
              className="w-full flex items-center justify-between gap-2 py-2 px-3 rounded-lg bg-secondary/60 border border-border text-xs font-semibold text-foreground/80 hover:bg-secondary transition-colors"
            >
              <span>{t("options")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${optionsOpen ? "rotate-180" : ""}`} />
            </button>
            {optionsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                onClick={e => { e.preventDefault(); e.stopPropagation(); }}
                className="mt-2 p-3 rounded-lg bg-card border border-border space-y-2 text-xs"
              >
                <div>
                  <p className="text-muted-foreground mb-1">{t("color")}</p>
                  <div className="flex gap-1.5">
                    {["#1e293b", "#dc2626", "#2563eb", "#16a34a", "#a855f7"].map(c => (
                      <button
                        key={c}
                        onClick={e => { e.preventDefault(); e.stopPropagation(); }}
                        style={{ background: c }}
                        className="w-5 h-5 rounded-full border border-border hover:scale-110 transition-transform"
                        aria-label={c}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{t("size")}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {["S", "M", "L", "XL", "XXL"].map(s => (
                      <button
                        key={s}
                        onClick={e => { e.preventDefault(); e.stopPropagation(); }}
                        className="px-2 py-1 text-[10px] font-semibold rounded border border-border hover:border-primary hover:bg-primary/10 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
