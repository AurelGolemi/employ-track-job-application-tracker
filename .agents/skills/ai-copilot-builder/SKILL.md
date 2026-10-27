---
name: ai-copilot-builder
description: AI Copilot that will help & guide users into getting the right answer that will benefit them in every way possible, in order for them to get hired.
---

EmployTrack Copilot — Build Guide

Scope: search + rules engine, no LLM, no paid API, no local model.

Before you start: this guide references your applications table, action file locations, and route names generically (e.g. r.company, app/actions/copilot.ts, /applications/[id]). Swap these for your actual Drizzle schema and file structure — I don't have your live repo open in this session, so treat the field names as placeholders to map onto your real columns.

0. What this "copilot" actually is

Two independent, deterministic subsystems, surfaced through one UI:

Search — fuzzy/full-text lookup across your applications and notes (FlexSearch). Statistics, not ML.
Rules engine — a set of hand-written conditions over your data ("no update in 14 days," "interview in 48 hours with no prep notes") that surface as proactive suggestions.

Both feed into a single command-palette-style panel. Nothing here calls out to a model — it's the same category of "smart" as your inbox's spam filter or your IDE's linter.

1. Architecture
lib/
  copilot/
    types.ts       ← shared types
    search.ts       ← FlexSearch index + query
    rules.ts        ← rule definitions + runner
app/
  actions/
    copilot.ts      ← server actions, the only place that touches the DB
components/
  copilot-panel.tsx ← the Cmd+K UI

Search and rules never talk to each other. They both read from the same applications rows, run independently, and get merged only in the UI. This keeps each half testable in isolation — you can unit-test rules.ts with plain arrays of objects, no DB or React involved.

2. Install dependencies
bash
npm install flexsearch cmdk date-fns
flexsearch — the search index. Ships its own TypeScript types as of v0.7+, so you likely don't need a separate @types package.
cmdk — an unstyled command-palette primitive (the same category of tool behind most Cmd+K interfaces in dev tools). You style it entirely yourself, which matters for matching your existing token system.
date-fns — skip if it's already a dependency.
3. Shared types
typescript
// lib/copilot/types.ts

export type CopilotSuggestion = {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  applicationId?: string;
};

export type SearchableApplication = {
  id: string;
  company: string;
  role: string;
  status: string;
  notes: string | null;
  location: string | null;
};
4. Search layer
typescript
// lib/copilot/search.ts
import { Document } from "flexsearch";
import type { SearchableApplication } from "./types";

// API shape below matches flexsearch v0.7+. If your installed version's
// return shape differs, check node_modules/flexsearch/dist/type/document.d.ts.

export function buildApplicationIndex(applications: SearchableApplication[]) {
  const index = new Document<SearchableApplication, true>({
    document: {
      id: "id",
      index: [
        { field: "company", tokenize: "forward" },
        { field: "role", tokenize: "forward" },
        { field: "notes", tokenize: "forward" },
        { field: "location", tokenize: "forward" },
      ],
      store: true,
    },
    tokenize: "forward",
  });

  for (const app of applications) index.add(app);
  return index;
}

export function searchApplications(
  index: ReturnType<typeof buildApplicationIndex>,
  query: string,
  limit = 8
) {
  const results = index.search(query, { limit, enrich: true });

  const seen = new Set<string>();
  const merged: SearchableApplication[] = [];

  for (const group of results) {
    for (const hit of group.result) {
      const doc = hit.doc as SearchableApplication;
      if (!seen.has(doc.id)) {
        seen.add(doc.id);
        merged.push(doc);
      }
    }
  }

  return merged.slice(0, limit);
}

Why rebuild the index per request instead of persisting it: a personal job tracker has tens to low hundreds of rows. Building an in-memory index from a DB read is sub-millisecond at that scale and sidesteps index-invalidation bugs entirely. If this ever needs to scale past that (it won't, for this app), the fix is a module-level cache invalidated on write — not a different architecture.

5. Rules engine
typescript
// lib/copilot/rules.ts
import { differenceInDays, differenceInHours } from "date-fns";
import type { CopilotSuggestion } from "./types";

// Adjust these fields to match your actual applications table columns.
export type ApplicationForRules = {
  id: string;
  company: string;
  role: string;
  status: "applied" | "interviewing" | "offer" | "rejected" | "withdrawn";
  appliedAt: Date;
  lastUpdatedAt: Date;
  interviewAt: Date | null;
  hasPrepNotes: boolean;
};

type Rule = {
  id: string;
  evaluate: (apps: ApplicationForRules[]) => CopilotSuggestion[];
};

const staleApplicationRule: Rule = {
  id: "stale-application",
  evaluate: (apps) =>
    apps
      .filter(
        (a) => a.status === "applied" && differenceInDays(new Date(), a.lastUpdatedAt) >= 14
      )
      .map((a) => ({
        id: `stale-${a.id}`,
        title: `Follow up with ${a.company}`,
        description: `No update in ${differenceInDays(new Date(), a.lastUpdatedAt)} days on the ${a.role} application.`,
        priority: "medium" as const,
        applicationId: a.id,
      })),
};

const upcomingInterviewNoPrepRule: Rule = {
  id: "upcoming-interview-no-prep",
  evaluate: (apps) =>
    apps
      .filter((a) => {
        if (!a.interviewAt || a.hasPrepNotes) return false;
        const hoursAway = differenceInHours(a.interviewAt, new Date());
        return hoursAway > 0 && hoursAway <= 48;
      })
      .map((a) => ({
        id: `prep-${a.id}`,
        title: `Prep for ${a.company}`,
        description: `Interview is within 48 hours and there are no prep notes yet.`,
        priority: "high" as const,
        applicationId: a.id,
      })),
};

const duplicateCompanyRule: Rule = {
  id: "duplicate-company",
  evaluate: (apps) => {
    const byCompany = new Map<string, ApplicationForRules[]>();
    for (const a of apps) {
      const key = a.company.toLowerCase().trim();
      byCompany.set(key, [...(byCompany.get(key) ?? []), a]);
    }

    const suggestions: CopilotSuggestion[] = [];
    for (const group of byCompany.values()) {
      if (group.length > 1) {
        suggestions.push({
          id: `dup-${group[0].company.toLowerCase()}`,
          title: `Multiple applications at ${group[0].company}`,
          description: `${group.length} active applications tracked for this company.`,
          priority: "low",
        });
      }
    }
    return suggestions;
  },
};

const rules: Rule[] = [staleApplicationRule, upcomingInterviewNoPrepRule, duplicateCompanyRule];

export function runRules(apps: ApplicationForRules[]): CopilotSuggestion[] {
  const priorityWeight = { high: 0, medium: 1, low: 2 } as const;
  return rules
    .flatMap((rule) => rule.evaluate(apps))
    .sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]);
}

Adding a new rule later is additive: write a Rule, push it into the array. Nothing else changes.

6. Server actions
typescript
// app/actions/copilot.ts
"use server";

import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { buildApplicationIndex, searchApplications } from "@/lib/copilot/search";
import { runRules, type ApplicationForRules } from "@/lib/copilot/rules";

export async function getCopilotSuggestions() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const rows = await db
    .select()
    .from(applications)
    .where(eq(applications.userId, session.user.id));

  const forRules: ApplicationForRules[] = rows.map((r) => ({
    id: r.id,
    company: r.company,
    role: r.role,
    status: r.status,
    appliedAt: r.appliedAt,
    lastUpdatedAt: r.updatedAt,
    interviewAt: r.interviewAt,
    hasPrepNotes: Boolean(r.prepNotes?.trim()),
  }));

  return runRules(forRules);
}

export async function searchCopilotApplications(query: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  if (!query.trim()) return [];

  const rows = await db
    .select()
    .from(applications)
    .where(eq(applications.userId, session.user.id));

  const index = buildApplicationIndex(
    rows.map((r) => ({
      id: r.id,
      company: r.company,
      role: r.role,
      status: r.status,
      notes: r.notes,
      location: r.location,
    }))
  );

  const hits = searchApplications(index, query);
  const hitIds = new Set(hits.map((h) => h.id));
  return rows.filter((r) => hitIds.has(r.id));
}

Two actions, not one — suggestions run once when the panel opens (they change slowly), search runs on every debounced keystroke (it needs to). Merging them into a single action would mean re-running the rules engine on every keystroke for no reason.

7. The panel UI

This is where the four issues you flagged actually get enforced, not just avoided by luck. I pulled your Vercel-inspired token set to ground this rather than guessing colors: ink #171717, body #4d4d4d, mute #888888, hairline #ebebeb, canvas #ffffff/canvas-soft #fafafa, radius scale (sm 6px for inputs, lg 12px for cards, full for small metadata pills), spacing scale in 4px steps.

One catch worth knowing before you style this: mute (#888888) on white is a ~3.55:1 contrast ratio — it clears the 3:1 bar for large text and UI borders, but fails the 4.5:1 bar for normal body text (WCAG AA). Use body (
#4d4d4d, ~7:1) for anything readable like suggestion descriptions, and reserve mute for placeholders, timestamps, and icons only. This is exactly the "text that doesn't blend in" failure mode you called out — it's a real, measurable number, not a vibe.

The component below assumes your project exposes semantic Tailwind classes (bg-background, text-foreground, text-muted-foreground, border-border, bg-muted) mapped to your existing HSL token table — the same convention your AGENTS.md theme system already uses. If your class names differ, swap them; the point is routing every color through a token, never a raw gray-400 dropped into a component.

tsx
// components/copilot-panel.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { getCopilotSuggestions, searchCopilotApplications } from "@/app/actions/copilot";
import type { CopilotSuggestion } from "@/lib/copilot/types";

type AppResult = { id: string; company: string; role: string; status: string };

export function CopilotPanel() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CopilotSuggestion[]>([]);
  const [results, setResults] = useState<AppResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) getCopilotSuggestions().then(setSuggestions);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      searchCopilotApplications(query).then((r) => {
        setResults(r);
        setLoading(false);
      });
    }, 200);
    return () => clearTimeout(timeout);
  }, [query, open]);

  const goTo = useCallback(
    (applicationId?: string) => {
      if (applicationId) router.push(`/applications/${applicationId}`);
      setOpen(false);
    },
    [router]
  );

  if (!open) return null;

  const isEmpty = !loading && suggestions.length === 0 && results.length === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <Command
        className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        shouldFilter={false}
      >
        <div className="flex h-12 items-center gap-2 border-b border-border px-4">
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Search applications, or see what needs attention…"
            className="h-full flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded-sm border border-border px-1.5 py-0.5 text-xs text-muted-foreground">
            esc
          </kbd>
        </div>

        <Command.List className="max-h-80 overflow-y-auto p-2">
          {loading && (
            <div className="px-3 py-6 text-center text-sm text-foreground/80">Searching…</div>
          )}

          {!loading && suggestions.length > 0 && (
            <Command.Group
              heading="Needs attention"
              className="px-1 pb-2 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {suggestions.map((s) => (
                <Command.Item
                  key={s.id}
                  onSelect={() => goTo(s.applicationId)}
                  className="flex cursor-pointer flex-col gap-0.5 rounded-sm px-3 py-2 text-sm data-[selected=true]:bg-muted"
                >
                  <span className="font-medium text-foreground">{s.title}</span>
                  <span className="text-foreground/80">{s.description}</span>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {!loading && results.length > 0 && (
            <Command.Group
              heading="Applications"
              className="px-1 pb-2 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {results.map((r) => (
                <Command.Item
                  key={r.id}
                  onSelect={() => goTo(r.id)}
                  className="flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm data-[selected=true]:bg-muted"
                >
                  <span className="text-foreground">
                    {r.company} — {r.role}
                  </span>
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs text-foreground/80">
                    {r.status}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {isEmpty && !query && (
            <div className="px-3 py-6 text-center text-sm text-foreground/80">
              You're caught up. Start typing to search your applications.
            </div>
          )}

          {isEmpty && query && (
            <div className="px-3 py-6 text-center text-sm text-foreground/80">
              No applications match "{query}".
            </div>
          )}
        </Command.List>
      </Command>
    </div>
  );
}

Notes on specific choices, since you asked for no design mistakes:

cursor-pointer on every Command.Item — not conditional, not remembered per-component. If it's clickable in this file, it has the class. As a second safety net, add this once to your global CSS so it's structurally impossible to forget on any future button:
css
  /* globals.css */
  button:not(:disabled),
  [role="button"] {
    cursor: pointer;
  }
No banner. The input placeholder is the context ("Search applications, or see what needs attention…"). Nothing announces the feature above itself — you open the panel because you asked for it via Cmd+K, so it doesn't need to re-explain what it is.
Radius discipline. Container uses rounded-lg (12px, your card scale), the input area implicitly matches via the container, list items use rounded-sm (6px, your control scale), and only the small status badge uses rounded-full — matching your own rule that the 100px marketing pill and 6px control radius shouldn't mix on one surface. This panel never uses the marketing pill scale at all, because it isn't a marketing surface.
Alignment. Every row is a flex with items-center/justify-between — no manually-nudged margins. If you add a new row type later, reuse this pattern rather than eyeballing spacing.
8. Hook it into the app shell

In your existing session-aware header, add a trigger next to the avatar dropdown:

tsx
<button
  onClick={() => setCopilotOpen(true)}
  className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground"
>
  Search
  <kbd className="rounded-sm border border-border px-1.5 py-0.5 text-xs">⌘K</kbd>
</button>

Mount <CopilotPanel /> once near the root layout (not inside every page) so Cmd+K works everywhere, not just on the dashboard.

9. Testing

Rules are pure functions over plain data — test them without touching the DB or React:

bash
npm install -D vitest
typescript
// lib/copilot/rules.test.ts
import { describe, it, expect } from "vitest";
import { runRules, type ApplicationForRules } from "./rules";

const baseApp: ApplicationForRules = {
  id: "1",
  company: "Acme",
  role: "Frontend Engineer",
  status: "applied",
  appliedAt: new Date(),
  lastUpdatedAt: new Date(),
  interviewAt: null,
  hasPrepNotes: false,
};

describe("staleApplicationRule", () => {
  it("flags applications with no update in 14+ days", () => {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    const result = runRules([{ ...baseApp, lastUpdatedAt: fifteenDaysAgo }]);
    expect(result.some((s) => s.id === "stale-1")).toBe(true);
  });

  it("does not flag recently updated applications", () => {
    const result = runRules([{ ...baseApp, lastUpdatedAt: new Date() }]);
    expect(result.some((s) => s.id.startsWith("stale-"))).toBe(false);
  });
});

Manual QA pass before you consider this done:

Zero applications (empty state copy, not a blank panel)
Every application stale (panel doesn't overflow or get unreadable)
Keyboard only — Tab, arrow keys, Enter, Esc, no mouse
Light and dark mode — re-check the mute vs body contrast call above in both
Narrow viewport — the fixed max-w-lg panel shouldn't clip on mobile widths
Cmd+K fires from every route, not just the dashboard
10. Where this leaves room to grow

If you ever want a free-text "ask it a question" box on top of this, the seam is clean: search and rules stay exactly as they are, and a third action (askCopilot(question: string)) would take the current suggestions + results as context and hit a free-tier hosted model (Groq, say) just for the generation step. Nothing above needs to change to make that possible later — which is the actual point of separating search/rules from the UI in the first place.

Not needed now. Just noting the door's open if you want it.