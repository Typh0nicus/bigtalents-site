# Esports Visual Overhaul - Component Guide

This document provides a comprehensive guide to the new esports-themed components and design system enhancements implemented across the Big Talents site.

## 🎨 Design System Enhancements

### Extended Color Palette

The design system now includes expanded color tokens for a vibrant esports aesthetic:

```css
/* Neon & Highlights */
--neon-gold: #FFBB00;
--neon-blue: #00D9FF;
--neon-purple: #B026FF;

/* Shadow & Glow System */
--glow-gold-sm: 0 0 10px rgba(255,187,0,0.15);
--glow-gold-md: 0 0 20px rgba(255,187,0,0.25);
--glow-gold-lg: 0 0 40px rgba(255,187,0,0.35);
```

### Tailwind Extensions

New Tailwind utilities available:
- `shadow-glow-gold-sm/md/lg` - Gold glow box shadows
- `shadow-dramatic` - Deep dramatic shadows with gold accent
- `shadow-neon-blue/purple` - Neon color glows
- `bg-gradient-gold/gold-vibrant` - Pre-configured gold gradients

## 🧩 New Reusable Components

### Badge Component

Status indicators and labels with multiple variants.

**Location:** `src/components/ui/Badge.tsx`

**Usage:**
```tsx
import { Badge } from "@/components/ui/Badge";

<Badge variant="gold" size="md" glow>Elite</Badge>
<Badge variant="live" glow>LIVE</Badge>
<Badge variant="success">Active</Badge>
```

**Props:**
- `variant`: "default" | "success" | "warning" | "error" | "info" | "live" | "gold"
- `size`: "sm" | "md" | "lg"
- `glow`: boolean - Adds glow effect
- `className`: string - Additional CSS classes

### Chip Component

Interactive tags and role indicators.

**Location:** `src/components/ui/Chip.tsx`

**Usage:**
```tsx
import { Chip } from "@/components/ui/Chip";

<Chip variant="gold">Pro Player</Chip>
<Chip variant="neon-blue" removable onRemove={() => {}}>Tag</Chip>
```

**Props:**
- `variant`: "default" | "gold" | "neon-blue" | "neon-purple"
- `size`: "sm" | "md"
- `removable`: boolean
- `onRemove`: () => void

### Pill Component

Metric displays and stat containers.

**Location:** `src/components/ui/Pill.tsx`

**Usage:**
```tsx
import { Pill } from "@/components/ui/Pill";
import { FiTrendingUp } from "react-icons/fi";

<Pill icon={<FiTrendingUp />} variant="gold" glow>
  1.2M Followers
</Pill>
```

**Props:**
- `icon`: ReactNode
- `variant`: "default" | "gold" | "outlined"
- `size`: "sm" | "md" | "lg"
- `glow`: boolean

### GlowBorder Component

Animated glowing border wrapper.

**Location:** `src/components/ui/GlowBorder.tsx`

**Usage:**
```tsx
import { GlowBorder } from "@/components/ui/GlowBorder";

<GlowBorder glowColor="255,187,0" animate>
  <div className="p-4">Content with animated glow border</div>
</GlowBorder>
```

**Props:**
- `glowColor`: string - RGB values (default: "255,187,0")
- `animate`: boolean - Enable rotation animation
- `borderWidth`: number - Border width in pixels

**Note:** Respects `prefers-reduced-motion` preference.

### AccentDivider Component

Stylish section separators with gradient effects.

**Location:** `src/components/ui/AccentDivider.tsx`

**Usage:**
```tsx
import { AccentDivider } from "@/components/ui/AccentDivider";

<AccentDivider variant="gold" thickness="medium" />
```

**Props:**
- `variant`: "default" | "gold" | "gradient"
- `thickness`: "thin" | "medium" | "thick"

### EnergyLines Component

Animated motion blur energy effects for backgrounds.

**Location:** `src/components/ui/EnergyLines.tsx`

**Usage:**
```tsx
import { EnergyLines } from "@/components/ui/EnergyLines";

<div className="relative">
  <EnergyLines count={6} />
  {/* Your content */}
</div>
```

**Props:**
- `count`: number - Number of energy lines (default: 5)
- `className`: string

**Note:** Automatically disabled for users with `prefers-reduced-motion`.

### GoldFlourish Component

Decorative SVG corner accents.

**Location:** `src/components/ui/GoldFlourish.tsx`

**Usage:**
```tsx
import { GoldFlourish } from "@/components/ui/GoldFlourish";

<div className="relative">
  <GoldFlourish position="top-left" />
  <GoldFlourish position="top-right" />
  {/* Your content */}
</div>
```

**Props:**
- `position`: "top-left" | "top-right" | "bottom-left" | "bottom-right"
- `animate`: boolean - Enable fade-in animation
- `className`: string

### StatBand Component

Display multiple metrics in pill format.

**Location:** `src/components/ui/StatBand.tsx`

**Usage:**
```tsx
import { StatBand } from "@/components/ui/StatBand";
import { FiUsers, FiTrendingUp } from "react-icons/fi";

const stats = [
  { label: "Players", value: "10K+", icon: <FiUsers />, variant: "gold" },
  { label: "Growth", value: "+25%", icon: <FiTrendingUp /> }
];

<StatBand stats={stats} />
```

**Props:**
- `stats`: Array of { label, value, icon?, variant? }
- `className`: string

### MediaCard Component

Video/VOD cards with live indicators and play overlays.

**Location:** `src/components/ui/MediaCard.tsx`

**Usage:**
```tsx
import { MediaCard } from "@/components/ui/MediaCard";

<MediaCard
  title="Epic Tournament Final"
  thumbnail="/images/video-thumb.jpg"
  href="/videos/final"
  duration="45:32"
  isLive={false}
  views="12.5K"
  date="2 days ago"
  category="Esports"
/>
```

**Props:**
- `title`: string
- `thumbnail`: string - Image URL
- `href`: string (optional) - Link destination
- `duration`: string (optional)
- `isLive`: boolean
- `views`: string (optional)
- `date`: string (optional)
- `category`: string (optional)

## 🎯 Enhanced Existing Components

### AnimatedButton

Enhanced with improved variant styling:
- **Primary**: Gradient background with gold glow
- **Outline**: Neon gold border with glassmorphic hover
- **Ghost**: Subtle border with gold accent on hover

### CreatorCard

Added asymmetric gold accent line using the `accent-line-gold` utility class.

### Hero Section

Enhancements:
- Grid overlay pattern
- Energy lines animation
- Diagonal stripe pattern
- Scanline overlay effect
- Text glow on heading
- Primary + Ghost CTA buttons

### Navbar

Enhanced glassmorphic effect using new `glass-surface-strong` utility with gold border accent.

### Footer

Improvements:
- Tiered dark surfaces with layered gradients
- Dotted grid pattern overlay
- Enhanced social icons with glassmorphic hover effects

## 🎨 Utility Classes Reference

### Text Effects
```css
.text-glow              /* Prominent gold text glow */
.text-glow-subtle       /* Subtle gold text glow */
.text-glow-neon         /* Dynamic neon glow */
.text-gradient-gold     /* Classic gold gradient */
.text-gradient-vibrant  /* Vibrant gold gradient */
.text-neon-blue         /* Blue neon text */
.text-neon-purple       /* Purple neon text */
```

### Shadow & Glow Effects
```css
.shadow-glow-vibrant    /* Enhanced gold glow shadow */
.shadow-dramatic        /* Deep shadow with gold accent */
.shadow-neon-blue       /* Blue neon shadow */
.shadow-neon-purple     /* Purple neon shadow */
```

### Background Patterns
```css
.dotted-grid           /* Dotted grid pattern */
.diagonal-lines        /* Diagonal line pattern */
.diagonal-stripes      /* Diagonal stripe pattern (gold) */
.grid-pattern-gold     /* Grid with gold lines */
.scanline-overlay      /* Animated scanline effect */
```

### Interactive Effects
```css
.shimmer-effect        /* Shimmer animation */
.energy-glow           /* Hover energy glow */
.glow-border           /* Animated glowing border */
.hover-lift            /* Lift + shadow on hover */
.glitch-hover          /* Subtle glitch effect on hover */
```

### Surfaces
```css
.glass-surface         /* Basic glassmorphic surface */
.glass-surface-strong  /* Enhanced glassmorphic surface */
.accent-line-gold      /* Left accent line */
```

## ♿ Accessibility Features

All components and animations respect accessibility preferences:

- **Reduced Motion**: All animations check `prefers-reduced-motion` and disable or reduce motion accordingly
- **Color Contrast**: All color combinations meet WCAG AA standards
- **Keyboard Navigation**: Enhanced focus states with gold outline
- **ARIA Labels**: Decorative elements marked with `aria-hidden="true"`

## 📱 Responsive Design

All components are mobile-first and fully responsive:
- Components adapt to screen sizes
- Touch-friendly hover states on mobile
- Optimized animations for performance
- Conditional rendering for resource-intensive effects

## 🎭 Animation Performance

Best practices implemented:
- GPU-accelerated transforms and opacity
- Limited animation ranges (capped at viewport or 120%)
- Conditional rendering based on device capabilities
- FPS throttling for particle systems

## 💡 Usage Examples

### Creating an Enhanced Card Section

```tsx
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { AccentDivider } from "@/components/ui/AccentDivider";

<section className="relative py-20">
  {/* Background effects */}
  <GridOverlay opacity={0.04} size={40} />
  <EnergyLines count={5} />
  
  {/* Content */}
  <div className="container">
    <div className="flex items-center gap-3 mb-6">
      <Badge variant="gold" glow>Featured</Badge>
      <h2 className="text-gradient-vibrant text-glow-subtle">
        Tournament Highlights
      </h2>
    </div>
    
    <AccentDivider variant="gold" thickness="medium" className="mb-8" />
    
    <div className="grid gap-6 md:grid-cols-3">
      {/* Your cards here */}
    </div>
  </div>
</section>
```

### Building a Stat Display

```tsx
import { StatBand } from "@/components/ui/StatBand";
import { FiUsers, FiTrendingUp, FiAward } from "react-icons/fi";

const stats = [
  { 
    label: "Players", 
    value: "10K+", 
    icon: <FiUsers />, 
    variant: "gold" as const 
  },
  { 
    label: "Growth", 
    value: "+25%", 
    icon: <FiTrendingUp /> 
  },
  { 
    label: "Wins", 
    value: "150", 
    icon: <FiAward /> 
  }
];

<StatBand stats={stats} className="justify-center" />
```

## 🔧 Customization

All components support className overrides for custom styling:

```tsx
<Badge 
  variant="gold" 
  className="text-lg px-6 py-2"
>
  Custom Styled Badge
</Badge>
```

## 📚 Further Reading

- See `IMPLEMENTATION_GUIDE.md` for deployment instructions
- See `REDESIGN_SUMMARY.md` for technical implementation details
- See component source files for inline documentation
