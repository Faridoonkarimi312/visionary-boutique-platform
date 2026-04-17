import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import logo from "@/assets/karimi-logo-new.png";

const HeroSection = () => {
  const { t, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowLeft;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Modern gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/40 to-primary/10" />

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }}
        animate={{ x: [0, -40, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(220 80% 60%) 0%, transparent 70%)" }}
        animate={{ x: [-200, 100, -200], y: [-100, 150, -100], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent/60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo with circular frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring", damping: 12 }}
          className="mx-auto mb-8 w-32 h-32 md:w-40 md:h-40 rounded-full bg-card shadow-2xl flex items-center justify-center overflow-hidden border-4 border-primary/20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
          <img src={logo} alt="Karimi" className="w-full h-full object-cover relative z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-accent">{t("free_shipping")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight"
        >
          <span className="text-silver-gradient">{t("hero_title")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl text-foreground/80 mb-4 font-display"
        >
          {t("hero_sub")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t("hero_desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            to="/products"
            className="group px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            {t("view_products")}
            <Arrow className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 bg-card border-2 border-border rounded-full font-semibold text-sm text-foreground hover:border-primary hover:bg-primary/5 transition-all"
          >
            {t("about_karimi")}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { num: "500+", label: t("products") },
            { num: "12K+", label: dir === "ltr" ? "Customers" : "مشتری" },
            { num: "98%", label: dir === "ltr" ? "Satisfaction" : "رضایت" },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-card/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary">{stat.num}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
