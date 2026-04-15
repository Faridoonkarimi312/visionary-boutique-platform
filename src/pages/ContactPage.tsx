import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-silver-gradient mb-4">تماس با ما</h1>
            <p className="text-foreground/50 text-sm">ما آماده پاسخگویی به سؤالات شما هستیم</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Mail, title: "ایمیل", value: "info@karimi.store" },
              { icon: Phone, title: "تلفن", value: "+93 700 000 000" },
              { icon: MapPin, title: "آدرس", value: "افغانستان، کابل" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 text-center"
              >
                <item.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-foreground/50 text-xs">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-8"
          >
            {sent ? (
              <div className="text-center py-10">
                <div className="text-accent text-4xl mb-4">✓</div>
                <h3 className="font-display font-bold text-foreground text-xl mb-2">پیام شما ارسال شد!</h3>
                <p className="text-foreground/50 text-sm">به زودی با شما تماس خواهیم گرفت.</p>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSent(true); }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="نام شما"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                  />
                  <input
                    required
                    type="email"
                    placeholder="ایمیل شما"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <input
                  required
                  placeholder="موضوع"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
                <textarea
                  required
                  rows={5}
                  placeholder="پیام شما..."
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                  ارسال پیام
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
