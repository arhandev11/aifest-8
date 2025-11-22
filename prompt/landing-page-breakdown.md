# Aisyah 8.0 Festival - Landing Page Implementation Guide

## LANDING PAGE OVERVIEW

**Purpose & Audience**: Event landing page for "Aisyah 8.0 Festival" - an Islamic educational/cultural festival with a mystical, contemplative theme targeting young adults and students.

**Visual Themes**:
- Dark, atmospheric design with forest/nature background
- Golden/cream color palette with ornate decorative elements
- Mystical/spiritual aesthetic with calligraphic-style typography
- High contrast between dark background and light text/elements

**Primary Conversion Goals**:
- Build anticipation through countdown timer
- Drive event awareness and registration interest
- Create emotional connection through thematic messaging

---

## VISUAL ELEMENT BREAKDOWN

### Layout Analysis:
1. **Header Section** (top of viewport)
   - Logo: Ornate circular emblem with "A" symbol, left-aligned (~40px from edge)
   - Navigation: Pill-shaped container with "Home" and "About" links, right-aligned
   - Background: Cream/beige (#F5E6D3 approximate)

2. **Hero Section** (center viewport)
   - Main Title: "Aisyah Festival" in cursive/script golden font
   - Version Badge: "8.0" in smaller ornate text, positioned bottom-left of title
   - Decorative Elements: Matching ornate emblems flanking the title (left and right)
   - Subtitle: "In the Age of Illusion: We Choose to See" in white serif font
   - Background: Dark atmospheric forest scene (section-1-bg.png)

3. **Countdown Section** (lower viewport)
   - Label: "COUNTDOWN" in uppercase white text with letter-spacing
   - Timer Display: "0 : 0 : 0 : 0" in large white numbers
   - Labels: "Days", "Hours", "Minutes", "Seconds" below each number
   - Decorative Element: Hourglass graphic centered below timer
   - Background: Gradient to black at bottom

### Color Palette (extracted):
- Primary Background: Dark gray/black (#1a1a1a to #000000)
- Navigation Background: Cream (#F5E6D3)
- Primary Text: White (#FFFFFF)
- Accent/Gold: Golden yellow (#D4AF37 / #F4E5C3)
- Subtitle Text: Light gray/white (#E5E5E5)

### Typography Hierarchy:
- Main Title: Large decorative script font (80-120px estimated)
- Version Badge: Medium script (24-32px)
- Subtitle: Serif font, medium size (18-24px)
- Countdown Label: Sans-serif uppercase (14-16px, letter-spacing: 2-3px)
- Timer Numbers: Bold sans-serif (60-80px)
- Timer Labels: Regular sans-serif (14-16px)
- Navigation: Medium weight sans-serif (16px)

---

## IMPLEMENTATION TASK BREAKDOWN

### Task 1: Project Structure & Base Configuration
**Prompt**: Set up the foundational component structure for the Aisyah 8.0 Festival landing page. Create a clean component hierarchy with the following structure:
- `/src/components/` directory for all custom components
- `/src/components/ui/` directory (already configured via shadcn)
- Create base layout component structure

**Specific Actions**:
- Verify Tailwind CSS is properly configured with custom colors
- Ensure path aliases (@/*) are working correctly
- Create directory structure: `src/components/sections/` for page sections

**Priority**: High
**Estimated Complexity**: Simple
**Dependencies**: None

---

### Task 2: Add Custom Tailwind Configuration
**Prompt**: Extend the Tailwind configuration to include custom colors and fonts matching the Aisyah Festival design. Add the following to `tailwind.config.js`:

**Custom Colors**:
```javascript
colors: {
  'festival-gold': '#D4AF37',
  'festival-cream': '#F5E6D3',
  'festival-dark': '#1a1a1a',
  'festival-black': '#000000',
  'festival-light-gold': '#F4E5C3',
}
```

**Custom Font Families**:
- Install Google Fonts: 'Playfair Display' (for subtitle serif)
- Install Google Fonts: 'Inter' (for UI elements)
- Consider script font for main title (or use SVG from assets)

**Custom Utilities**:
- Letter spacing for uppercase labels: `tracking-widest-xl: 0.2em`

**Priority**: High
**Estimated Complexity**: Simple
**Dependencies**: Task 1

---

### Task 3: Create Navigation Header Component
**Prompt**: Build a fixed navigation header component (`src/components/sections/Header.tsx`) with the following specifications:

**Layout**:
- Fixed positioning at top of viewport
- Full width with max-width container (1280px)
- Padding: 24px horizontal, 20px vertical
- Flex layout: space-between alignment

**Logo**:
- Position: Left side
- Image source: `/assets/logo.png`
- Size: 60px x 60px
- Apply subtle hover scale effect (transform: scale(1.05))
- Transition duration: 200ms

**Navigation Menu**:
- Position: Right side
- Container: Rounded pill shape
- Background: `#F5E6D3` (festival-cream)
- Padding: 12px 32px
- Border radius: 9999px (fully rounded)
- Shadow: subtle shadow (0 2px 8px rgba(0,0,0,0.1))

**Navigation Links**:
- Items: "Home" and "About"
- Spacing: 32px gap between items
- Font: Inter, 16px, medium weight (500)
- Color: Dark gray (#2d2d2d)
- Hover state: Color transition to festival-gold
- Active state: Underline decoration (2px, festival-gold)
- Transition: all 200ms ease

**Responsive Behavior**:
- Mobile (< 640px): Reduce horizontal padding to 16px, logo size to 50px
- Navigation items reduce gap to 20px

**Priority**: High
**Estimated Complexity**: Moderate
**Dependencies**: Task 2

---

### Task 4: Create Hero Section Component
**Prompt**: Build the main hero section component (`src/components/sections/HeroSection.tsx`) featuring the festival title, decorative elements, and tagline.

**Section Container**:
- Min-height: 100vh
- Background image: `/assets/section-1-bg.png`
- Background properties: cover, center, no-repeat
- Overlay: Linear gradient (from transparent to black bottom)
- Flexbox: centered content vertically and horizontally
- Padding: 100px top (account for header), 80px bottom

**Main Title Container**:
- Position: Relative (for decorative element positioning)
- Flex layout: row, items-center, justify-center
- Gap: 40px between decorative elements and title

**Decorative Emblems**:
- Left and right ornate circular logos
- Source: Extract from hero SVG or use logo.png with filtering
- Size: 80px x 80px
- Opacity: 0.9
- Animation: Subtle rotation on scroll (optional enhancement)

**Main Title**:
- Use the hero SVG: `/assets/section-1-hero.svg`
- Alternative: If text needed, use decorative script font
- Text: "Aisyah Festival"
- Color: Golden gradient or festival-light-gold
- Text align: center
- Max width: 800px
- Filter: drop-shadow(0 4px 12px rgba(212, 175, 55, 0.3))

**Version Badge "8.0"**:
- Position: Absolute, bottom-left of "Aisyah" text
- Font size: 32px
- Color: festival-cream
- Font style: Italic or script
- Background: Semi-transparent dark circle
- Padding: 8px 16px
- Border: 2px solid festival-gold

**Subtitle**:
- Text: "In the Age of Illusion: We Choose to See"
- Font: Playfair Display (serif)
- Size: 24px
- Weight: 400
- Color: White with 95% opacity
- Text align: center
- Margin top: 32px
- Letter spacing: 0.5px
- Line height: 1.6

**Animations**:
- Fade in on load: opacity 0 to 1, duration 1000ms
- Slide up on load: translateY(20px) to 0, duration 800ms
- Stagger: Title first (0ms), then subtitle (200ms delay)

**Priority**: High
**Estimated Complexity**: Complex
**Dependencies**: Task 2, Task 3

---

### Task 5: Create Countdown Timer Component
**Prompt**: Build an interactive countdown timer component (`src/components/CountdownTimer.tsx`) with real-time updates and visual polish.

**Component Logic**:
- Accept prop: `targetDate` (Date object or ISO string)
- Use `useState` for time remaining (days, hours, minutes, seconds)
- Use `useEffect` with setInterval to update every 1000ms
- Calculate time difference between now and target date
- Clean up interval on component unmount

**Container**:
- Background: Gradient from transparent to black
- Padding: 60px vertical, 40px horizontal
- Text align: center

**"COUNTDOWN" Label**:
- Text: "COUNTDOWN"
- Font: Inter, uppercase
- Size: 16px
- Weight: 600
- Color: White
- Letter spacing: 0.2em (tracking-widest)
- Margin bottom: 24px

**Timer Display Container**:
- Flex layout: row, justify-center, items-center
- Gap: 16px between units
- Margin bottom: 16px

**Individual Time Units**:
- Each unit (day/hour/minute/second) in separate div
- Display: Flex column, items-center
- Min width: 80px

**Number Display**:
- Font: Inter, bold (700)
- Size: 72px (desktop), 48px (mobile)
- Color: White
- Line height: 1
- Monospace variant for consistent width
- Padding: 12px
- Background: Subtle dark gradient or semi-transparent black
- Border radius: 8px
- Box shadow: 0 4px 12px rgba(0, 0, 0, 0.4)

**Colon Separators**:
- Character: ":"
- Font size: 72px (matching numbers)
- Color: White with 70% opacity
- Align vertically with numbers

**Unit Labels** (Days, Hours, Minutes, Seconds):
- Font: Inter, regular (400)
- Size: 14px
- Color: White with 80% opacity
- Margin top: 8px
- Text transform: capitalize

**Hourglass Graphic**:
- Position: Below timer
- Margin top: 32px
- Width: 120px
- Height: auto
- Opacity: 0.8
- Center aligned
- Source: Create SVG or use icon library (lucide-react has hourglass)

**Animation Effects**:
- Number flip animation when digit changes (optional enhancement)
- Pulse effect on hourglass (subtle scale animation)
- Glow effect on numbers (box-shadow pulse)

**Edge Cases**:
- Display "00" when countdown reaches zero
- Option to hide component after countdown ends
- Handle negative time gracefully

**Priority**: High
**Estimated Complexity**: Complex
**Dependencies**: Task 2

---

### Task 6: Create Countdown Section Layout
**Prompt**: Build the countdown section layout component (`src/components/sections/CountdownSection.tsx`) that wraps the countdown timer with proper spacing and background treatment.

**Section Container**:
- Min height: 60vh
- Background: Linear gradient
  - Start: `rgba(0, 0, 0, 0)` at 0%
  - Middle: `rgba(0, 0, 0, 0.8)` at 50%
  - End: `rgba(0, 0, 0, 1)` at 100%
- Padding: 80px vertical
- Flexbox: centered content

**Integration**:
- Import and render CountdownTimer component
- Pass target date as prop (example: new Date('2025-12-31T00:00:00'))
- Center horizontally with max-width container

**Priority**: Medium
**Estimated Complexity**: Simple
**Dependencies**: Task 5

---

### Task 7: Main App Assembly & Integration
**Prompt**: Update the main App component (`src/App.jsx` or convert to `src/App.tsx`) to assemble all sections into the complete landing page.

**Structure**:
```tsx
import Header from '@/components/sections/Header'
import HeroSection from '@/components/sections/HeroSection'
import CountdownSection from '@/components/sections/CountdownSection'

function App() {
  return (
    <div className="min-h-screen bg-festival-black">
      <Header />
      <HeroSection />
      <CountdownSection />
    </div>
  )
}
```

**Specifications**:
- Remove default Vite boilerplate content
- Ensure smooth scrolling: `html { scroll-behavior: smooth; }`
- Add scroll snap (optional): `scroll-snap-type: y mandatory` on sections
- Verify all imports use @ alias correctly

**Priority**: High
**Estimated Complexity**: Simple
**Dependencies**: Task 3, Task 4, Task 6

---

### Task 8: Add Scroll Animations & Parallax Effects
**Prompt**: Enhance the landing page with scroll-triggered animations and parallax effects for visual depth.

**Scroll Fade-In Effects**:
- Install library: `npm install framer-motion` (or use Intersection Observer API)
- Apply to hero subtitle: fade in when 50% visible
- Apply to countdown section: slide up + fade in when visible

**Parallax Background**:
- Hero section background: slower scroll rate (0.5x)
- Implementation: CSS `background-attachment: fixed` or transform on scroll
- Use `requestAnimationFrame` for smooth performance

**Hourglass Animation**:
- Continuous gentle rotation (rotate 0deg to 180deg over 4s)
- Sand flow effect (optional): gradient animation
- Scale pulse on hover

**Navigation Scroll Behavior**:
- Add subtle background blur when scrolled past hero
- Change navigation background opacity based on scroll position
- Smooth transitions (300ms ease-in-out)

**Performance Considerations**:
- Use `will-change: transform` on animated elements
- Debounce scroll listeners
- Use CSS transforms instead of position changes

**Priority**: Medium
**Estimated Complexity**: Moderate
**Dependencies**: Task 7

---

### Task 9: Responsive Design Implementation
**Prompt**: Ensure the landing page is fully responsive across all device sizes with mobile-first optimizations.

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Header Adjustments**:
- Mobile: Stack logo and nav vertically if needed, or reduce sizes
- Tablet: Maintain horizontal layout with reduced spacing

**Hero Section**:
- Mobile:
  - Hero SVG/title: scale down to 60% size
  - Decorative emblems: reduce to 50px or hide
  - Subtitle: 18px font size, padding 0 20px
  - Stack elements vertically with less gap
- Tablet: Scale to 80% of desktop size

**Countdown Section**:
- Mobile:
  - Timer numbers: 48px (from 72px)
  - Stack in 2x2 grid instead of row (Days/Hours top, Minutes/Seconds bottom)
  - Reduce gaps to 12px
  - Unit containers: min-width 60px
- Tablet: Maintain row layout, reduce to 56px numbers

**Touch Interactions**:
- Increase tap target sizes to minimum 44px x 44px
- Add hover states for touch devices using `@media (hover: hover)`
- Disable parallax on mobile for performance

**Testing Checklist**:
- Test on iPhone SE (375px)
- Test on iPad (768px)
- Test on desktop (1920px)
- Verify text readability at all sizes
- Check image scaling and quality

**Priority**: High
**Estimated Complexity**: Moderate
**Dependencies**: Task 7

---

### Task 10: Performance Optimization
**Prompt**: Optimize the landing page for fast loading and smooth performance.

**Image Optimization**:
- Compress background images (use WebP format)
- Implement lazy loading for below-fold content
- Use responsive images with srcset for different screen sizes
- Preload critical assets (hero SVG, background image)

**Code Splitting**:
- Lazy load countdown section: `const CountdownSection = lazy(() => import(...))`
- Use Suspense with fallback for loading states

**CSS Optimization**:
- Purge unused Tailwind classes (ensure purge config is correct)
- Minimize critical CSS path
- Use CSS containment for isolated sections

**Font Loading**:
- Use `font-display: swap` for Google Fonts
- Preload font files
- Consider variable fonts to reduce requests

**JavaScript Optimization**:
- Minimize bundle size
- Tree-shake unused dependencies
- Use production build for deployment

**Performance Targets**:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Lighthouse score: > 90

**Priority**: Medium
**Estimated Complexity**: Moderate
**Dependencies**: Task 9

---

### Task 11: Accessibility Enhancements
**Prompt**: Ensure the landing page meets WCAG 2.1 AA accessibility standards.

**Semantic HTML**:
- Use proper heading hierarchy (h1 for main title, h2 for countdown)
- Add landmark regions (header, main, nav)
- Include skip-to-content link for keyboard users

**Keyboard Navigation**:
- Ensure all interactive elements are focusable
- Add visible focus indicators (outline with festival-gold)
- Tab order follows logical reading flow
- Test navigation with keyboard only

**Screen Reader Support**:
- Add alt text to all images (logo, decorative emblems)
- Use aria-label for countdown timer ("Time remaining: X days, Y hours...")
- Add aria-live region for countdown updates
- Hide decorative elements from screen readers (aria-hidden="true")

**Color Contrast**:
- Verify text contrast ratios:
  - White text on dark background: should exceed 7:1
  - Navigation text on cream: should exceed 4.5:1
- Test with contrast checker tools

**Motion & Animation**:
- Respect `prefers-reduced-motion` media query
- Disable animations for users who prefer reduced motion
- Provide static fallbacks

**Testing**:
- Use axe DevTools or similar accessibility checker
- Test with screen reader (NVDA, VoiceOver)
- Verify keyboard-only navigation

**Priority**: Medium
**Estimated Complexity**: Moderate
**Dependencies**: Task 9

---

### Task 12: Add Micro-interactions & Polish
**Prompt**: Add subtle micro-interactions to enhance user engagement and perceived quality.

**Button/Link Hover States**:
- Navigation links: smooth color transition + subtle underline animation
- Logo: gentle scale + rotate effect on hover
- Add cursor pointer to all interactive elements

**Loading States**:
- Add skeleton loader for countdown before data loads
- Smooth fade-in for images as they load
- Progress indicator if any async data fetching

**Scroll Indicators**:
- Add "scroll down" indicator arrow at bottom of hero
- Animate bounce effect to encourage scrolling
- Hide after user scrolls

**Easter Eggs** (optional):
- Hourglass click interaction (flip animation)
- Konami code easter egg
- Particle effects on hover over decorative elements

**Visual Feedback**:
- Subtle page transitions
- Smooth scroll between sections
- Active state for current section in navigation

**Priority**: Low
**Estimated Complexity**: Simple
**Dependencies**: Task 11

---

## INTERACTIVITY SPECIFICATIONS

### Countdown Timer Behavior:
- **Update Frequency**: Every 1000ms (1 second)
- **Calculation**: `targetDate - currentDate` in milliseconds, converted to D:H:M:S
- **Zero State**: Display "00:00:00:00" and optionally show "Event Started!" message
- **Animation**: Optional flip animation when digits change (using CSS 3D transforms)

### Navigation Interactions:
- **Scroll Spy**: Highlight active section in navigation
- **Smooth Scroll**: Click navigation links to smooth scroll to sections
- **Mobile Menu**: If adding more nav items, implement hamburger menu for mobile

### Scroll Triggers:
- **Hero Parallax**: Background scrolls at 50% speed of foreground
- **Fade-ins**: Elements fade in when entering viewport (threshold: 0.3)
- **Scroll Progress**: Optional progress bar at top showing page scroll percentage

### Hover Effects:
- **Logo**: Scale 1.05, rotate 5deg, duration 200ms
- **Nav Links**: Color change, underline slide-in from left, duration 150ms
- **Timer Numbers**: Subtle glow pulse, duration 300ms

### Animation Timing:
- **Page Load**: Staggered fade-in (title 0ms, subtitle 200ms, countdown 400ms)
- **Scroll Animations**: Duration 600ms, easing cubic-bezier(0.4, 0, 0.2, 1)
- **Micro-interactions**: Duration 150-300ms, easing ease-in-out

---

## RESPONSIVE CONSIDERATIONS

### Mobile Adaptations (< 640px):
- Hero title: Scale to 60%, stack decorative elements vertically or hide
- Countdown: 2x2 grid layout instead of horizontal row
- Navigation: Reduce padding, consider hamburger if more items added
- Font sizes: Scale down by 20-30%
- Reduce vertical spacing between sections

### Tablet Adjustments (640px - 1024px):
- Maintain desktop layout with 80% scaling
- Adjust padding and margins proportionally
- Keep countdown in horizontal row but with smaller numbers

### Touch Optimizations:
- Minimum tap target: 44px x 44px
- Increase spacing between interactive elements
- Disable hover effects on touch devices
- Simplify or disable parallax for performance

### Breakpoint Strategy:
- Mobile-first approach (base styles for mobile)
- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Test at 375px (iPhone SE), 768px (iPad), 1920px (desktop)

---

## TECHNICAL RECOMMENDATIONS

### Tech Stack (Current Setup):
- **Framework**: React 19.1.1 with Vite 7.1.7 (Already configured)
- **Styling**: Tailwind CSS with shadcn/ui components
- **TypeScript**: Configured (convert .jsx to .tsx)
- **State Management**: React hooks (useState, useEffect) - sufficient for this scope

### Additional Dependencies to Consider:
```bash
# For animations (choose one):
npm install framer-motion          # Full-featured animation library
# OR
npm install react-intersection-observer  # Lightweight scroll detection

# For icons:
npm install lucide-react          # Already common with shadcn

# For date handling (countdown):
npm install date-fns              # Lightweight alternative to moment.js
```

### Performance Optimizations:
- **Image Format**: Convert PNG backgrounds to WebP (50-70% smaller)
- **Code Splitting**: Use React.lazy() for countdown section
- **Font Loading**: Subset Google Fonts to only needed characters
- **CSS**: Ensure Tailwind purge is configured for production builds
- **Caching**: Add service worker for offline capability (optional)

### Accessibility Tools:
- Install eslint-plugin-jsx-a11y for linting
- Use @axe-core/react for runtime accessibility checks in development
- Test with Lighthouse CI in build pipeline

### Browser Support:
- Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- CSS Grid and Flexbox (widely supported)
- CSS Custom Properties (IE11 fallback if needed)
- Intersection Observer API (polyfill for older browsers if necessary)

### Development Workflow:
1. Convert App.jsx to App.tsx for TypeScript benefits
2. Create components in this order: Header → HeroSection → CountdownTimer → CountdownSection
3. Test each component in isolation before integration
4. Add responsive styles incrementally
5. Implement animations after core layout is solid
6. Performance optimization in final phase

---

## SUGGESTED COMPONENT HIERARCHY

```
src/
├── App.tsx                          # Main app component
├── components/
│   ├── sections/
│   │   ├── Header.tsx              # Navigation header
│   │   ├── HeroSection.tsx         # Main hero with title
│   │   └── CountdownSection.tsx    # Countdown wrapper
│   ├── CountdownTimer.tsx          # Countdown logic & display
│   ├── TimeUnit.tsx                # Individual time unit display (optional)
│   └── ui/                         # shadcn components (if needed)
│       └── button.tsx              # Example shadcn component
├── hooks/
│   └── useCountdown.ts             # Custom hook for countdown logic
├── lib/
│   └── utils.ts                    # Utility functions (cn helper)
└── index.css                       # Global styles & Tailwind imports
```

### Component Breakdown:

**App.tsx** (Main Container)
- Imports and renders all sections
- Manages global state if needed
- Handles routing (if multi-page in future)

**Header.tsx** (Navigation)
- Logo component
- Navigation menu
- Responsive mobile menu (future)

**HeroSection.tsx** (Hero Content)
- Background image layer
- Main title (SVG or text)
- Decorative emblems
- Subtitle text
- Scroll animations

**CountdownSection.tsx** (Countdown Wrapper)
- Section container with gradient
- CountdownTimer component integration
- Hourglass graphic

**CountdownTimer.tsx** (Timer Logic)
- useCountdown hook or internal logic
- TimeUnit components (Days, Hours, Minutes, Seconds)
- Number display formatting
- Update interval management

**useCountdown.ts** (Custom Hook - Optional)
- Encapsulate countdown logic
- Calculate time remaining
- Return formatted values
- Handle cleanup

---

## IMPLEMENTATION SEQUENCE RECOMMENDATION

**Phase 1: Foundation (Tasks 1-2)**
1. Set up project structure
2. Configure Tailwind with custom theme
3. Verify build and development server

**Phase 2: Core Layout (Tasks 3-7)**
1. Build Header component
2. Build HeroSection component
3. Build CountdownTimer component
4. Build CountdownSection wrapper
5. Integrate all in App.tsx

**Phase 3: Enhancement (Tasks 8-9)**
1. Implement responsive design
2. Add scroll animations and parallax
3. Test across devices

**Phase 4: Polish (Tasks 10-12)**
1. Performance optimization
2. Accessibility improvements
3. Micro-interactions and final touches

---

## ASSET INVENTORY

Based on the reference image analysis, the following assets should be available in `/public/assets/`:

### Required Assets:
- `logo.png` - Ornate circular emblem for header
- `section-1-bg.png` - Dark forest/mystical background image
- `section-1-hero.svg` - Main "Aisyah Festival" title in golden script
- Decorative emblems (if separate from hero SVG)
- Hourglass graphic (or use lucide-react icon)

### Optional Assets:
- Favicon files
- Social media preview images
- Additional decorative elements

---

## NEXT STEPS

1. **Review Assets**: Verify all required assets exist in `/public/assets/`
2. **Start Implementation**: Begin with Phase 1 (Tasks 1-2)
3. **Incremental Development**: Complete tasks in sequence, testing each component
4. **Integration Testing**: Test full page after Phase 2
5. **Enhancement & Polish**: Add animations and optimizations in Phases 3-4

Each task above is self-contained and can be implemented step-by-step. Start with the foundation and build up to the complete landing page.
