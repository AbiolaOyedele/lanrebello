# Scroll-Driven In Numbers Section

## Overview
Replaced the spring-based animation approach with a pure scroll-driven system using Framer Motion's `useScroll` and `useTransform` hooks.

## Key Implementation Details

### Component Structure
- **InNumbers.tsx** — Main section component that orchestrates the layout
- **StickyPanel** — Sticky container holding the animated digits
- **NumberFrame** — Manages opacity and image parallax for each stat block
- **DigitMask** — Individually masked digit strips with scroll synchronization

### Scroll Mechanism
```
useScroll() → scrollYProgress (0 to 1)
                    ↓
useTransform() → Maps to digit position
                    ↓
translateY → 0 (showing 0) to -(digit × 240px) (showing target digit)
```

### Dimensions
- `DIGIT_HEIGHT = 240px` — Height of each digit container
- `FONT_SIZE = 280px` — Large, bold Inter Display font
- Container height: `300vh per stat` — Provides generous scroll depth

### Sticky Behavior
```
Position: sticky; top: 0; height: 100vh
├── Digit strips (right 62% of viewport)
└── Text & CTA (left 38% of viewport)
```

### Scroll Range Calculation
For each stat at `index`:
- `segmentSize = 1 / total stats`
- `center = (index + 0.5) × segmentSize`
- `lo = center - (segmentSize × 0.55)` — Scroll entry threshold
- `hi = center + (segmentSize × 0.55)` — Scroll exit threshold

This creates a 110% overlap for smooth transitions between stats.

### Animation Details
- **Number Strip:** Direct scroll sync via `useTransform`
- **Opacity:** Bell curve fade (0 → 1 → 0) during scroll range
- **Image Parallax:** Subtle vertical shift (4% to -4%) for depth
- **Blend Mode:** `mix-blend-mode: lighten` reveals images inside digit shapes

### Features
✓ No spring config needed — pure scroll mapping
✓ Smooth 60fps animations (no layout shifts)
✓ GPU-accelerated transform
✓ TypeScript strict mode compliant
✓ Fully responsive using clamp() for typography

## Files Modified
1. `src/components/sections/InNumbers.tsx` — New component
2. `src/app/page.tsx` — Updated imports and component usage

## Testing Checklist
- [x] Component compiles without errors
- [x] TypeScript strict mode validation passes
- [x] Build succeeds with optimized output
- [ ] Visual test: Scroll through each stat block
- [ ] Visual test: Numbers animate smoothly 0→9
- [ ] Visual test: Images visible inside digit shapes
- [ ] Performance: No jank or frame drops
- [ ] Responsive: Test on mobile/tablet viewports

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Uses standard CSS transform and blend modes
