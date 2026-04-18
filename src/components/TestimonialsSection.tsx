import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";

const TestimonialsSection = () => {
  const { t, lang } = useLang();
  const testimonials = lang === "en" ? [
    { name: "Ahmad Rahmani", text: "The best online store! Outstanding product quality and fast shipping.", role: "Loyal Customer" },
    { name: "Sara Mohammadi", text: "Excellent shopping experience at Karimi. Fair prices and unmatched customer service.", role: "Regular Shopper" },
    { name: "Ali Hosseini", text: "Genuine products with luxury packaging. Completely satisfied and recommend to everyone.", role: "Gold Customer" },
  ] : lang === "ps" ? [
    { name: "احمد رحماني", text: "غوره آنلاین پلورنځی! د توکو غوره کیفیت او ګړندی لیږد.", role: "وفادار پیرودونکی" },
    { name: "ساره محمدي", text: "د کریمي څخه عالي د پیرودنې تجربه. مناسب بیې او بې ساري خدمت.", role: "دوامداره پیرودونکی" },
    { name: "علي حسیني", text: "اصلي توکي د لوکس بسته‌بندۍ سره. کاملاً راضي یم.", role: "زرین پیرودونکی" },
  ] : [
    { name: "احمد رحمانی", text: "بهترین فروشگاه آنلاین! کیفیت محصولات فوق‌العاده و ارسال سریع.", role: "مشتری وفادار" },
    { name: "سارا محمدی", text: "تجربه خرید عالی از کریمی. قیمت‌ها مناسب و خدمات مشتری بی‌نظیر.", role: "خریدار دائمی" },
    { name: "علی حسینی", text: "محصولات اصل با بسته‌بندی لوکس. کاملاً راضی هستم و به همه پیشنهاد می‌کنم.", role: "مشتری طلایی" },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-silver-gradient mb-4">
            {t("customer_reviews")}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((tst, i) => (
            <motion.div
              key={tst.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-xl p-6 relative"
            >
              <Quote className="w-8 h-8 text-accent/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-foreground/70 text-sm mb-4 leading-relaxed">{tst.text}</p>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">{tst.name}</p>
                <p className="text-foreground/40 text-xs">{tst.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
