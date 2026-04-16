import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById, sendMessage, type Product } from "@/lib/store";
import { ArrowRight, MessageCircle, ShoppingCart, Heart, Share2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import phoneImg from "@/assets/product-phone.jpg";
import watchImg from "@/assets/product-watch.jpg";
import headphonesImg from "@/assets/product-headphones.jpg";
import sunglassesImg from "@/assets/product-sunglasses.jpg";
import bagImg from "@/assets/product-bag.jpg";
import shoesImg from "@/assets/product-shoes.jpg";
import laptopImg from "@/assets/product-laptop.jpg";
import perfumeImg from "@/assets/product-perfume.jpg";

const fallbackMap: Record<string, string> = {
  "/products/phone.jpg": phoneImg,
  "/products/watch.jpg": watchImg,
  "/products/headphones.jpg": headphonesImg,
  "/products/sunglasses.jpg": sunglassesImg,
  "/products/bag.jpg": bagImg,
  "/products/shoes.jpg": shoesImg,
  "/products/laptop.jpg": laptopImg,
  "/products/perfume.jpg": perfumeImg,
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [msgForm, setMsgForm] = useState({ sender_name: "", sender_email: "", sender_phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      getProductById(id).then(p => { setProduct(p); setLoading(false); });
    }
  }, [id]);

  const imgSrc = product?.image_url
    ? (fallbackMap[product.image_url] || product.image_url)
    : phoneImg;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSending(true);
    try {
      await sendMessage({ product_id: product.id, ...msgForm });
      toast({ title: "پیام شما ارسال شد!", description: "به زودی با شما تماس خواهیم گرفت." });
      setMsgForm({ sender_name: "", sender_email: "", sender_phone: "", message: "" });
      setShowMessageForm(false);
    } catch {
      toast({ title: "خطا", description: "ارسال پیام ناموفق بود.", variant: "destructive" });
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">در حال بارگذاری...</div>
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
          <p className="text-muted-foreground text-lg">محصول یافت نشد</p>
          <Link to="/products" className="text-accent mt-4 inline-block">بازگشت به محصولات</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <Link to="/products" className="inline-flex items-center gap-1 text-accent text-sm mb-6 hover:gap-2 transition-all">
            <ArrowRight className="w-4 h-4" />
            بازگشت به محصولات
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <img src={imgSrc} alt={product.name} className="w-full aspect-square object-cover" />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <span className="text-xs text-accent font-semibold bg-accent/10 px-3 py-1 rounded-full w-fit mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-accent">${product.price}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
                  ))}
                </div>
              </div>

              {product.featured && (
                <div className="flex items-center gap-2 mb-6 text-sm text-accent">
                  <Check className="w-4 h-4" />
                  <span>محصول ویژه - ارسال رایگان</span>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mb-8">
                <button className="flex-1 min-w-[150px] py-3 bg-accent text-accent-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
                  <ShoppingCart className="w-4 h-4" />
                  خرید محصول
                </button>
                <button
                  onClick={() => setShowMessageForm(!showMessageForm)}
                  className="flex-1 min-w-[150px] py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  پیام / بحث قیمت
                </button>
                <button className="p-3 rounded-lg border border-border hover:bg-secondary transition-colors">
                  <Heart className="w-5 h-5 text-foreground/60" />
                </button>
                <button className="p-3 rounded-lg border border-border hover:bg-secondary transition-colors">
                  <Share2 className="w-5 h-5 text-foreground/60" />
                </button>
              </div>

              {/* Message Form */}
              {showMessageForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="glass-card rounded-xl p-6"
                >
                  <h3 className="font-display font-semibold text-foreground mb-4">ارسال پیام به فروشنده</h3>
                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <input
                      required
                      value={msgForm.sender_name}
                      onChange={e => setMsgForm(f => ({ ...f, sender_name: e.target.value }))}
                      placeholder="نام شما *"
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        value={msgForm.sender_email}
                        onChange={e => setMsgForm(f => ({ ...f, sender_email: e.target.value }))}
                        placeholder="ایمیل"
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                      />
                      <input
                        value={msgForm.sender_phone}
                        onChange={e => setMsgForm(f => ({ ...f, sender_phone: e.target.value }))}
                        placeholder="شماره تلفن"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                      />
                    </div>
                    <textarea
                      required
                      value={msgForm.message}
                      onChange={e => setMsgForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="پیام شما (مثلاً: آیا قیمت قابل بحث است؟) *"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none resize-none"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {sending ? "در حال ارسال..." : "ارسال پیام"}
                    </button>
                  </form>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
