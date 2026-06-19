<!-- BEGIN:nextjs-agent-rules -->
AGENTS.md — AI Coding Agent Configuration

1. Project Identity
PROJECT_NAME     = "employ-track-job-application-tracker"
APP_TYPE         = "saas-dashboard"   # Options: saas-dashboard | developer-tool | portfolio | ecommerce | marketing | admin-panel
THEME_MODE        = "system"  # Options: light | dark | system (system = respects OS preference, toggle available)
PRIMARY_COLOR    = ""   # e.g. "#06b6d4" — leave blank to let the Design Profile choose
DESCRIPTION      = "This app is designed to help job seekers organize, monitor and optimize their search efforts and resumes that will give applicants the highest chances of getting hired."   # One sentence: what this app does and who uses it
AUDIENCE         = "Job Seekers & Applicants"   # e.g. "B2B SaaS founders", "developers", "online shoppers"
REPO             = ""   # e.g. github.com/AurelGolemi/project-name
DEPLOYED_AT      = ""   # e.g. vercel.app preview URL

2. Stack & Version Policy

2.1 Core Stack
Framework        Next.js (App Router — NEVER Pages Router)
Language         TypeScript (strict mode, no `any`)
Styling          Tailwind CSS v4+ (utility-first, no arbitrary values unless unavoidable)
UI Components    shadcn/ui (copy components, do not install as a black-box library)
Theme Toggle     next-themes (wraps the app, reads system preference, persists choice)
Database         PostgreSQL + Drizzle ORM (preferred) or Prisma
Auth             Clerk or NextAuth v5 (App Router compatible)
Email            Resend + React Email
File Upload      Uploadthing
State (client)   Zustand (complex) or React Context (simple)
Forms            React Hook Form + Zod
Fetch            Native fetch + Server Actions (avoid third-party HTTP clients)
Animation        Framer Motion (use sparingly; prefer CSS transitions for micro-interactions)
Icons            Lucide React

2.2 Version Resolution — MANDATORY RULE
Before installing or referencing any package, the agent MUST resolve the latest stable version.
# Run this before every `npm install` or package.json update:
npm show <package-name> version
# or for full info:
npm show <package-name> dist-tags

Then pin the exact version in package.json — no ^ or ~ range operators unless the
project already uses them intentionally.

// ✅ Correct — pinned exact version resolved at install time
"next": "16.2.9",
"next-themes": "0.4.6",

// ❌ Wrong — loose range, unpredictable updates
"next": "^14.0.0"

2.3 Next.js Patterns - Always Latest
Use App Router (app/ directory). Never create files in pages/.
Prefer React Server Components (RSC) by default. Add "use client" only when:

Using hooks (useState, useEffect, useRef, etc.)
Handling browser events
Using browser APIs

Use Server Actions ("use server") for all form submissions and data mutations.
Use next/image for every <img> tag — no exceptions.
Use next/font for all fonts — no Google Fonts <link> tags in <head>.
Use Route Handlers (app/api/.../route.ts) for REST-style APIs.
Metadata: use export const metadata or generateMetadata() — never <Head>.

2.4 TypeScript Rules
// tsconfig.json must have:
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}

// Never do this:
const data = response as any
function doThing(x: any) {}

// Always do this:
type ApiResponse<T> = { data: T; error: string | null }
function doThing(x: string): void {}

3. Project Architecture
/
├── app/
│   ├── (auth)/               # Auth route group — login, signup, reset
│   ├── (dashboard)/          # Protected route group — requires auth
│   ├── (marketing)/          # Public-facing pages
│   ├── api/                  # Route Handlers only
│   └── layout.tsx            # Root layout with providers (ThemeProvider lives here)
│
├── components/
│   ├── ui/                   # shadcn/ui primitives (DO NOT edit these)
│   ├── shared/               # Reusable app-level components (nav, footer, modals)
│   ├── theme-toggle.tsx      # Light/dark toggle button — always in shared/
│   └── [feature]/            # Feature-scoped components (e.g. /dashboard/stats-card.tsx)
│
├── lib/
│   ├── db/                   # Database client + schema (Drizzle or Prisma)
│   ├── actions/              # Server Actions — one file per domain
│   ├── validations/          # Zod schemas — single source of truth
│   ├── utils.ts              # Pure utility functions (cn(), formatDate(), etc.)
│   └── constants.ts          # App-wide constants
│
├── hooks/                    # Custom React hooks (client-side only)
├── types/                    # Global TypeScript types and interfaces
├── public/                   # Static assets
└── emails/                   # React Email templates

File Naming Conventions
Components:     PascalCase.tsx      → StatsCard.tsx
Hooks:          camelCase.ts        → useMediaQuery.ts
Utilities:      camelCase.ts        → formatDate.ts
Server Actions: camelCase.ts        → createUser.ts
Route files:    lowercase           → page.tsx, layout.tsx, route.ts
Types:          PascalCase.ts       → UserProfile.ts

4. Theme System (Light/Dark Mode)
4.1 Core Principle — Tokens, Not Raw Hex Values

The agent must NEVER hardcode a hex color directly in a component.
Every color reference in JSX/TSX must use a CSS custom property token or a Tailwind semantic class.
The token values change between light and dark — the component code never does.

// ❌ Wrong — hardcoded color, breaks in the other mode
<div className="bg-[#0A0A0F] text-[#F1F5F9]">

// ✅ Correct — token-based, works in both modes automatically
<div className="bg-background text-foreground">

4.2 Tailwind Configuration
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",   // Controlled by next-themes adding .dark to <html>
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — map to CSS vars defined in globals.css
        background:     "hsl(var(--background))",
        foreground:     "hsl(var(--foreground))",
        surface:        "hsl(var(--surface))",
        "surface-raised": "hsl(var(--surface-raised))",
        border:         "hsl(var(--border))",
        primary: {
          DEFAULT:      "hsl(var(--primary))",
          foreground:   "hsl(var(--primary-foreground))",
          hover:        "hsl(var(--primary-hover))",
        },
        accent: {
          DEFAULT:      "hsl(var(--accent))",
          foreground:   "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT:      "hsl(var(--muted))",
          foreground:   "hsl(var(--muted-foreground))",
        },
        success:        "hsl(var(--success))",
        warning:        "hsl(var(--warning))",
        danger:         "hsl(var(--danger))",
      },
      fontFamily: {
        // Overridden per profile in globals.css @layer base
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
}

export default config

4.3 CSS Custom Properties Structure
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* ─── LIGHT MODE (root default) ─────────────────────────────── */
  :root {
    --background:       <H S L>;   /* filled in by active profile */
    --foreground:       <H S L>;
    --surface:          <H S L>;
    --surface-raised:   <H S L>;
    --border:           <H S L>;
    --primary:          <H S L>;
    --primary-foreground: <H S L>;
    --primary-hover:    <H S L>;
    --accent:           <H S L>;
    --accent-foreground: <H S L>;
    --muted:            <H S L>;
    --muted-foreground: <H S L>;
    --success:          <H S L>;
    --warning:          <H S L>;
    --danger:           <H S L>;
  }

  /* ─── DARK MODE (.dark class on <html>) ─────────────────────── */
  .dark {
    --background:       <H S L>;   /* filled in by active profile */
    --foreground:       <H S L>;
    --surface:          <H S L>;
    --surface-raised:   <H S L>;
    --border:           <H S L>;
    --primary:          <H S L>;
    --primary-foreground: <H S L>;
    --primary-hover:    <H S L>;
    --accent:           <H S L>;
    --accent-foreground: <H S L>;
    --muted:            <H S L>;
    --muted-foreground: <H S L>;
    --success:          <H S L>;
    --warning:          <H S L>;
    --danger:           <H S L>;
  }

  body {
    @apply bg-background text-foreground;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }
}

4.4 ThemeProvider Setup
// components/shared/theme-provider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// app/layout.tsx
import { ThemeProvider } from "@/components/shared/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"   // reads THEME_MODE from Section 1
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

4.5 Theme Toggle Component
// components/shared/theme-toggle.tsx
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

4.6 THEME_MODE → defaultTheme Mapping
THEME_MODE = "system"  →  defaultTheme="system"  enableSystem   (default — recommended)
THEME_MODE = "dark"    →  defaultTheme="dark"     enableSystem={false}
THEME_MODE = "light"   →  defaultTheme="light"    enableSystem={false}

5. Design Profiles
PROFILE A — saas-dashboard

Audience: Professionals, operators, power users managing data daily.
Visual mandate: Information density without visual noise. Every pixel earns its place.

Token Table

TokenLIGHT (:root)DARK (.dark)--background220 20% 97%240 10% 4%--foreground222 47% 11%210 40% 95%--surface0 0% 100%240 9% 7%--surface-raised220 14% 94%240 8% 11%--border220 13% 88%240 7% 18%--primary239 84% 67%239 84% 67%--primary-foreground0 0% 100%0 0% 100%--primary-hover243 75% 59%243 75% 59%--accent189 94% 43%189 94% 43%--accent-foreground0 0% 100%0 0% 100%--muted220 14% 90%240 7% 14%--muted-foreground215 16% 47%215 20% 55%--success158 64% 37%158 64% 45%--warning38 92% 50%38 92% 50%--danger0 72% 51%0 72% 51%

Typography

Display / Logo    font-sans, font-bold, tracking-tight
Navigation        font-mono, text-xs, uppercase, tracking-widest, text-muted-foreground
Headings          font-sans, font-semibold, text-foreground
Body              font-sans, text-sm, leading-relaxed, text-foreground
Data / Numbers    font-mono, font-medium, tabular-nums, text-foreground
Code              font-mono, text-xs, bg-muted, text-foreground
Labels            font-sans, text-xs, uppercase, tracking-wide, text-muted-foreground

Fonts (next/font)

tsimport { Inter, JetBrains_Mono } from "next/font/google"
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

Layout

Sidebar           w-60, fixed left, full height, bg-surface, border-r border-border
                  Collapsible to icon-only (w-16) — width stored in Zustand
Top Bar           h-14, border-b border-border, bg-surface/80 backdrop-blur-sm
Content Area      p-6 md:p-8, max-w-screen-xl, mx-auto
Cards             rounded-xl, border border-border, bg-surface, p-5
Tables            full-width, compact rows (h-10), sticky header, bg-surface
ThemeToggle       top-right of Top Bar, always visible

Signature Element

A live metric pulse — key KPI numbers render with a subtle @keyframes counter-up on
first mount and a real-time indicator dot (●) in text-accent that pulses when data is fresh.
The dot uses animate-ping in accent color only; no other animations on the page.


PROFILE B — developer-tool

Audience: Developers, engineers, technical builders.
Visual mandate: Terminal-native aesthetic. Monospace-first. Every element signals precision.

Token Table

TokenLIGHT (:root)DARK (.dark)--background210 17% 95%215 14% 7%--foreground215 25% 15%213 31% 91%--surface0 0% 100%215 13% 10%--surface-raised210 17% 91%215 12% 14%--border213 14% 80%215 11% 21%--primary212 92% 45%212 92% 67%--primary-foreground0 0% 100%215 14% 7%--primary-hover212 92% 37%212 92% 57%--accent137 72% 36%137 72% 45%--accent-foreground0 0% 100%215 14% 7%--muted210 17% 88%215 12% 16%--muted-foreground215 16% 47%215 20% 55%--success137 72% 36%137 72% 45%--warning38 82% 43%38 82% 52%--danger4 74% 49%4 74% 58%

Typography

ALL headings      font-mono, font-bold, text-foreground
ALL labels        font-mono, text-xs, uppercase, text-muted-foreground
Body text         font-mono, text-sm, leading-6, text-foreground
Code blocks       font-mono, text-xs, bg-muted, rounded-md, px-3 py-2
UI numbers        font-mono, tabular-nums, text-foreground
Exception         font-sans only for marketing copy, legal text, onboarding prose

Fonts (next/font)

tsimport { JetBrains_Mono } from "next/font/google"
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })
// Use mono as both --font-sans and --font-mono for this profile

Layout

Shell Chrome      Full-width, no padding waste
Sidebar           w-56, tree-nav style (filesystem metaphor), bg-surface, border-r
Content           p-6, max-w-4xl for reading comfort
Panels            Split-pane: left nav | main | right detail (optional)
Inputs            h-8, rounded-md, font-mono, px-3, border border-border
Buttons           rounded-md max — no rounded-full. Text lowercase or camelCase.
ThemeToggle       Top-right corner, renders as `[light]` / `[dark]` text button in font-mono

Signature Element

A terminal prompt prefix ($ in light, > in dark) rendered in text-accent
on key interactive elements — search bar, command input, any primary action field.
First page load plays a single 300ms typewriter effect on the main headline only.


PROFILE C — portfolio

Audience: Hiring managers, potential clients, collaborators.
Visual mandate: Editorial confidence. Bold type. One unforgettable visual move.

Token Table

TokenLIGHT (:root)DARK (.dark)--background40 30% 97%20 10% 6%--foreground20 14% 8%40 20% 95%--surface0 0% 100%20 8% 9%--surface-raised40 20% 93%20 7% 13%--border40 15% 86%20 8% 20%--primary14 100% 50%14 100% 55%--primary-foreground0 0% 100%0 0% 100%--primary-hover14 100% 42%14 100% 65%--accent14 100% 50%14 100% 55%--accent-foreground0 0% 100%0 0% 100%--muted40 15% 90%20 7% 14%--muted-foreground20 8% 45%40 10% 55%--success158 64% 37%158 64% 45%--warning38 92% 50%38 92% 55%--danger0 72% 51%0 72% 55%

Typography

Display           'Playfair Display', font-black, text-7xl md:text-9xl, leading-none
Eyebrows          font-sans, text-xs, uppercase, tracking-widest, text-muted-foreground
Body              'DM Sans' or 'Inter', text-base, leading-7, text-muted-foreground
Nav               font-mono, text-sm, tracking-tight, text-foreground
CTA               font-sans, font-bold, uppercase, tracking-wide, text-sm
Numbers / Stats   font-mono, tabular-nums, text-4xl, font-black, text-foreground

Fonts (next/font)

tsimport { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google"
const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" })
const sans    = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })
const mono    = DM_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] })

Layout

Hero              Full viewport height, display headline 40–60% of viewport width
Grid              12-column CSS grid desktop; single column mobile
Project Cards     Asymmetric — large image left, meta right; alternating on scroll
About             Two-column: photo left (grayscale on light, normal on dark) | bio right
Contact           One email link in massive type + social row — no form clutter
Footer            Single line: name + year + back-to-top link
ThemeToggle       Nav top-right, renders as a filled circle (●) toggling between ○ and ●

Signature Element

The display name is the hero — first letter gets text-primary fill. A full-bleed
1px border-t border-primary separates every major section. In dark mode the primary
electric-orange pops harder; no change to the element, the theme does the work.


PROFILE D — ecommerce

Audience: Online shoppers who expect clarity, trust, and fast paths to purchase.
Visual mandate: Product is the hero. White space is generous. Every element serves conversion.

Token Table

TokenLIGHT (:root)DARK (.dark)--background0 0% 100%220 13% 9%--foreground220 26% 10%220 13% 93%--surface210 20% 98%220 12% 12%--surface-raised210 17% 95%220 11% 16%--border220 13% 90%220 10% 22%--primary220 26% 14%220 26% 88%--primary-foreground0 0% 100%220 26% 10%--primary-hover220 26% 22%220 26% 96%--accent0 72% 51%0 72% 55%--accent-foreground0 0% 100%0 0% 100%--muted210 17% 93%220 11% 16%--muted-foreground220 9% 46%220 9% 55%--success158 64% 37%158 64% 45%--warning38 92% 50%38 92% 55%--danger0 72% 51%0 72% 55%

Typography

Brand / Logo      font-sans, font-black, tracking-tighter, text-foreground
Product Names     font-sans, font-semibold, text-lg, leading-snug, text-foreground
Price             font-mono, font-bold, text-xl, tabular-nums, text-foreground
Strike Price      font-mono, text-muted-foreground, line-through
Category Labels   font-sans, text-xs, uppercase, tracking-widest, text-muted-foreground
Body / Reviews    font-sans, text-sm, leading-relaxed, text-muted-foreground
CTA Buttons       font-sans, font-semibold, uppercase, tracking-wide, text-sm

Fonts (next/font)

tsimport { Inter, DM_Mono } from "next/font/google"
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const mono = DM_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] })

Layout

Header            Sticky h-16, bg-surface/80 backdrop-blur, border-b
Product Grid      grid-cols-2 md:grid-cols-3 lg:grid-cols-4, gap-4 md:gap-6
Product Card      Rectangular image (no border-radius) | name | price | ghost add-to-cart
Product Page      Two-column lg: image gallery left | sticky details right
Cart              Slide-over drawer — not a separate page
Checkout          Single-page, progress indicator top, no distractions
ThemeToggle       Header right group, next to cart icon

Signature Element

Ghost add-to-cart — on hover, a bg-foreground/90 text-background action bar slides up
(translate-y-0) from translate-y-full at the bottom of the product image. No border-radius
on product images; rounded-xl on UI cards only. Works identically in both modes.


PROFILE E — marketing

Audience: First-time visitors who need to understand the value and take action fast.
Visual mandate: Motion-forward, gradient-rich, conversion-optimized.

Token Table

TokenLIGHT (:root)DARK (.dark)--background220 20% 97%224 71% 4%--foreground224 71% 8%213 31% 97%--surface0 0% 100%222 47% 8%--surface-raised220 14% 93%222 40% 12%--border220 13% 85%217 33% 18%--primary239 84% 67%239 84% 67%--primary-foreground0 0% 100%0 0% 100%--primary-hover243 75% 59%243 75% 59%--accent271 91% 65%271 91% 65%--accent-foreground0 0% 100%0 0% 100%--muted220 14% 90%222 40% 12%--muted-foreground220 9% 46%215 20% 60%--success158 64% 37%158 64% 52%--warning38 92% 50%38 92% 55%--danger0 72% 51%0 72% 55%

Typography

Hero Headline     font-sans, font-black, text-5xl md:text-7xl lg:text-8xl, leading-none
                  In dark: bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400
                           bg-clip-text text-transparent
                  In light: text-foreground (gradient is too low-contrast on white)
Sub-headline      font-sans, font-medium, text-lg md:text-xl, text-muted-foreground
Section Heads     font-sans, font-bold, text-3xl md:text-4xl, text-foreground
Body              font-sans, text-base, text-muted-foreground, leading-7
CTA Button        font-sans, font-semibold, text-sm, uppercase, tracking-widest
Social Proof      font-mono, font-bold, text-3xl, text-primary, tabular-nums

Fonts (next/font)

tsimport { Inter } from "next/font/google"
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })

Layout

Hero              Full viewport, centered content max-w-4xl, gradient glow behind headline
Navbar            Transparent → bg-surface/80 backdrop-blur on scroll, h-16, fixed top
Feature Grid      Alternating: text left | screenshot right
Pricing           3-column, center card: ring-2 ring-primary + "Popular" badge
Testimonials      Horizontal scroll strip OR masonry grid
Footer            bg-surface, 4-column links, gradient separator top
ThemeToggle       Navbar right — in light mode shows Moon icon; in dark shows Sun icon

Signature Element

Radial gradient spotlight behind the hero — a single div with a conic/radial gradient
in from-violet-600 via-blue-600 to-cyan-500, opacity-20 in light / opacity-30 in dark,
blur-3xl, absolutely positioned behind the headline. Slow rotate-glow animation (60s).
In light mode the gradient is tinted toward the primary color at reduced opacity so it reads
as a subtle wash rather than a dark-mode glow.

css@keyframes rotate-glow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.hero-glow { animation: rotate-glow 60s linear infinite; }


PROFILE F — admin-panel

Audience: Internal operators, customer support, back-office staff.
Visual mandate: Maximum information density, zero visual decoration. Function is beauty.

Token Table

TokenLIGHT (:root)DARK (.dark)--background210 20% 95%222 47% 7%--foreground215 25% 10%210 40% 95%--surface0 0% 100%222 40% 10%--surface-raised210 17% 97%222 35% 13%--border213 27% 82%217 33% 20%--primary221 83% 53%221 83% 65%--primary-foreground0 0% 100%0 0% 100%--primary-hover224 76% 45%221 83% 73%--accent221 83% 53%221 83% 65%--accent-foreground0 0% 100%0 0% 100%--muted210 17% 90%222 35% 14%--muted-foreground215 16% 47%215 20% 55%--success142 71% 37%142 71% 45%--warning38 92% 43%38 92% 52%--danger0 72% 51%0 72% 55%

Typography

ALL text          font-sans, text-sm (14px base — dense but legible)
Page Titles       font-sans, font-semibold, text-lg, text-foreground
Section Labels    font-sans, font-medium, text-xs, uppercase, tracking-wide, text-muted-foreground
Table Headers     font-sans, font-medium, text-xs, uppercase, tracking-wide, text-muted-foreground
Table Data        font-sans, text-sm, tabular-nums for all numbers
Badges/Chips      font-sans, font-medium, text-xs, rounded-full

Fonts (next/font)

tsimport { Inter } from "next/font/google"
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })

Layout

Shell             Sidebar (w-56, fixed) + Top bar (h-12) + Main (flex-1, overflow-auto)
Sidebar           bg-surface, border-r, compact nav items (h-8), text-sm
Top Bar           bg-surface, border-b, page title left | search + theme toggle + user right
Content           p-6, max-w-screen-2xl (admin panels need wide tables)
Tables            Compact (h-9 rows), sticky header, checkbox col, actions col last
Filters           Horizontal bar above table — dropdowns, date range, search, export button
Modals            max-w-lg; full-screen only for complex multi-step forms
Toasts            Bottom-right, auto-dismiss 3s
ThemeToggle       Top bar right, compact icon-only button

Signature Element

A persistent filter-chip row above every data table. Active filters render as dismissible
chips (bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium).
State persists in sessionStorage so operators return to the same filtered view.
Works identically in both modes — bg-primary/10 self-adapts via the token.

6. Component Patterns

6.1 Server Component (default)

tsx// app/(dashboard)/stats/page.tsx
import { getStats } from "@/lib/actions/stats"
import { StatsGrid } from "@/components/dashboard/stats-grid"

export default async function StatsPage() {
  const stats = await getStats()
  return <StatsGrid data={stats} />
}

6.2 Client Component (only when needed)

tsx"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Props {
  initialCount: number
}

export function Counter({ initialCount }: Props) {
  const [count, setCount] = useState(initialCount)
  return (
    <Button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </Button>
  )
}

6.3 Server Action

tsx// lib/actions/create-post.ts
"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

const CreatePostSchema = z.object({
  title: z.string().min(3).max(100),
  body: z.string().min(10),
})

type ActionResult = { success: true; id: string } | { success: false; error: string }

export async function createPost(formData: FormData): Promise<ActionResult> {
  const parsed = CreatePostSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  try {
    const post = await db.post.create({ data: parsed.data })
    revalidatePath("/posts")
    return { success: true, id: post.id }
  } catch {
    return { success: false, error: "Failed to create post." }
  }
}

6.4 Zod Validation (single source of truth)

tsx// lib/validations/user.ts — define once, import everywhere
import { z } from "zod"

export const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user", "viewer"]),
})

export type User = z.infer<typeof UserSchema>


7. Database Conventions

7.1 Drizzle Schema Example

ts// lib/db/schema.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

7.2 Rules


All tables use UUID primary keys (not auto-increment integers).
All tables have created_at and updated_at timestamps.
Column names in PostgreSQL: snake_case. TypeScript properties: camelCase (Drizzle maps automatically).
Never write raw SQL strings. Use the ORM query builder.
Database credentials go in .env.local under DATABASE_URL. Never hardcode.



8. API & Backend Patterns

8.1 Route Handler Structure

ts// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server"
import { UserSchema } from "@/lib/validations/user"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = UserSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    // ...business logic...
    return NextResponse.json({ data: result }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

8.2 Error Response Shape

ts// Always return one of these two shapes:
type SuccessResponse<T> = { data: T; error: null }
type ErrorResponse    = { data: null; error: string }

8.3 Environment Variables

bash# .env.local — never commit this file
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # NEXT_PUBLIC_ prefix = exposed to client
RESEND_API_KEY="re_..."
CLERK_SECRET_KEY="sk_..."


9. Git & Deployment Workflow

main        → Production (Vercel Production deployment)
preview/*   → Preview deployments (Vercel Preview URL)
feature/*   → Feature branches — always branch from main

Commit Message Format

feat:     new feature
fix:      bug fix
style:    UI/CSS changes only — no logic change
refactor: restructure without changing behavior
chore:    deps, config, tooling
docs:     documentation only


10. Performance Rules


next/image — always specify width, height, or use fill + sizes.
next/font — load fonts at layout level, not component level.
Heavy components: use React.lazy + Suspense with a skeleton fallback.
Server Components fetch data — do not use useEffect to fetch on the client.
Avoid useEffect for derived state — compute it inline or with useMemo.
Static pages: add export const dynamic = "force-static" explicitly.
API route caching: set export const revalidate = 60 (seconds) where appropriate.



11. Accessibility Baseline (non-negotiable)


Every interactive element must be keyboard focusable with a visible focus-visible:ring.
All images must have descriptive alt text. Decorative images: alt="".
Color contrast: text on background must meet WCAG AA (4.5:1 for normal text).
All form inputs must have associated <label> elements.
Modal/dialog: trap focus inside when open, restore focus to trigger on close.
Respect prefers-reduced-motion — wrap animations in:


css  @media (prefers-reduced-motion: no-preference) {
    .animated-element { animation: ...; }
  }


12. Forbidden Patterns

The agent must NEVER do any of the following:

❌ Use the Pages Router (`pages/` directory) in any new file
❌ Write `as any` or untyped variables
❌ Use `useEffect` to fetch data — use Server Components or Server Actions
❌ Import from `next/router` — use `next/navigation` (App Router)
❌ Inline styles via `style={}` — use Tailwind utilities only
❌ Use `<img>` tags — always `next/image`
❌ Hard-code secrets, API keys, or database URLs
❌ Write `console.log` in production code — use structured logging
❌ Nest more than 3 levels of JSX without extracting a component
❌ Install a package without first resolving the latest stable version
❌ Use the `any` type — use `unknown` if the type is truly unknown
❌ Create components larger than ~150 lines — extract sub-components
❌ Use default exports for components — use named exports
❌ Mix design profiles — apply one profile per project, consistently
❌ Use pixel values in Tailwind — use the spacing scale (4, 8, 12...) not arbitrary [17px]


13. Self-Check Before Every Response

Before the agent writes or modifies any code, it must internally verify:


 Did I read the APP_TYPE from Section 1 and apply the correct Design Profile?
 Did I resolve the latest stable version of any package I'm about to use?
 Am I writing in a Server Component unless there's a clear client-side reason?
 Are my types explicit and non-any?
 Does my new file follow the /app / /components / /lib structure?
 Would a senior developer consider this production-ready?

<!-- END:nextjs-agent-rules -->
