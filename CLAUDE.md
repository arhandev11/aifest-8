# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend for **AIFest 8.0 (Aisyah Festival 8.0)** — a public landing page plus a registration flow plus an authenticated admin dashboard for managing competition entries. The Laravel-style JSON API it talks to is documented in `API_DOCUMENTATION.md` (endpoints under `/api/...`, base URL configured in `src/lib/api.ts`).

## Development Commands

- `npm run dev` — Vite dev server with SWC Fast Refresh
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the built output
- `npm run lint` — ESLint (config only lints `**/*.{js,jsx}`; `.tsx` files are not type-checked or linted by this command — be aware when relying on `npm run lint` to catch issues)

A `bun.lock` is present alongside `package-lock.json`. Use **npm** unless instructed otherwise.

## Architecture

### Routing layout (`src/App.tsx`)

The app is **not** a single landing page — it's a React Router app with three areas:

- **Public**: `/` (HomePage), `/about`, `/daftar/:slug` (registration form), `/success`
- **Admin auth**: `/admin/login`
- **Admin (protected)**: `/admin` (dashboard), `/admin/lomba/:slug` (per-competition entries table), `/admin/settings` (toggle competition flags)

`HomePage` is the file that stacks all the marketing sections (Header → Hero → Countdown → Video → Timeline → Competitions → Events → Guest Stars → Seminar Speakers → Gallery → Sponsors → FAQ → Location iframe → Footer). Anything that used to live in `App.tsx` per old docs now lives in `HomePage.tsx`.

`ProtectedRoute` (`src/components/admin/ProtectedRoute.tsx`) wraps admin routes and waits for `AuthContext` to finish hydrating from localStorage before redirecting to `/admin/login`.

### State: two providers wrap the app

Both providers are mounted in `App.tsx` (`CompetitionProvider` outside, `AuthProvider` inside).

- **`AuthContext`** (`src/context/AuthContext.tsx`) — calls `POST /api/login`, stores `plainTextToken` in `localStorage` under `admin_token` (and user under `admin_user`), exposes `login`, `logout`, `token`, `user`, `isAuthenticated`, `isLoading`. Use `apiFetchWithAuth(endpoint, token, opts)` from `@/lib/api` for any authenticated request.
- **`CompetitionContext`** (`src/context/CompetitionContext.tsx`) — fetches `GET /api/competitions` on mount and exposes `competitions`, `isLoading`, `refetch()`. **Falls back to the hardcoded list in `src/types/competition.ts`** if the API is unreachable. The API field `is_full` is mapped to `isFull` in the client `Competition` type; everything else is passthrough. Anywhere you need the competition list (sidebar, registration page, public Competitions section, admin), call `useCompetitions()` — do **not** import the fallback array directly except for type-level defaults.

### API layer (`src/lib/api.ts`)

Single file, two helpers: `apiFetch` (no auth) and `apiFetchWithAuth(endpoint, token, opts)`. `API_BASE_URL` is hardcoded at the top — currently points to production (`https://api.aisyahfestival.com`); a commented-out LAN URL is kept for local backend dev. Both helpers always set `Accept: application/json`. For `multipart/form-data` (file uploads on registration), pass a `FormData` body and **do not** set `Content-Type` yourself — let the browser add the boundary.

### Registration flow (`/daftar/:slug`)

`RegistrationPage` looks the slug up in `useCompetitions()` and short-circuits on three flags before rendering:

1. competition not found → 404-style screen
2. `competition.closed === true` → "pendaftaran ditutup"
3. `competition.isFull === true` → "pendaftaran penuh"

Otherwise it renders `IndividualForm` or `GroupForm` (under `src/components/forms/`) based on `competition.type`. Group competitions submit three members (`nama_1..3`, `instansi_1..3`, etc.) per the type contract in `src/types/competition.ts`. Required uploads are always: `bukti_bayar`, `story_1` (Instagram), `story_2` (WhatsApp), `twibbon`. On success, navigate to `/success`.

`competition.hidden` does **not** block registration — it only hides the competition from the public Competitions section and the admin sidebar. The hidden competition still shows up in the settings page under "Lomba Tersembunyi" so admins can un-hide it.

### Admin dashboard

- `AdminLayout` (`src/components/admin/AdminLayout.tsx`) — fixed sidebar with logo, dashboard link, collapsible competitions list (split by `type`, hidden ones filtered out), settings link, and footer with logged-in user + logout. Wrap every admin page in this.
- `DashboardPage` — landing card grid.
- `CompetitionPage` (`/admin/lomba/:slug`) — calls `GET /api/lomba-individu?jenis=<slug>` or `GET /api/lomba-kelompok?jenis=<slug>` depending on `competition.type`, renders via `DataTable` (TanStack Table v8), supports row delete and Excel/CSV export. Note this page currently imports the **fallback** `competitions` array from `@/types/competition` rather than `useCompetitions()` to derive the type — keep that in mind when adding new competitions: add them to the fallback list **and** the API, otherwise this page may not classify them correctly.
- `CompetitionSettingsPage` (`/admin/settings`) — toggle table for `closed`, `isFull` (sent as `is_full`), and `hidden`. Each toggle does a `PUT /api/competitions/{id}` with the single field, then `refetch()`s the competition list.

### Excel/CSV export (`src/lib/export.ts`)

Four functions: `exportIndividuToExcel`, `exportKelompokToExcel`, plus the `*ToCSV` siblings. Built on `xlsx` + `file-saver`. Filenames are auto-suffixed with today's ISO date.

## Styling system

**Tailwind v4** is used via `@tailwindcss/vite` (not PostCSS). There are **two** sources of theme tokens — both work, but they are not redundant:

- `tailwind.config.js` — legacy v3-style config still consulted; defines `festival-gold` etc. and the accordion keyframes.
- `src/index.css` — the v4 `@theme` block defines the **same** color tokens **plus** new font tokens (`--font-family-sansita`, `--font-family-lora`, `--font-family-fraunces`) and imports the Google Fonts (Sansita, Lora, Fraunces, Inter, Playfair Display).

The two newer fonts (Sansita / Lora / Fraunces) are applied via inline style — e.g. `style={{ fontFamily: 'var(--font-family-sansita)' }}` — not via Tailwind utility classes. Match this pattern when editing existing sections so the look stays consistent. Inter is the default body font.

Festival colors: `festival-gold #D4AF37`, `festival-cream #F5E6D3`, `festival-dark #1a1a1a`, `festival-black #000000`, `festival-light-gold #F4E5C3`.

## shadcn/ui

`components.json` style `new-york`, base color `slate`, CSS variables enabled, no class prefix. New shadcn components go in `src/components/ui/`. Path aliases mirror `@/components`, `@/lib/utils`, `@/components/ui`.

## Path aliases

`@/*` → `src/*`, configured in both `tsconfig.json` and `vite.config.js`. Always import via the alias rather than relative paths.

## Animation conventions (Framer Motion)

- Parallax scroll: `useScroll` + `useTransform` (see `HeroSection.tsx`)
- Reveal-on-mount: `initial`, `animate`, `transition` with `opacity` and `y` transforms
- Match neighbor easings/durations when adding to existing sections so scroll feel stays consistent

## File naming

- Page sections: `[Name]Section.tsx` in `src/components/sections/`
- Pages: `*Page.tsx` in `src/pages/` (admin pages in `src/pages/admin/`)
- shadcn/ui primitives: lowercase in `src/components/ui/`
- Entry file: `main.jsx` (the only `.jsx` — everything else is `.tsx` or `.ts`)
- ESLint ignores unused vars whose name starts with uppercase or `_`

## Adding a new competition

There are two sources of truth that must agree:

1. The backend's `/api/competitions` response (managed via `/admin/settings` once the row exists in the DB).
2. The fallback list in `src/types/competition.ts` — used both as the offline fallback in `CompetitionContext` **and** directly imported by `CompetitionPage` to determine `type`. Ship with sensible `slug`, `type`, `rulebook`, and the `closed`/`hidden` flags matching the API state.

Forms only know two `type` shapes (`individual` | `group`). Group competitions are hardcoded to 3 members in the form layout — adding a different group size requires changing both `GroupFormData` and `GroupForm.tsx`.

## Asset paths

Static assets live in `public/assets/` and are referenced as `/assets/<file>` (leading slash = public dir). The favicon is `public/icon.png`, wired in `index.html`.

## Configuration footnotes

- TypeScript: strict mode, bundler resolution
- Vite: SWC for Fast Refresh (React Compiler is **not** compatible with SWC, so don't try to enable it)
- Tailwind v4 via the Vite plugin — **do not** add a PostCSS config
