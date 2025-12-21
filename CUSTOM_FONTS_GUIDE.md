# How to Use Custom Fonts (e.g., TECHNOPATH)

## Summary of Changes Made

I implemented a premium esports visual overhaul with the following changes:

### What I Did:
1. **Typography System** - Added Teko font for headings (similar to TECHNOPATH)
2. **3D Gold Text Effect** - `.text-3d-gold` CSS class for premium gold text
3. **Esports Labels** - `.label-esports` class for spaced uppercase text
4. **Gold Rim Cards** - Animated glow effect component
5. **Gold Flourishes** - SVG vine/laurel decorations for corners
6. **Atmospheric Fog** - Subtle depth effects
7. **Applied to Pages** - Hero, Creators, and News sections

All changes use smooth animations, respect accessibility preferences, and maintain mobile responsiveness.

---

## How to Use Your Custom Fonts (TECHNOPATH)

If you have the TECHNOPATH font files, here's how to integrate them:

### Step 1: Add Font Files

1. Create a fonts folder in your `public` directory:
```bash
mkdir -p public/fonts
```

2. Add your TECHNOPATH font files (`.woff2`, `.woff`, `.ttf`, or `.otf`):
```
public/fonts/
  ├── technopath-bold.woff2
  ├── technopath-bold.woff
  ├── technopath-medium.woff2
  └── technopath-medium.woff
```

### Step 2: Update `src/app/globals.css`

Add `@font-face` declarations at the top of the file:

```css
/* Add this at the very top of globals.css */
@font-face {
  font-family: 'Technopath';
  src: url('/fonts/technopath-bold.woff2') format('woff2'),
       url('/fonts/technopath-bold.woff') format('woff');
  font-weight: 700;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Technopath';
  src: url('/fonts/technopath-medium.woff2') format('woff2'),
       url('/fonts/technopath-medium.woff') format('woff');
  font-weight: 500;
  font-display: swap;
  font-style: normal;
}

/* Then below, update the CSS variable */
:root {
  --font-display: 'Technopath', ui-sans-serif;
  /* ... rest of your CSS variables */
}
```

### Step 3: Update `src/app/layout.tsx`

Remove Google Fonts import and use CSS-based font loading:

```tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Outfit } from "next/font/google";

// Body font from Google Fonts
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

// TECHNOPATH loaded via @font-face in globals.css
// No need to import here!

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="safe-areas">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

### Step 4: Update `tailwind.config.ts`

```typescript
export default {
  theme: {
    extend: {
      fontFamily: {
        display: ['Technopath', 'ui-sans-serif', 'system-ui'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
      },
      // ... rest of config
    },
  },
}
```

### Alternative: Next.js `localFont` (Recommended)

For better performance with Next.js optimization:

#### Update `src/app/layout.tsx`:

```tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";

// Body font
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

// Custom TECHNOPATH font
const technopath = localFont({
  src: [
    {
      path: '../fonts/technopath-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/technopath-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${technopath.variable} ${outfit.variable}`}>
      <body className="safe-areas">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

**Note:** Move fonts to `src/fonts/` directory for this approach:
```
src/fonts/
  ├── technopath-bold.woff2
  └── technopath-medium.woff2
```

---

## Current Setup (Using Teko)

Currently, the site uses **Teko** from Google Fonts as a placeholder because:
- It's free and readily available
- It provides a similar condensed, geometric esports aesthetic
- It works out of the box with Next.js

If you provide TECHNOPATH font files, I can help you integrate them using the methods above.

---

## Where Font Is Used

After integration, the custom font will automatically apply to:
- All headings (h1, h2, h3) via `.h1`, `.h2`, `.h3` classes
- Hero section "Bigger Stages" text with 3D gold effect
- Creators page "Creators" heading
- Any element with `.font-display` class

---

## Need Help?

If you have the TECHNOPATH font files ready, let me know and I can:
1. Create the proper folder structure
2. Update the configuration files
3. Test the integration
