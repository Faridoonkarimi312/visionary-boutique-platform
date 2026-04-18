import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductReviews from "@/components/ProductReviews";
import { getProductById, sendMessage, formatPrice, dbValueToKey, type Product } from "@/lib/store";
import { ArrowRight, MessageCircle, ShoppingCart, Heart, Share2, Check, Download, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

const PLACEHOLDER = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [msgForm, setMsgForm] = useState({ sender_name: "", sender_email: "", sender_phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const { t } = useLang();
  const { add, setOpen } = useCart();

  useEffect(() => {
    if (id) {
      getProductById(id).then(p => { setProduct(p); setLoading(false); });
    }
  }, [id]);

  const imgSrc = product?.image_url || PLACEHOLDER;
  const priceAfn = product?.price_afn || (product ? product.price * 70 : 0);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSending(true);
    try {
      await sendMessage({ product_id: product.id, ...msgForm });
      toast({ title: "✓", description: t("message_sent") });
      setMsgForm({ sender_name: "", sender_email: "", sender_phone: "", message: "" });
      setShowMessageForm(false);
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
    setSending(false);
  };

  const handleDownload = async () => {
    if (!product) return;
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
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    add(product);
    setOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 text-center">
          <p className="text-muted-foreground text-lg">{t("no_products")}</p>
          <Link to="/products" className="text-accent mt-4 inline-block">{t("back_to_products")}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const colors = ["#1e293b", "#dc2626", "#2563eb", "#16a34a", "#a855f7", "#f59e0b"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <Link to="/products" className="inline-flex items-center gap-1 text-primary text-sm mb-6 hover:gap-2 transition-all">
            <ArrowRight className="w-4 h-4" />
            {t("back_to_products")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-card rounded-2xl overflow-hidden border border-border shadow-xl group"
            >
              <img src={imgSrc} alt={product.name} className="w-full aspect-square object-cover" />
              <button
                onClick={handleDownload}
                className="absolute top-4 right-4 p-3 rounded-full bg-card/95 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground shadow-lg transition-all opacity-0 group-hover:opacity-100"
                aria-label={t("download_image")}
                title={t("download_image")}
              >
                <Download className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full w-fit mb-4">
                {t(dbValueToKey(product.category))}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-6 p-5 bg-secondary/50 rounded-2xl">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t("usd")}</p>
                  <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t("afn")}</p>
                  <span className="text-3xl font-bold text-accent">{formatPrice(priceAfn, "AFN")}</span>
                </div>
              </div>

              {product.featured && (
                <div className="flex items-center gap-2 mb-6 text-sm text-accent">
                  <Check className="w-4 h-4" />
                  <span>{t("free_shipping")}</span>
                </div>
              )}

              {/* Options dropdown */}
              <div className="mb-6">
                <button
                  onClick={() => setOptionsOpen(o => !o)}
                  className="w-full flex items-center justify-between gap-2 py-3 px-4 rounded-xl bg-secondary border border-border text-sm font-semibold text-foreground hover:bg-secondary/80 transition-colors"
                >
                  <span>{t("options")}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${optionsOpen ? "rotate-180" : ""}`} />
                </button>
                {optionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 p-4 rounded-xl bg-card border border-border space-y-4"
                  >
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">{t("color")}</p>
                      <div className="flex gap-2 flex-wrap">
                        {colors.map(c => (
                          <button
                            key={c}
                            onClick={() => setSelectedColor(c)}
                            style={{ background: c }}
                            className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                              selectedColor === c ? "border-primary ring-2 ring-primary/30" : "border-border"
                            }`}
                            aria-label={c}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">{t("size")}</p>
                      <div className="flex gap-2 flex-wrap">
                        {sizes.map(s => (
                          <button
                            key={s}
                            onClick={() => setSelectedSize(s)}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                              selectedSize === s
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border hover:border-primary hover:bg-primary/10"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[140px] py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {t("add_to_cart")}
                </button>
                <button
                  onClick={() => setShowMessageForm(!showMessageForm)}
                  className="flex-1 min-w-[140px] py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("message_seller")}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-3 rounded-xl border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  title={t("download_image")}
                >
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-xl border border-border hover:bg-secondary transition-colors">
                  <Heart className="w-5 h-5 text-foreground/60" />
                </button>
                <button className="p-3 rounded-xl border border-border hover:bg-secondary transition-colors">
                  <Share2 className="w-5 h-5 text-foreground/60" />
                </button>
              </div>

              {showMessageForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h3 className="font-display font-semibold text-foreground mb-4">{t("message_seller")}</h3>
                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <input
                      required
                      value={msgForm.sender_name}
                      onChange={e => setMsgForm(f => ({ ...f, sender_name: e.target.value }))}
                      placeholder={t("your_name") + " *"}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm focus:border-primary focus:outline-none"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        value={msgForm.sender_email}
                        onChange={e => setMsgForm(f => ({ ...f, sender_email: e.target.value }))}
                        placeholder={t("email")}
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm focus:border-primary focus:outline-none"
                      />
                      <input
                        value={msgForm.sender_phone}
                        onChange={e => setMsgForm(f => ({ ...f, sender_phone: e.target.value }))}
                        placeholder={t("phone")}
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm focus:border-primary focus:outline-none"
                      />
                    </div>
                    <textarea
                      required
                      value={msgForm.message}
                      onChange={e => setMsgForm(f => ({ ...f, message: e.target.value }))}
                      placeholder={t("your_message")}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm focus:border-primary focus:outline-none resize-none"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-50"
                    >
                      {sending ? t("sending") : t("send_message")}
                    </button>
                  </form>
                </motion.div>
              )}
            </motion.div>
          </div>

          <ProductReviews productId={product.id} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
