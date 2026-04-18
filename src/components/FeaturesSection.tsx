import { motion } from "framer-motion";
import { Shield, Truck, Award, Headphones, CreditCard, RefreshCw } from "lucide-react";
import { useLang } from "@/lib/i18n";

const features = [
  { icon: Shield, key: "feature_authenticity" },
  { icon: Truck, key: "feature_shipping" },
  { icon: Award, key: "feature_quality" },
  { icon: Headphones, key: "feature_support" },
  { icon: CreditCard, key: "feature_payment" },
  { icon: RefreshCw, key: "feature_returns" },
];

const FeaturesSection = () => {
  const { t } = useLang();
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-silver-gradient mb-4">
            {t("why_karimi")}
          </h2>
          <p className="text-foreground/50 max-w-md mx-auto text-sm">
            {t("why_subtitle")}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.key}
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
              <h3 className="font-display font-semibold text-foreground mb-2">{t(f.key)}</h3>
              <p className="text-foreground/50 text-xs">{t(f.key + "_desc")}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
