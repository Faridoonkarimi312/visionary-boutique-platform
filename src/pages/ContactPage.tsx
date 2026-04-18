import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const ContactPage = () => {
  const [sent, setSent] = useState(false);
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-silver-gradient mb-4">{t("contact_us")}</h1>
            <p className="text-foreground/50 text-sm">{t("contact_subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Mail, title: t("email"), value: "faridoonkarimi2018@gmail.com", href: "mailto:faridoonkarimi2018@gmail.com", ltr: true },
              { icon: Phone, title: t("phone"), value: "+93 783 322 296", href: "tel:+93783322296", ltr: true },
              { icon: MapPin, title: t("address"), value: t("address_value"), href: null, ltr: false },
            ].map((item, i) => {
              const inner = (
                <>
                  <item.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                  <p dir={item.ltr ? "ltr" : undefined} className="text-foreground/70 text-xs break-all">{item.value}</p>
                </>
              );
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-6 text-center hover:shadow-xl transition-shadow"
                >
                  {item.href ? (
                    <a href={item.href} className="block hover:opacity-80 transition-opacity">{inner}</a>
                  ) : inner}
                </motion.div>
              );
            })}
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
                <h3 className="font-display font-bold text-foreground text-xl mb-2">{t("message_sent")}</h3>
                <p className="text-foreground/50 text-sm">{t("we_will_contact")}</p>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSent(true); }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder={t("your_name")}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                  />
                  <input
                    required
                    type="email"
                    placeholder={t("your_email")}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <input
                  required
                  placeholder={t("subject")}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
                <textarea
                  required
                  rows={5}
                  placeholder={t("your_message")}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                  {t("send_message")}
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
