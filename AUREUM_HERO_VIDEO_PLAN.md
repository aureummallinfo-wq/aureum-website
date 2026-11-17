# Aureum Hero Film — Image Selection and Production Plan

Status: planning only. No production code or live site has been changed.

## Goal

Create a Belgrade-Arbor-style opening for Aureum: a silent, full-screen architectural film that establishes the Lahore context, reveals the mixed-use building, and ends on a clear Aureum Mall & Residencies title. The experience should feel cinematic and premium without depending on heavy WebGL or a large GIF.

## Recommended format

- 12–16 second silent hero film.
- WebM (VP9) for modern browsers and H.264 MP4 fallback.
- One desktop source and one mobile crop.
- Poster image shown immediately while the film loads.
- `muted`, `playsInline`, and no sound dependency.
- Play once, then hold on the final frame; do not force an endless loop in the opening.
- “Skip intro”, pause, and reduced-motion controls.
- If video is unavailable, keep the poster and title fully usable.

## Selected source images

The selected images already exist in the Aureum project and should be copied to the Desktop reference folder for approval. They are approved local WebP assets, not newly generated images.

| Shot | File | Role in film | Motion treatment |
|---|---|---|---|
| 01 | `aureum-architecture-context.webp` | Establish Lahore and Aureum’s wider urban setting | Slow 2.5% push-in from the city toward the project |
| 02 | `aureum-architecture-aerial.webp` | Reveal the complete mall, hotel, residences, atrium, roads, and landscape | Gentle diagonal parallax; keep the atrium near the visual center |
| 03 | `aureum-exterior-ring-road-interchange.webp` | Show the destination from the approach and make the Ring Road relationship legible | Horizontal camera drift toward the entrance |
| 04 | `aureum-architecture-dusk.webp` | Introduce the warm architectural mood and the mixed-use identity | Slow vertical lift from mall to hotel and residences |
| 05 | `Glass Atrium View 03.webp` | Detail cut: glass, structure, light, and the central arrival experience | Short crossfade with a subtle scale-down |
| 06 | `Aureum Mall Exterior Evening View.webp` | Evening arrival and commercial energy | Pan across the facade; preserve the center sky area for copy |
| 07 | `aureum-exterior-night-wide.webp` | Final hero reveal and title frame | Fade to deep blue, then reveal the Aureum title letter by letter |

## Sequence and timing

### 0.00–1.80 seconds — The city context

Use `aureum-architecture-context.webp`. Begin with a dark charcoal overlay, then reveal the Lahore context. No headline yet. A small kicker may appear: `BAHRIA TOWN · RING ROAD INTERCHANGE · LAHORE`.

### 1.80–4.00 seconds — The landmark from above

Transition to `aureum-architecture-aerial.webp`. Use a slow crop movement so the viewer discovers the mall, hotel, residences, water channel, and roads in one continuous moment.

### 4.00–6.00 seconds — The approach

Use `aureum-exterior-ring-road-interchange.webp`. The movement should imply arrival from the Ring Road without pretending to be turn-by-turn navigation.

### 6.00–8.00 seconds — The architectural identity

Use `aureum-architecture-dusk.webp`. Move from the mall frontage upward to the residences and hotel. This is the emotional midpoint of the film.

### 8.00–9.60 seconds — The atrium detail

Use `Glass Atrium View 03.webp`. Keep this cut short and tactile: glass, structure, daylight, and the central destination.

### 9.60–11.60 seconds — Evening arrival

Use `Aureum Mall Exterior Evening View.webp`. Show the mall as an active destination, but keep the visual treatment calm rather than commercial or noisy.

### 11.60–14.50 seconds — Final reveal

Use `aureum-exterior-night-wide.webp`. Darken the image slightly, then reveal:

`AUREUM MALL`
`& RESIDENCIES`

Reveal the letters in small groups, not with a dramatic bounce. Hold the final frame for the CTA.

## On-screen controls

- `Skip intro` — immediately jumps to the final title frame.
- `Pause` — freezes the film without hiding the page.
- `Reduce motion` — replaces the film with the poster and a short opacity reveal.
- `Explore Aureum` — opens the project story.
- `View payment plans` — remains visible after the final reveal.

## Text-safe composition

- Keep the hero title in the upper-left or lower-left safe area on desktop.
- Use the darker sky/landscape area in the dusk and evening images for readable text.
- On mobile, use `aureum-architecture-dusk.webp` or a dedicated 9:16 crop; do not simply squeeze the aerial frame.
- Keep the logo and navigation above the film in a low-contrast floating bar.

## Implementation mapping

The current code already has the right foundation:

- `src/components/Hero.tsx` owns the hero layout and desktop/mobile poster choices.
- `src/features/immersive-media/components/BrandFilm.tsx` owns the silent film, poster fallback, and reduced-motion/data-saving behavior.
- `src/features/immersive-media/data.ts` owns the current official TVC sources and poster.
- Existing `public/video/aureum-tvc-720.mp4` and `public/video/aureum-tvc-1080.mp4` should be reviewed as possible filmed sources before creating a new edit.

The first implementation should extend this foundation rather than replace the production shell, navigation, SEO, CRM, or accessibility behavior.

## Performance requirements

- Target hero film: under 8–12 MB for desktop and under 4–6 MB for mobile.
- Poster must render before video network completion.
- Keep the hero `priority`; lazy-load all later sections.
- Use `transform` and `opacity` for motion.
- Avoid a full WebGL scene in the hero.
- Respect `prefers-reduced-motion` and `Save-Data`.
- Test on mobile throttling, Safari, Chrome, and slow 3G.

## Approval checkpoints

1. Approve the seven-image shot list.
2. Approve the 14-second timing and title copy.
3. Review a low-resolution storyboard/video draft.
4. Approve the final WebM/MP4 export.
5. Implement on the staging site only.
6. Run accessibility, performance, build, and browser checks.
7. Promote to production only after visual approval.

## Important note

These are artist’s impressions. The film should present Aureum as a premium architectural vision and arrival experience, while keeping project disclaimers and approved factual claims outside the cinematic layer.
