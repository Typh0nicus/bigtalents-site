'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiShare2, FiCheck, FiChevronDown } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Tournament } from '@/data/tournaments';

interface TournamentHeaderProps {
  tournament: Tournament;
}

export function TournamentHeader({ tournament }: TournamentHeaderProps) {
  const [copied, setCopied] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const formatDate = (dateString?: string) => {
    if (!dateString || dateString === "Coming Soon") return "Coming Soon";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    } catch {
      return dateString;
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* BGT Brand Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      
      {/* Tournament Image Background */}
      {tournament.image && (
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={tournament.image}
            alt={tournament.title}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </motion.div>
      )}

      <div className="container relative z-10 px-6 text-center max-w-7xl">
        
        {/* Status Badge - Region Only in Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm border border-[#D4AF37]/40 rounded-full mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FaTrophy className="text-[#D4AF37] text-sm" />
          <span className="font-bold text-sm uppercase text-white">
            {tournament.archived ? 'Tournament Complete' : 'Live Tournament'}
          </span>
        </motion.div>

        {/* Tournament Title - No Overflow, Proper Word Wrap */}
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 break-words px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {tournament.title}
        </motion.h1>

        {/* Date */}
        <motion.div 
          className="text-white/80 mb-12 text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {tournament.date && (
            <span className="font-medium">{formatDate(tournament.date)}</span>
          )}
        </motion.div>

        {/* Premium Action Buttons */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href={tournament.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E9B84F] text-black font-bold text-lg rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/30"
          >
            <div className="flex items-center gap-3">
              <span>View Tournament</span>
              <FiExternalLink className="transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>

          {tournament.liquipedia && (
            <Link
              href={tournament.liquipedia}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white font-bold text-lg rounded-xl transition-all duration-200 hover:bg-white/20 hover:border-[#D4AF37]/50 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <span>Statistics</span>
                <FiExternalLink className="transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          )}

          <button
            onClick={handleShare}
            className="relative p-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white rounded-xl transition-all duration-200 hover:bg-white/20 hover:border-[#D4AF37]/50 hover:scale-105 group"
          >
            <motion.div
              initial={false}
              animate={{ rotate: copied ? 360 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {copied ? <FiCheck className="text-[#D4AF37]" /> : <FiShare2 />}
            </motion.div>
            
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-black/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-sm text-white">{copied ? 'Link Copied!' : 'Share Link'}</span>
            </div>
          </button>
        </motion.div>

        {/* Scroll Indicator with Fade */}
        <motion.div 
          className="text-white/60"
          style={{ opacity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm uppercase tracking-wider font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiChevronDown className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
