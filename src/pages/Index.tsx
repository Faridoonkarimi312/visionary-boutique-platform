import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductCard from "@/components/ProductCard";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/store";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const products = getProducts().filter(p => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      <CategoriesSection />

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-10">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-silver-gradient"
            >
              محصولات ویژه
            </motion.h2>
            <Link
              to="/products"
              className="text-accent text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              مشاهده همه <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* Banner */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-silver-gradient mb-4">
                تخفیف ویژه ۲۰٪
              </h2>
              <p className="text-foreground/50 mb-8 max-w-md mx-auto text-sm">
                فرصت محدود! از تخفیف ویژه کریمی بهره‌مند شوید. ارسال رایگان برای تمامی سفارشات.
              </p>
              <Link
                to="/products"
                className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-all"
              >
                همین الان خرید کنید
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
