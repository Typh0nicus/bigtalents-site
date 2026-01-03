"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./Badge";
import { FiPlay } from "react-icons/fi";

interface MediaCardProps {
  title: string;
  thumbnail: string;
  href?: string;
  duration?: string;
  isLive?: boolean;
  views?: string;
  date?: string;
  category?: string;
  className?: string;
}

export function MediaCard({
  title,
  thumbnail,
  href,
  duration,
  isLive = false,
  views,
  date,
  category,
  className = "",
}: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const CardWrapper = ({ children }: { children: ReactNode }) => {
    if (href) {
      return (
        <Link href={href} className="block">
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  return (
    <CardWrapper>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className={`group relative cursor-pointer ${className}`}
      >
        {/* Thumbnail Container */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Live badge */}
          {isLive && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="live" size="sm" glow>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  LIVE
                </span>
              </Badge>
            </div>
          )}

          {/* Duration badge */}
          {duration && !isLive && (
            <div className="absolute bottom-3 right-3 z-10">
              <Badge variant="default" size="sm">
                {duration}
              </Badge>
            </div>
          )}

          {/* Category tag */}
          {category && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="gold" size="sm">
                {category}
              </Badge>
            </div>
          )}

          {/* Play button overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--gold-primary)] flex items-center justify-center shadow-glow-gold-lg">
              <FiPlay className="w-6 h-6 text-black ml-1" />
            </div>
          </motion.div>
        </div>

        {/* Info Section */}
        <div className="mt-3 space-y-2">
          <h3 className="font-bold text-white line-clamp-2 group-hover:text-[var(--gold-vibrant)] transition-colors">
            {title}
          </h3>
          {(views || date) && (
            <div className="flex items-center gap-2 text-sm text-white/60">
              {views && <span>{views} views</span>}
              {views && date && <span>•</span>}
              {date && <span>{date}</span>}
            </div>
          )}
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[var(--gold-primary)]/20 to-[var(--gold-classic)]/20 -z-10 blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </CardWrapper>
  );
}
