import { motion } from "framer-motion";
import heroWater from "@/assets/hero-water.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Water animation background */}
      <div className="absolute inset-0">
        <img
          src={heroWater}
          alt="Hero"
          className="w-full h-full object-cover animate-water opacity-60"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* SVG wave animation */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1400 400" className="w-full h-32 md:h-48">
          <path
            className="animate-wave"
            fill="hsl(220 20% 4% / 0.8)"
            d="M0,160 C320,300,420,60,700,160 C980,260,1080,60,1400,160 L1400,400 L0,400Z"
          />
        </svg>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6">
            <span className="text-silver-gradient">Karimi</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-4 font-body">
            تجربه خرید لوکس در سطح جهانی
          </p>
          <p className="text-sm md:text-base text-foreground/50 mb-8 max-w-xl mx-auto font-body">
            بهترین محصولات پریمیوم از برندهای معتبر جهان با ضمانت اصالت و کیفیت
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/products"
            className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-all animate-pulse_glow"
          >
            مشاهده محصولات ←
          </a>
          <a
            href="/about"
            className="px-8 py-4 border border-foreground/20 rounded-lg font-semibold text-sm text-foreground/80 hover:bg-secondary transition-all"
          >
            درباره کریمی
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          {[
            { num: "۵۰۰+", label: "محصول" },
            { num: "۱۲K+", label: "مشتری" },
            { num: "۹۸%", label: "رضایت" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-accent">{stat.num}</div>
              <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
