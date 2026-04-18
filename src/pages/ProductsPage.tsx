import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts, categoryDbValues, categoryKeys, type Product } from "@/lib/store";
import { useLang } from "@/lib/i18n";

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();

  useEffect(() => {
    getProducts()
      .then(p => { setProducts(p); setLoading(false); })
      .catch(err => { console.error("Failed to load products:", err); setLoading(false); });
  }, []);

  const filtered = activeCategory === "all"
    ? products
    : products.filter(p => p.category === categoryDbValues[activeCategory as keyof typeof categoryDbValues]);

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
            {t("products")}
          </motion.h1>
          <p className="text-muted-foreground text-center text-sm mb-10">{t("products_subtitle")}</p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-secondary text-foreground/60 hover:bg-secondary/80"
              }`}
            >
              {t("all")}
            </button>
            {categoryKeys.map(key => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === key
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-secondary text-foreground/60 hover:bg-secondary/80"
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-secondary/50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-10">{t("no_products")}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
