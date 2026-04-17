import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Users, Globe, Target } from "lucide-react";
import logo from "@/assets/karimi-logo-new.png";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 bg-card shadow-xl">
            <img src={logo} alt="Karimi" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-silver-gradient mb-4">درباره کریمی</h1>
          <p className="text-foreground/50 max-w-xl mx-auto text-sm leading-relaxed">
            کریمی یک برند لوکس جهانی است که بهترین محصولات پریمیوم را از سراسر جهان گردآوری کرده و با ضمانت اصالت و کیفیت به مشتریان عرضه می‌کند.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Target, title: "مأموریت ما", desc: "ارائه بهترین محصولات جهان با قیمت مناسب و خدمات بی‌نظیر به مشتریان" },
            { icon: Globe, title: "دسترسی جهانی", desc: "ارسال به بیش از ۱۰۰ کشور جهان با پوشش گسترده لجستیکی" },
            { icon: Award, title: "کیفیت تضمینی", desc: "تمامی محصولات از منابع معتبر تهیه شده و دارای گواهی اصالت هستند" },
            { icon: Users, title: "جامعه بزرگ", desc: "بیش از ۱۲ هزار مشتری راضی در سراسر جهان به ما اعتماد کرده‌اند" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <item.icon className="w-10 h-10 text-accent mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-foreground/50 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-display font-bold text-accent mb-4">انجنیر فریدون کریمی</h2>
          <p className="text-foreground/50 text-sm leading-relaxed max-w-lg mx-auto">
            بنیان‌گذار و مدیرعامل فروشگاه کریمی. با بیش از ۱۰ سال تجربه در تجارت الکترونیک و عشق به نوآوری، کریمی را با هدف ارائه بهترین تجربه خرید آنلاین تأسیس کرده است.
          </p>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
