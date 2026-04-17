import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { formatPrice } from "@/lib/store";

const CartDrawer = () => {
  const { t, dir } = useLang();
  const { items, isOpen, setOpen, setQty, remove, total, totalAfn, clear } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-foreground/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: dir === "rtl" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: dir === "rtl" ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 ${dir === "rtl" ? "left-0" : "right-0"} bottom-0 z-[101] w-full max-w-md bg-card shadow-2xl flex flex-col`}
          >
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-foreground">{t("your_cart")}</h2>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground">{t("cart_empty")}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex gap-3 p-3 bg-secondary/50 rounded-xl">
                      {product.image_url && (
                        <img src={product.image_url} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">{product.name}</p>
                        <p className="text-accent font-bold text-sm">{formatPrice(product.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => setQty(product.id, qty - 1)} className="p-1 rounded bg-card border border-border hover:bg-primary/10">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">{qty}</span>
                          <button onClick={() => setQty(product.id, qty + 1)} className="p-1 rounded bg-card border border-border hover:bg-primary/10">
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => remove(product.id)} className="p-1 rounded text-destructive hover:bg-destructive/10 mr-auto rtl:ml-auto rtl:mr-0">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("total")} ({t("usd")})</span>
                  <span className="font-bold text-foreground">{formatPrice(total, "USD")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("total")} ({t("afn")})</span>
                  <span className="font-bold text-accent">{formatPrice(totalAfn, "AFN")}</span>
                </div>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm text-center hover:opacity-90 transition-opacity"
                >
                  {t("checkout")}
                </Link>
                <button onClick={clear} className="w-full py-2 text-xs text-muted-foreground hover:text-destructive transition-colors">
                  {t("remove")} - clear all
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
