"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ApparelItem, ApparelCategory } from "@/types/apparel";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  items: ApparelItem[];
}

const CATEGORIES: { value: ApparelCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Items' },
  { value: 'hoodie', label: 'Hoodies' },
  { value: 'tshirt', label: 'T-Shirts & Jerseys' },
  { value: 'jacket', label: 'Jackets' },
  { value: 'hat', label: 'Hats' },
  { value: 'accessory', label: 'Accessories' },
];

export function ProductGrid({ items }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ApparelCategory | 'all'>('all');

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return items;
    }
    return items.filter(item => item.category === selectedCategory);
  }, [items, selectedCategory]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="products" className="py-20 relative">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-esports text-gold-vibrant text-xs sm:text-sm inline-block mb-4">
              Our Collection
            </span>
            <h2 className="h2 text-gradient-gold mb-4">
              Explore the Collection
            </h2>
            <p className="lead text-white/80 max-w-2xl mx-auto">
              Premium esports apparel designed for champions. All items coming soon.
            </p>
          </motion.div>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-gold-vibrant to-gold-light text-black border-2 border-gold-vibrant shadow-lg shadow-gold-vibrant/20'
                  : 'bg-white/5 text-white/80 border-2 border-white/10 hover:border-gold-vibrant/30 hover:bg-white/10'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/60 text-lg">
              No items found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
