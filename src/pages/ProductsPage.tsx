import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts, categories, type Product } from "@/lib/store";

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("همه");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filtered = activeCategory === "همه" ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-silver-gradient text-center mb-4"
          >
            محصولات
          </motion.h1>
          <p className="text-muted-foreground text-center text-sm mb-10">بهترین محصولات لوکس جهان</p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["همه", ...categories].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-secondary text-foreground/60 hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-10">محصولی یافت نشد</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
