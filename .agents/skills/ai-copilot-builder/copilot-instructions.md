# Project: chat assistant
Stack: Next.js (App Router), TypeScript strict, Tailwind, Drizzle + Postgres (Neon), Vercel AI SDK.
Rules:
- Stream all model responses; never block on full completions.
- All model calls go through lib/ai/provider.ts so providers are swappable (Ollama locally, hosted API in prod).
- Validate inputs with zod. No `any`.
- Every new feature needs a test or an eval case.
- Work in small steps; explain the plan before editing more than 3 files.