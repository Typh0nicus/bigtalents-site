"use client";

import {
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { FaYoutube, FaTwitch, FaTiktok, FaPlay } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { ScoredContent } from "@/lib/featuredAlgorithm";

const PARTICLE_POSITIONS = Array.from({ length: 14 }, (_, i) => ({
  left: 8 + (i % 7) * 13,
  top: 10 + Math.floor(i / 7) * 35,
}));

type Video = ScoredContent;

export function FeaturedContent({ content }: { content: ScoredContent[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!content.length) return null;

  const featured = content[0];
  const others = content.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative py-10 md:py-14 lg:py-20 select-none overflow-hidden"
    >
      {/* Shared premium backdrop (noise + very soft gold haze) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* ultra-subtle grain, same as Hero */}
        <div
          className="absolute inset-0 opacity-[0.008] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* soft gold glow near top, to continue Hero/News energy */}
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "radial-gradient(120% 160% at 50% 0%, rgba(212,175,55,0.05), transparent 60%)",
          }}
        />

        {/* soft bottom glow so it blends into next sections */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "radial-gradient(120% 160% at 50% 100%, rgba(212,175,55,0.04), transparent 65%)",
          }}
        />
      </div>

      {/* Little drifting particles (already had, kept) */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && (
          <div className="absolute inset-0 opacity-20">
            {PARTICLE_POSITIONS.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-[#D4AF37] rounded-full"
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                animate={{
                  y: [0, -24, 0],
                  opacity: [0.15, 0.6, 0.15],
                }}
                transition={{
                  duration: 3.5 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 md:mb-8 lg:mb-10"
        >
          <h2 className="h2 font-technopath">
            <span className="text-gold-3d">
              Featured Content
            </span>
          </h2>
        </motion.div>

        {/* Layout: big feature + side list on desktop, stacked on mobile */}
        <div className="grid gap-5 md:gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1.2fr)] pb-[1px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.97, y: 20 }
            }
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <FeaturedVideoCard video={featured} mounted={mounted} />
          </motion.div>

          {others.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-3 md:space-y-4"
            >
              {others.slice(0, 3).map((video, index) => (
                <SecondaryVideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  mounted={mounted}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function FeaturedVideoCard({
  video,
  mounted,
}: {
  video: Video;
  mounted: boolean;
}) {
  const [hover, setHover] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });
  const springY = useSpring(rawY, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  const translateX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const translateY = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const scale = useTransform(springX, [-0.5, 0.5], [1.03, 1.03]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
  };

  const platformIcon =
    video.platform === "youtube" ? (
      <FaYoutube className="text-red-500" />
    ) : video.platform === "twitch" ? (
      <FaTwitch className="text-purple-500" />
    ) : (
      <FaTiktok className="text-white" />
    );

  const contentTypeLabel =
    video.contentType === "youtube_video"
      ? "Video"
      : video.contentType === "youtube_short"
      ? "Short"
      : video.contentType === "twitch_stream"
      ? "Stream"
      : video.contentType === "twitch_clip"
      ? "Clip"
      : video.contentType === "tiktok_video"
      ? "Video"
      : "Live";

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => mounted && setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        rawX.set(0);
        rawY.set(0);
      }}
      className="group block"
    >
      <motion.div
        className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl shadow-xl md:shadow-2xl shadow-black/20"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          ref={imageRef}
          className="relative aspect-video overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            style={{ x: translateX, y: translateY, scale }}
            transition={{ type: "tween", duration: 0.25 }}
            className="w-full h-full"
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          <AnimatePresence>
            {hover && mounted && (
              <motion.div
                key="shine"
                className="pointer-events-none absolute inset-0 overflow-hidden"
                initial={{ x: "-140%", opacity: 0 }}
                animate={{ x: "140%", opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div
                  className="h-full w-[60%] bg-white/35"
                  style={{ transform: "skewX(-18deg)", filter: "blur(4px)" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pointer-events-none absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
            <span className="text-base md:text-xl">{platformIcon}</span>
            <span className="text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.14em] md:tracking-[0.16em] text-white/70">
              {contentTypeLabel}
            </span>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            animate={hover && mounted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              animate={hover && mounted ? { scale: 1 } : { scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.55)]"
            >
              <FaPlay className="text-black text-xl md:text-2xl lg:text-3xl ml-0.5 md:ml-1" />
            </motion.div>
          </motion.div>
        </div>

        <div className="p-4 sm:p-5 md:p-6 lg:p-7">
          <div className="flex items-start gap-2 md:gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 md:mb-1.5 line-clamp-2 group-hover:text-[#FFD700] transition-colors duration-200">
                {video.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/65">
                {video.creatorName}
              </p>
            </div>
            <FiExternalLink className="mt-0.5 md:mt-1 text-white/40 group-hover:text-[#FFD700] transition-colors flex-shrink-0" />
          </div>
          <div className="mt-2 md:mt-3 flex items-center gap-2">
            <span className="text-[10px] sm:text-xs text-[#FFD700]/60 uppercase tracking-wider font-semibold">
              {video.creatorTier}
            </span>
          </div>
        </div>
      </motion.div>
    </a>
  );
}

function SecondaryVideoCard({
  video,
  index,
  mounted,
}: {
  video: Video;
  index: number;
  mounted: boolean;
}) {
  const [hover, setHover] = useState(false);
  const platformIcon =
    video.platform === "youtube" ? (
      <FaYoutube className="text-red-500 text-xs" />
    ) : video.platform === "twitch" ? (
      <FaTwitch className="text-purple-500 text-xs" />
    ) : (
      <FaTiktok className="text-white text-xs" />
    );

  const contentTypeLabel =
    video.contentType === "youtube_video"
      ? "Video"
      : video.contentType === "youtube_short"
      ? "Short"
      : video.contentType === "twitch_stream"
      ? "Stream"
      : video.contentType === "twitch_clip"
      ? "Clip"
      : video.contentType === "tiktok_video"
      ? "Video"
      : "Live";

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => mounted && setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{
          duration: 0.5,
          delay: 0.15 + index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -4 }}
        className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl shadow-md md:shadow-lg shadow-black/40"
      >
        <div className="flex gap-2.5 sm:gap-3">
          <div className="relative w-28 sm:w-32 md:w-40 aspect-video shrink-0 overflow-hidden">
            <motion.div
              animate={hover ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="pointer-events-none absolute top-1.5 left-1.5 md:top-2 md:left-2 inline-flex items-center justify-center rounded-full bg-black/70 px-1.5 md:px-2 py-0.5 md:py-1">
              {platformIcon}
            </div>
            {hover && (
              <motion.div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
                  <FaPlay className="text-black text-[10px] md:text-xs ml-0.5" />
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex-1 py-2.5 sm:py-3 pr-3 sm:pr-4 min-w-0">
            <p className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.12em] md:tracking-[0.16em] text-white/40 mb-0.5 md:mb-1">
              {contentTypeLabel}
            </p>
            <h4 className="text-xs sm:text-sm md:text-base font-semibold text-white line-clamp-2 group-hover:text-[#FFD700] transition-colors duration-200">
              {video.title}
            </h4>
            <p className="mt-0.5 md:mt-1 text-[10px] sm:text-xs text-white/60 line-clamp-1">
              {video.creatorName}
            </p>
          </div>
        </div>
      </motion.div>
    </a>
  );
}
