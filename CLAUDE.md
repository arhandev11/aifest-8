# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a landing page for AIFest 8.0 (Aisyah Festival 8.0), a festival event website built with React, Vite, and Tailwind CSS. The site features various sections showcasing festival information including countdown timer, event timeline, competitions, guest stars, gallery, and FAQs.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server (Vite with HMR)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on the codebase

### Package Management
The project uses npm with a lock file (`package-lock.json`). A `bun.lock` file is also present, indicating bun may have been used previously. Stick to npm for consistency unless instructed otherwise.

## Architecture

### Tech Stack
- **Build Tool**: Vite 7.x with SWC plugin for fast React refresh
- **Frontend**: React 19.x with TypeScript and JSX
- **Styling**: Tailwind CSS with custom festival color theme
- **Animations**: Framer Motion for scroll effects and transitions
- **UI Components**: Radix UI primitives (Accordion) with custom styling
- **Icons**: Lucide React and Radix Icons

### Project Structure

```
src/
├── components/
│   ├── sections/       # Main page sections (Hero, Countdown, Timeline, etc.)
│   └── ui/            # Reusable UI components (following shadcn/ui pattern)
├── lib/               # Utilities (cn helper for className merging)
├── assets/            # Static assets
├── App.tsx            # Main app component - imports and stacks all sections
├── main.jsx           # React entry point
└── index.css          # Global styles and Tailwind imports
```

### Component Organization

The app follows a **section-based architecture**:
- `App.tsx` is the main component that imports and stacks all page sections sequentially
- Each major section lives in `src/components/sections/` as a separate component
- Sections are self-contained and rendered in order: Header → Hero → Countdown → Video → Timeline → Competitions → Events → Guest Stars → Gallery → FAQ
- UI primitives go in `src/components/ui/` following shadcn/ui conventions

### Styling System

The project uses a **custom festival theme** defined in `tailwind.config.js`:
- Custom colors: `festival-gold`, `festival-cream`, `festival-dark`, `festival-black`, `festival-light-gold`
- Custom fonts: Playfair Display (serif, display) and Inter (sans-serif)
- Custom gradients and animations for accordion components
- Dark mode support via class-based strategy

### Path Aliases

TypeScript and Vite are configured with `@/*` alias pointing to `src/*`:
- Use `@/components/...` instead of relative imports
- Use `@/lib/utils` for the className utility helper
- Configured in both `tsconfig.json` and `vite.config.js`

### shadcn/ui Integration

The project uses shadcn/ui configuration (`components.json`):
- Style: "new-york"
- TypeScript enabled
- Components installed to `@/components/ui`
- CSS variables enabled for theming
- No prefix on Tailwind classes

When adding new shadcn/ui components, they should be placed in `src/components/ui/` and follow the existing patterns.

### Animation Patterns

Framer Motion is used extensively for:
- Parallax scroll effects (see `HeroSection.tsx` for reference)
- Fade-in animations using `opacity` and `y` transforms
- `useScroll` and `useTransform` hooks for scroll-linked animations
- Initial mount animations with `initial`, `animate`, and `transition` props

## File Naming Conventions

- Components: PascalCase with `.tsx` extension (e.g., `HeroSection.tsx`)
- Utilities: camelCase with `.ts` extension (e.g., `utils.ts`)
- Entry files: Use `.jsx` for JavaScript entry points (e.g., `main.jsx`)
- Sections are named descriptively: `[Name]Section.tsx`

## Configuration Notes

- **ESLint**: Configured for React with hooks plugin, ignores unused vars starting with uppercase or underscore
- **TypeScript**: Strict mode enabled with bundler module resolution
- **Vite**: Uses SWC for Fast Refresh instead of Babel (React Compiler not compatible with SWC)

## Asset Management

Static assets are stored in `public/assets/` directory. Reference them in components using `/assets/filename.ext` (leading slash indicates public directory).
