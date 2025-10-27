// src/components/rosters/CreatorCard.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiTwitter, FiTwitch, FiYoutube, FiInstagram, FiClock } from "react-icons/fi";
import type { Creator } from "@/data/rosters";

const SOCIAL_ICONS = {
  twitter: FiTwitter,
  twitch: FiTwitch,
  youtube: FiYoutube,
  instagram: FiInstagram,
};

interface CreatorCardProps {
  creator: Creator;
  index: number;
}

export function CreatorCard({ creator, index }: CreatorCardProps) {
  const isComingSoon = creator.status === 'coming-soon';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20"
    >
      {/* Banner Section */}
      <div className="relative h-48 overflow-hidden">
        {creator.banner ? (
          <Image
            src={creator.banner}
            alt={creator.alias}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent" />
        )}
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Region Badge */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.05 }}
          className="absolute top-4 right-4 px-4 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/40"
        >
          {creator.region}
        </motion.div>

        {/* Coming Soon Overlay */}
        {isComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 text-[#D4AF37] mb-2"
            >
              <FiClock className="w-6 h-6" />
              <span className="text-xl font-bold">Coming Soon</span>
            </motion.div>
            <div className="text-white/50 text-sm">Announcement Pending</div>
          </motion.div>
        )}
      </div>

      {/* Content Section */}
      <div className="relative p-5">
        {/* Avatar */}
        <div className="flex items-start gap-4 -mt-10 mb-4">
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-4 border-black/80 bg-gradient-to-br from-[#D4AF37]/20 to-black shadow-xl">
              {creator.avatar && (
                <Image
                  src={creator.avatar}
                  alt={creator.alias}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            {/* Status Dot */}
            <motion.div
              animate={isComingSoon ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-black shadow-lg ${
                isComingSoon ? 'bg-gray-500' : 'bg-green-500'
              }`}
            />
          </div>

          <div className="flex-1 pt-8">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
              {creator.alias}
            </h3>
            {creator.realName && (
              <p className="text-sm text-white/50">{creator.realName}</p>
            )}
          </div>
        </div>

        {/* Role Badge */}
        <div className="inline-flex items-center px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-xs font-bold text-[#D4AF37] mb-3">
          {creator.role}
        </div>

        {/* Bio */}
        {creator.bio && !isComingSoon && (
          <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">
            {creator.bio}
          </p>
        )}

        {/* Social Links */}
        {creator.socials && !isComingSoon && (
          <div className="flex gap-2 pt-3 border-t border-white/10">
            {Object.entries(creator.socials).map(([platform, url]) => {
              const Icon = SOCIAL_ICONS[platform as keyof typeof SOCIAL_ICONS];
              return (
                <motion.div
                  key={platform}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/50 rounded-lg flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
