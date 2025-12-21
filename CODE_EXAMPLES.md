# Code Examples - Premium Esports Visual Overhaul

## 1. Typography Enhancement

### Before (layout.tsx)
```tsx
import { Outfit } from "next/font/google";

const heading = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
});

// In HTML
<html lang="en" className={`${heading.variable}`}>
```

### After (layout.tsx)
```tsx
import { Outfit, Teko } from "next/font/google";

// Body font
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

// Display font for headings - esports aesthetic (similar to TECHNOPATH)
const displayFont = Teko({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

// In HTML
<html lang="en" className={`${displayFont.variable} ${outfit.variable}`}>
```

## 2. Enhanced Text Effects

### New CSS Utility Classes (globals.css)
```css
/* 3D Gold text effect matching graphics */
.text-3d-gold {
  background: linear-gradient(180deg, #FFD700 0%, #FFBB00 45%, #B8860B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4)) 
          drop-shadow(0 4px 8px rgba(255,187,0,0.2));
}

/* Esports label style - spaced uppercase */
.label-esports {
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Font display utility */
.font-display {
  font-family: var(--font-display), var(--font-heading), ui-sans-serif, system-ui, -apple-system;
}
```

## 3. Hero Section Updates

### Before (Hero.tsx)
```tsx
function AnimatedHeading() {
  return (
    <motion.h1 className="h1 leading-tight text-center select-none tracking-wide">
      <AnimatedChunk text="Big Talents. " />
      <br />
      <AnimatedChunk text="Bigger Stages." highlight />
    </motion.h1>
  );
}
```

### After (Hero.tsx)
```tsx
import { GoldFlourish } from "@/components/ui/GoldFlourish";
import { AtmosphericFog } from "@/components/ui/AtmosphericFog";

function AnimatedHeading() {
  return (
    <motion.h1 className="h1 font-display leading-tight text-center select-none tracking-wide">
      <AnimatedChunk text="Big Talents. " />
      <br />
      <span className="text-3d-gold">
        <AnimatedChunk text="Bigger Stages." />
      </span>
    </motion.h1>
  );
}

// In the Hero component JSX:
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* Existing background effects */}
  
  {/* NEW: Atmospheric fog at bottom */}
  <AtmosphericFog position="bottom" opacity={0.12} height="300px" />
  
  {/* NEW: Gold flourishes - desktop only */}
  <div className="hidden lg:block">
    <GoldFlourish position="top-left" size={150} />
    <GoldFlourish position="top-right" size={150} />
  </div>
</div>
```

## 4. Creators Page Updates

### Before (CreatorsClient.tsx)
```tsx
<motion.h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6">
  <span className="block text-white/90">Meet Our</span>
  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#FFBB00] via-[#FFD700] to-[#D4AF37]">
    Creators
  </span>
</motion.h1>

// Tier label
<span className="text-sm font-bold text-white uppercase tracking-wider">
  Elite Creators
</span>
```

### After (CreatorsClient.tsx)
```tsx
<motion.h1 className="text-5xl sm:text-6xl lg:text-8xl font-black font-display tracking-tight mb-6">
  <span className="block text-white/90">Meet Our</span>
  <span className="block text-3d-gold">
    Creators
  </span>
</motion.h1>

// Tier label
<span className="label-esports text-white">
  Elite Creators
</span>
```

## 5. News Card Updates

### Before (NewsCard.tsx)
```tsx
export function NewsCard({ item, featured = false }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-black/70">
      {/* Card content */}
    </motion.article>
  );
}
```

### After (NewsCard.tsx)
```tsx
import { useReducedMotion } from "framer-motion";

export function NewsCard({ item, featured = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();
  
  return (
    <motion.article className="relative group flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-black/70">
      {/* NEW: Subtle gold glow on hover */}
      {!prefersReduced && isHovered && (
        <motion.div
          className="absolute -inset-[4px] rounded-2xl pointer-events-none -z-10"
          style={{
            background: "radial-gradient(circle, rgba(255, 187, 0, 0.2) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Existing card content */}
    </motion.article>
  );
}
```

## 6. New Component: GoldRimCard

### Usage Example
```tsx
import { GoldRimCard } from "@/components/ui/GoldRimCard";

// Subtle glow
<GoldRimCard glowIntensity="subtle" hoverScale={false}>
  <div className="p-6">Content with subtle gold glow</div>
</GoldRimCard>

// Medium glow (default)
<GoldRimCard glowIntensity="medium">
  <div className="p-6">Content with medium gold glow</div>
</GoldRimCard>

// Strong glow (for elite tier cards)
<GoldRimCard glowIntensity="strong">
  <div className="p-6">Elite content with strong gold glow</div>
</GoldRimCard>
```

## 7. New Component: GoldFlourish

### Usage Example
```tsx
import { GoldFlourish } from "@/components/ui/GoldFlourish";

// Corner decorations
<div className="relative">
  <GoldFlourish position="top-left" size={120} />
  <GoldFlourish position="top-right" size={120} />
  <GoldFlourish position="bottom-left" size={100} />
  <GoldFlourish position="bottom-right" size={100} />
  
  {/* Content */}
</div>

// Desktop only
<div className="hidden lg:block">
  <GoldFlourish position="top-left" size={150} />
</div>
```

## 8. New Component: AtmosphericFog

### Usage Example
```tsx
import { AtmosphericFog } from "@/components/ui/AtmosphericFog";

// Bottom fog (default)
<div className="relative">
  <AtmosphericFog position="bottom" opacity={0.12} height="300px" />
  {/* Section content */}
</div>

// Top fog
<div className="relative">
  <AtmosphericFog position="top" opacity={0.15} height="200px" />
  {/* Section content */}
</div>

// Custom styling
<div className="relative">
  <AtmosphericFog 
    position="bottom" 
    opacity={0.1} 
    height="250px"
    className="z-20"
  />
  {/* Section content */}
</div>
```

## Animation Principles Applied

### Before (harsh animation)
```tsx
<motion.div
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ duration: 0.5, repeat: Infinity }}
>
```

### After (smooth, elegant animation)
```tsx
<motion.div
  animate={{ 
    opacity: [0.35, 0.55, 0.35],
    scale: [0.98, 1.02, 0.98]
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
```

### Reduced Motion Support
```tsx
const prefersReduced = useReducedMotion();

// Skip animation if user prefers reduced motion
{!prefersReduced && (
  <motion.div
    animate={{ opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 3, repeat: Infinity }}
  />
)}
```

## Tailwind Config Updates

### Added Font Family Configuration
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
      },
      // ... existing colors
    },
  },
}
```

## Key Differences Summary

1. **Typography**: Outfit → Big Shoulders Display for headings
2. **Text Effects**: Simple gradients → 3D gold with drop shadows
3. **Labels**: Standard uppercase → Spaced uppercase (.label-esports)
4. **Decorations**: None → Gold vine flourishes
5. **Depth**: Flat → Atmospheric fog layers
6. **Hover Effects**: Basic → Premium gold glow
7. **Animations**: Variable → Consistently smooth 3s cycles
8. **Accessibility**: Good → Enhanced with reduced motion support
