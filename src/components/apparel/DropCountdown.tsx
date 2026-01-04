"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UpcomingDrop } from "@/types/apparel";

interface DropCountdownProps {
  drop: UpcomingDrop;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeRemaining(targetDate: string): TimeRemaining {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gold-vibrant/20 blur-xl rounded-2xl" />
        <div className="relative card-glass px-6 py-4 sm:px-8 sm:py-6 min-w-[80px] sm:min-w-[100px]">
          <motion.div
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-vibrant font-technopath"
          >
            {value.toString().padStart(2, '0')}
          </motion.div>
        </div>
      </div>
      <span className="mt-3 text-xs sm:text-sm uppercase tracking-wider text-white/70 font-semibold">
        {label}
      </span>
    </motion.div>
  );
}

export function DropCountdown({ drop }: DropCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(drop.dropDate)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(drop.dropDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [drop.dropDate]);

  // Don't render countdown during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container">
          <div className="card-premium p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
            <div className="h-64" />
          </div>
        </div>
      </section>
    );
  }

  const isDropped = timeRemaining.days === 0 && 
                    timeRemaining.hours === 0 && 
                    timeRemaining.minutes === 0 && 
                    timeRemaining.seconds === 0;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(1000px 600px at 50% 50%, rgba(255,187,0,0.08), transparent 70%)`
          }}
        />
        <div className="absolute inset-0 dotted-grid opacity-20" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card-premium p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto glow-gold-subtle"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="label-esports text-gold-vibrant text-xs sm:text-sm inline-block">
              {isDropped ? 'Now Available' : 'Upcoming Drop'}
            </span>
          </motion.div>

          {/* Drop Name */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h2 text-gradient-gold mb-4"
          >
            {drop.name}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lead text-white/80 mb-12 max-w-2xl mx-auto"
          >
            {drop.description}
          </motion.p>

          {/* Countdown Timer */}
          {!isDropped && (
            <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 mb-8">
              <TimeUnit value={timeRemaining.days} label="Days" />
              <TimeUnit value={timeRemaining.hours} label="Hours" />
              <TimeUnit value={timeRemaining.minutes} label="Minutes" />
              <TimeUnit value={timeRemaining.seconds} label="Seconds" />
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            {isDropped ? (
              <a href="#products" className="btn btn-primary btn-lg">
                Shop Now
              </a>
            ) : (
              <button className="btn btn-outline btn-lg">
                Get Notified
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
