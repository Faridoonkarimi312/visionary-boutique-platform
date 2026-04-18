import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, Watch, Shirt, Footprints, Sparkles, Home } from "lucide-react";
import { useLang } from "@/lib/i18n";

const cats = [
  { icon: Smartphone, key: "cat_electronics", color: "from-blue-500/20 to-blue-600/10" },
  { icon: Watch, key: "cat_accessories", color: "from-amber-500/20 to-amber-600/10" },
  { icon: Shirt, key: "cat_fashion", color: "from-pink-500/20 to-pink-600/10" },
  { icon: Footprints, key: "cat_shoes", color: "from-green-500/20 to-green-600/10" },
  { icon: Sparkles, key: "cat_beauty", color: "from-purple-500/20 to-purple-600/10" },
  { icon: Home, key: "cat_home", color: "from-teal-500/20 to-teal-600/10" },
];

const CategoriesSection = () => {
  const { t } = useLang();
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display font-bold text-center mb-10 text-silver-gradient"
        >
          {t("categories")}
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to="/products"
                className={`flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br ${cat.color} border border-border/50 hover:border-accent/30 transition-all`}
              >
                <cat.icon className="w-8 h-8 text-foreground/70" />
                <span className="text-xs font-semibold text-foreground/80">{t(cat.key)}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
