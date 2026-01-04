"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ApparelItem } from "@/types/apparel";

interface ProductCardProps {
  item: ApparelItem;
}

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

function getStatusBadge(status: ApparelItem['status']) {
  switch (status) {
    case 'available':
      return { text: 'Shop Now', classes: 'bg-green-500/20 text-green-400 border-green-500/30' };
    case 'coming-soon':
      return { text: 'Coming Soon', classes: 'bg-gold-vibrant/20 text-gold-vibrant border-gold-vibrant/30' };
    case 'sold-out':
      return { text: 'Sold Out', classes: 'bg-white/10 text-white/50 border-white/20' };
    default:
      return { text: 'Coming Soon', classes: 'bg-gold-vibrant/20 text-gold-vibrant border-gold-vibrant/30' };
  }
}

export function ProductCard({ item }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const statusBadge = getStatusBadge(item.status);
  const imageSrc = item.images[0] ?? '/images/apparel/placeholder.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="card-glass h-full flex flex-col overflow-hidden"
        style={{
          borderColor: isHovered ? 'rgba(212,175,55,0.35)' : 'rgba(255,255,255,0.08)',
          boxShadow: isHovered 
            ? '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(255,187,0,0.12)' 
            : '0 8px 32px rgba(0,0,0,0.2)'
        }}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-black/40">
          <motion.div
            className="h-full w-full"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={imageSrc}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Shine effect on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="shine"
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ x: "-140%", opacity: 0 }}
                animate={{ x: "140%", opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div
                  className="h-full w-[60%] bg-white/25"
                  style={{
                    transform: "skewX(-18deg)",
                    filter: "blur(6px)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${statusBadge.classes}`}>
              {statusBadge.text}
            </span>
          </div>

          {/* Featured Badge */}
          {item.featured && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-full border border-gold-vibrant/40 bg-gold-vibrant/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-vibrant">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="label-caps text-gold-vibrant/80 text-xs">
              {item.category}
            </span>
          </div>

          {/* Title & Description */}
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-gradient-gold transition-all duration-200">
              {item.name}
            </h3>
            <p className="text-sm text-white/70 line-clamp-2">
              {item.description}
            </p>
          </div>

          {/* Sizes */}
          <div className="flex flex-wrap gap-1.5">
            {item.sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                className="inline-flex items-center justify-center rounded border border-white/20 bg-white/5 px-2 py-1 text-xs font-medium text-white/80"
              >
                {size}
              </span>
            ))}
            {item.sizes.length > 4 && (
              <span className="inline-flex items-center justify-center rounded border border-white/20 bg-white/5 px-2 py-1 text-xs font-medium text-white/80">
                +{item.sizes.length - 4}
              </span>
            )}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xl font-bold text-gradient-vibrant">
              {formatPrice(item.price, item.currency)}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-sm btn-outline"
              disabled={item.status === 'sold-out'}
            >
              {item.status === 'available' ? 'Add to Cart' : 'Notify Me'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
