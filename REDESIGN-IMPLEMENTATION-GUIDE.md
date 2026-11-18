# Aureum Website Redesign — Implementation Guide

> A detailed, goal-based document describing the multi-phase redesign of the Aureum Mall & Residences website. Use this as a training reference for any AI tool continuing the work.

---

## 1. Project Overview

**Site:** Aureum Mall & Residences — a mixed-use development in Bahria Town Lahore (mall, residences, offices, food court, hotel).  
**Tech stack:** Next.js 16+ · React 19 · TypeScript · CSS Modules + globals.css  
**Branch:** `redesign/belgrade-arbor-style`  
**Remote:** `https://github.com/syed-daniyalH/aureummall-website.git`

### Design Philosophy
The redesign brings **premium, scroll-driven animation patterns** from four approved reference websites into the Aureum site. The goal is a cinematic, editorial feel — animations that reveal content progressively as the user scrolls, 3D perspective effects on image galleries, and interactive elements that make the site feel alive without overwhelming the visitor.

### Brand Tokens (defined in globals.css `:root`)
| Token | Value | Usage |
|-------|-------|-------|
| `--navy-deep` | `#163473` | Primary dark background |
| `--indigo` | `#163473` | Headings, accent text |
| `--gold` | `#1B63AD` | CTA highlights, links |
| `--gold-soft` | `#3694CF` | Softer accents, highlights |
| `--page` | `#F4F5F8` | Page background |
| `--font-serif` | `'Playfair Display'` | Display headings |
| `--font-sans` | `'Manrope'` | Body text |

---

## 2. Reference Websites & What We Took From Each

### 2.1 Belgrade Arbor (belgradearbor.com)
**Pattern:** Blur-to-sharp text reveals on scroll  
**What we copied:**
- As sections scroll into view, text starts blurred and transparent, then sharpens and becomes fully opaque
- Uses CSS `animation-timeline: view()` — a native scroll-driven animation (no JavaScript)
- Applied via a `.textReveal` class added to section headings and copy blocks

**Implementation:**
```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .textReveal {
      animation: textRevealBlur linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 70%;
    }
    @keyframes textRevealBlur {
      from { opacity: 0; filter: blur(8px); }
      to   { opacity: 1; filter: blur(0); }
    }
  }
}
```

**Files touched:**
- `src/app/globals.css` — the `.textReveal` keyframes and `@supports` block
- `src/components/ui/SectionHeading.tsx` — added `textReveal` class to all shared headings
- `src/features/wordpress-conversion/components/WordPressHomeExperience.tsx` — added `textReveal` to editorial heading, residences copy, dev copy, amenities, location sections

---

### 2.2 Harsukh (harsukh.com)
**Pattern:** Animated SVG route map with terrain visuals  
**What we copied:**
- An SVG path that "draws itself" as the user scrolls, tracing a journey from the airport to the project
- Terrain gradient fills behind the route path (green to brown elevation look)
- Altitude labels at waypoints that light up as the route progresses
- `strokeDasharray` / `strokeDashoffset` animation for progressive path reveal

**Implementation:**
- SVG `<defs>` with `<linearGradient>` for terrain fill
- `journeyAltitudeLabel` SVG groups with dashed vertical lines and text labels
- Scroll-linked animation using `IntersectionObserver` for progress tracking

**Files touched:**
- `src/features/homepage-showroom/components/JourneyToAureum.tsx` — enhanced SVG with terrain gradient, altitude labels
- `src/features/homepage-showroom/data.ts` — journey stop data, image paths
- `src/app/globals.css` — `.journeyAltitudeLabel` styles, journey scrollytelling CSS (~500 lines)

---

### 2.3 Azimute (azimute.co)
**Pattern:** 3D perspective image gallery with tilt effects  
**What we copied:**
- Images in a grid with `perspective` on the parent and `rotateY()` on child cards
- Side cards tilt inward, center card pushes forward with `translateZ()`
- On hover, cards flatten to 0deg rotation and scale up slightly
- Smooth cubic-bezier transitions for the hover effect

**Implementation:**
```css
.collage { perspective: 1200px; }
.collage > figure:first-child { transform: rotateY(4deg); }
.collage > figure:last-child { transform: rotateY(-4deg); }
.collage > figure:hover { transform: rotateY(0deg) scale(1.02); }
```

Applied to two sections:
1. **Editorial collage** (Inside Aureum) — 3-column gallery with side images tilted
2. **Lifestyle section** — 3-card grid with deeper tilt (5deg), center card pushed forward

**Files touched:**
- `src/features/wordpress-conversion/components/WordPressHomeExperience.module.css` — `.collage` perspective, `.lifestyleGrid` / `.lifestyleCard` 3D transforms
- `src/features/wordpress-conversion/components/WordPressHomeExperience.tsx` — new lifestyle section with 3 showcase images

---

### 2.4 Still/Form (still-form.com)
**Pattern:** Scroll-driven building explorer with sticky sections  
**What we copied:**
- Large hero section that expands from a small scale to full-screen as user scrolls
- Text that slides across behind the expanding image
- `position: sticky` sections that pin content while scroll progresses
- CSS `animation-timeline: view()` for the expand/reveal sequence
- Uses `@supports (animation-timeline: view())` for progressive enhancement

**Implementation:**
- `.gateway` section with 190svh height for scroll room
- `.gatewayStage` as `position: sticky; top: 0; height: 100svh`
- `@keyframes architectureExpand` from `scale(0.32)` to `scale(1)`
- `@keyframes wordAcross` for the sliding "AUREUM" text
- Only activates on screens >= 900px wide with `prefers-reduced-motion: no-preference`

**Files touched:**
- `src/features/wordpress-conversion/components/WordPressHomeExperience.module.css` — `.gateway`, `.gatewayStage`, `.gatewayWord`, `.gatewayImage` scroll animations
- `src/features/wordpress-conversion/components/WordPressHomeExperience.tsx` — architecture gateway section

---

## 3. Implementation Phases

### Phase 1 (Commit: `7927f4a`)
**Blur-to-sharp reveals, route map terrain, condensed payment plan**

| Feature | Description |
|---------|-------------|
| Text reveals | Added `.textReveal` CSS class with scroll-driven blur animation; applied to 9+ elements across homepage |
| Route map terrain | Enhanced JourneyToAureum SVG with gradient terrain fill and altitude labels at each waypoint |
| Payment plan | Split old "Upfront" figure into separate "At booking" (10%) and "Confirmation" (15%) rows; added `calcFigureHighlight` accent on the Monthly row |

### Phase 2 (Commit: `2cc0445`)
**Azimute-style 3D perspective gallery and lifestyle section**

| Feature | Description |
|---------|-------------|
| 3D collage | Added `perspective: 1200px` to editorial image collage; side figures get `rotateY(±4deg)` with hover-to-flat transitions |
| Lifestyle section | New dark-background section between architecture and residences with 3 images in a 3D perspective grid (Ring Road Sunset, Glass Atrium Aerial, Main Road View) |
| Reduced motion | Full `@media (prefers-reduced-motion: reduce)` block disabling all 3D transforms |

### Phase 3 (Commit: `1fc0ebd`)
**Animated counters, animation toggle, nearby landmarks**

| Feature | Description |
|---------|-------------|
| AnimatedCounter | New `src/components/ui/AnimatedCounter.tsx` — counts up from 0 when scrolled into view using `IntersectionObserver`, cubic ease-out over 1200ms, respects `prefers-reduced-motion` |
| AnimationToggle | New `src/components/ui/AnimationToggle.tsx` — fixed-position button that adds `.animationsOff` to `<html>`, persists to `localStorage` as `aureum-animations` |
| Nearby landmarks | 6 driving-time landmarks added to the location section (Bahria Town Main Gate, Ring Road Interchange, Packages Mall, Allama Iqbal Airport, Lahore Motorway M-2, DHA Phase 6) |
| Kill switch CSS | `.animationsOff` class sets `animation-duration: 0s`, `transition-duration: 0s`, `scroll-behavior: auto` globally |

---

## 4. Key Files Map

### Core Layout & Styling
| File | Purpose |
|------|---------|
| `src/app/globals.css` | Global styles (~10,000+ lines). Contains all animation keyframes, text reveal, journey scrollytelling, calculator layout, animation toggle, landmarks grid |
| `src/app/layout.tsx` | Root layout — includes `AnimationToggle` component |

### Homepage
| File | Purpose |
|------|---------|
| `src/features/wordpress-conversion/components/WordPressHomeExperience.tsx` | **Main homepage component** — editorial section, architecture gateway, lifestyle grid, residences, stats, building explorer, calculator, tour, amenities, location |
| `src/features/wordpress-conversion/components/WordPressHomeExperience.module.css` | CSS module for homepage — collage 3D perspective, lifestyle grid, gateway scroll animations, responsive breakpoints |

### Journey / Route Map
| File | Purpose |
|------|---------|
| `src/features/homepage-showroom/components/JourneyToAureum.tsx` | Scroll-driven SVG route from airport to Aureum with terrain fills and altitude labels |
| `src/features/homepage-showroom/data.ts` | Journey waypoint data (names, coordinates, images) |

### Payment Plans
| File | Purpose |
|------|---------|
| `src/features/payment-plans/components/PriceCalculator.tsx` | Interactive calculator with condensed At Booking / Confirmation / Monthly / On Possession layout |

### UI Components (new in this redesign)
| File | Purpose |
|------|---------|
| `src/components/ui/AnimatedCounter.tsx` | Scroll-triggered count-up animation (IntersectionObserver + requestAnimationFrame) |
| `src/components/ui/AnimationToggle.tsx` | Accessibility toggle — disable all animations site-wide |
| `src/components/ui/SectionHeading.tsx` | Shared heading with blur-to-sharp `.textReveal` class |

### Images
| File | Purpose |
|------|---------|
| `src/features/project-showcase/images.ts` | Central image registry — exports `EXTERIOR_EVENING`, `EXTERIOR_DAY_WIDE`, `RING_ROAD_SUNSET`, `MAIN_ROAD_VIEW`, `GLASS_ATRIUM_AERIAL`, `GLASS_ATRIUM_CLOSE`, etc. |

---

## 5. CSS Animation Techniques Used

### Scroll-Driven Animations (no JS)
```css
@supports (animation-timeline: view()) {
  .element {
    animation: myAnimation linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 70%;
  }
}
```
- **Progressive enhancement** — only activates in browsers supporting `animation-timeline: view()`
- **Always wrapped** in `@supports` and `prefers-reduced-motion: no-preference`
- Used for: text reveals, gateway image expansion, sliding text

### CSS 3D Perspective
```css
.parent { perspective: 1000px; }
.child { transform: rotateY(5deg); transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1); }
.child:hover { transform: rotateY(0deg) scale(1.04); }
```
- Used for: editorial collage, lifestyle grid
- Disabled on mobile (`perspective: none; transform: none`)
- Disabled when `prefers-reduced-motion: reduce`

### IntersectionObserver Animations (JS)
```tsx
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) { /* trigger animation */ }
}, { threshold: 0.3 });
```
- Used for: AnimatedCounter count-up
- Respects `prefers-reduced-motion`
- Fires once only (`hasAnimated` ref prevents re-triggers)

### SVG Path Drawing
```css
stroke-dasharray: totalLength;
stroke-dashoffset: totalLength; /* hidden */
/* animate to 0 to reveal */
```
- Used for: JourneyToAureum route line

---

## 6. Accessibility Rules (MUST follow)

1. **Every animation** must be wrapped in `@media (prefers-reduced-motion: no-preference)` or check `window.matchMedia('(prefers-reduced-motion: reduce)')` in JS
2. The **AnimationToggle** provides a manual override — adds `.animationsOff` to `<html>` which kills all animations/transitions globally
3. **No autoplay video** — all media is user-initiated
4. **Scroll-driven animations** must be in `@supports (animation-timeline: view())` for graceful degradation
5. **3D transforms** disabled on mobile viewports (< 760px) and when reduced motion is preferred

---

## 7. Project Statistics Data

Located in `src/lib/project-facts.ts`:
```ts
PROJECT_STATS = [
  ['16', 'Kanal landmark'],
  ['3', 'Retail levels'],
  ['20+', 'Planned amenities'],
  ['25 min', 'From Lahore airport']
]
```

---

## 8. Image Assets

All approved images are in `public/assets/aureum/approved/` with subfolders:
- `exterior/` — building exterior renders (day, evening, wide)
- `interior/` — mall, atrium, food court renders
- `residences/` — apartment interior renders
- `lifestyle/` — Ring Road, aerial views
- `og/` — Open Graph social sharing images

The image registry at `src/features/project-showcase/images.ts` maps descriptive names to `{ src, alt, label }` objects used by `<ShowcaseFigure>`.

---

## 9. What's Left / Future Phases

### Not yet pushed to GitHub
All 3 phases are committed locally on `redesign/belgrade-arbor-style` but not pushed. The push requires fixing Git credential authentication (Windows Credential Manager has stale credentials for the GitHub remote).

### Potential Phase 4 Ideas
- **Smooth scroll improvements** — polished scroll-snap sections
- **Image lazy loading with blur placeholders** — LQIP blur-up effect on all images
- **Dark mode support** — the navy-deep sections already work, but light sections need a dark variant
- **Performance optimization** — code-split heavy components, optimize image sizes
- **Mobile gesture interactions** — swipe galleries, pull-to-refresh

### Known Issues
- Payment plan layout on mobile may need review (user flagged)
- Git push blocked by credential mismatch (user needs to clear Windows Credential Manager entry for github.com)

---

## 10. How to Continue This Work

### Setup
```bash
git checkout redesign/belgrade-arbor-style
npm install
npm run dev
```

### Key Principles
1. **CSS-first animations** — prefer `animation-timeline: view()` and CSS transforms over JavaScript animation libraries
2. **Progressive enhancement** — always wrap in `@supports` and reduced-motion queries
3. **No external animation libraries** — everything is vanilla CSS + minimal IntersectionObserver JS
4. **Brand consistency** — use the CSS custom properties (tokens) defined in `:root`, never hardcode colors
5. **Mobile-first responsive** — disable 3D effects and simplify layouts below 760px
6. **Performance** — no layout thrashing, use `transform` and `opacity` for GPU-accelerated animations only
7. **Commit convention** — descriptive message + `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`

### File Conventions
- Global styles go in `src/app/globals.css`
- Component-scoped styles use CSS Modules (`.module.css`)
- New UI components go in `src/components/ui/`
- Feature components go in `src/features/<feature>/components/`
- Image registries go in `src/features/project-showcase/images.ts`
- Project data (stats, amenities, developer info) lives in `src/lib/project-facts.ts`
