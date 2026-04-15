import { motion } from "framer-motion";
import { Shield, Truck, Award, Headphones, CreditCard, RefreshCw } from "lucide-react";

const features = [
  { icon: Shield, title: "ضمانت اصالت", desc: "تمامی محصولات با گارانتی اصالت ارائه می‌شوند" },
  { icon: Truck, title: "ارسال رایگان", desc: "ارسال رایگان به سراسر جهان برای سفارش‌های بالای ۵۰ دلار" },
  { icon: Award, title: "کیفیت برتر", desc: "تنها بهترین محصولات از برندهای معتبر جهانی" },
  { icon: Headphones, title: "پشتیبانی ۲۴/۷", desc: "تیم پشتیبانی حرفه‌ای در خدمت شما" },
  { icon: CreditCard, title: "پرداخت امن", desc: "پرداخت ایمن با رمزگذاری پیشرفته" },
  { icon: RefreshCw, title: "بازگشت آسان", desc: "۳۰ روز ضمانت بازگشت بدون قید و شرط" },
];

const FeaturesSection = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-silver-gradient mb-4">
          چرا کریمی؟
        </h2>
        <p className="text-foreground/50 max-w-md mx-auto text-sm">
          ما بهترین تجربه خرید آنلاین را برای شما فراهم کرده‌ایم
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="glass-card rounded-xl p-6 text-center group hover:border-accent/30 transition-colors"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <f.icon className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-foreground/50 text-xs">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
