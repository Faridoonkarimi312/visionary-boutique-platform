import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Users, Globe, Target } from "lucide-react";
import logo from "@/assets/karimi-logo-new.png";
import { useLang } from "@/lib/i18n";

const AboutPage = () => {
  const { t } = useLang();
  const items = [
    { icon: Target, key: "mission" },
    { icon: Globe, key: "global_reach" },
    { icon: Award, key: "quality_guaranteed" },
    { icon: Users, key: "big_community" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 bg-card shadow-xl">
              <img src={logo} alt="Karimi" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-silver-gradient mb-4">{t("about_title")}</h1>
            <p className="text-foreground/60 max-w-xl mx-auto text-sm leading-relaxed">{t("about_desc")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {items.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <item.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">{t(item.key)}</h3>
                <p className="text-foreground/60 text-xs leading-relaxed">{t(item.key + "_desc")}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-display font-bold text-accent mb-4">{t("founder_name")}</h2>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-lg mx-auto">{t("founder_bio")}</p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
