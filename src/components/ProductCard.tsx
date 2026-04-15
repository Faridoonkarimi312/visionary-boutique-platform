import { motion } from "framer-motion";
import type { Product } from "@/lib/store";
import { ShoppingCart, Heart } from "lucide-react";

import phoneImg from "@/assets/product-phone.jpg";
import watchImg from "@/assets/product-watch.jpg";
import headphonesImg from "@/assets/product-headphones.jpg";
import sunglassesImg from "@/assets/product-sunglasses.jpg";
import bagImg from "@/assets/product-bag.jpg";
import shoesImg from "@/assets/product-shoes.jpg";
import laptopImg from "@/assets/product-laptop.jpg";
import perfumeImg from "@/assets/product-perfume.jpg";

const imageMap: Record<string, string> = {
  "/products/phone.jpg": phoneImg,
  "/products/watch.jpg": watchImg,
  "/products/headphones.jpg": headphonesImg,
  "/products/sunglasses.jpg": sunglassesImg,
  "/products/bag.jpg": bagImg,
  "/products/shoes.jpg": shoesImg,
  "/products/laptop.jpg": laptopImg,
  "/products/perfume.jpg": perfumeImg,
};

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const imgSrc = imageMap[product.image] || product.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group glass-card rounded-xl overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-accent transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <ShoppingCart className="w-4 h-4" />
            افزودن به سبد
          </button>
        </div>
        {product.featured && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full">
            ویژه
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-display font-semibold text-foreground text-sm mb-2">{product.name}</h3>
        <p className="text-xs text-foreground/50 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-accent font-bold text-lg">${product.price}</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-accent text-xs">★</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
