TASKS: build order for Copilot

How to use: give Copilot (agent mode) ONE task at a time. Paste the task text plus "Follow SPEC.md and .github/copilot-instructions.md. Explain your plan before editing more than 3 files." Review the diff, run the checks, commit, then move on. Don't start the next task until the current one's acceptance checks pass.

Phase 0: Setup
T0.1 Project and tooling
Create Next.js (App Router, TypeScript, Tailwind) app. Enable strict TS.
Add .github/copilot-instructions.md, AGENTS.md, SPEC.md, TASKS.md, .env.example.
Add scripts: lint, typecheck, test (Vitest).
Done when: pnpm dev, pnpm lint, pnpm typecheck, pnpm test all run clean.
T0.2 Ollama working locally
Not a Copilot task: install Ollama, ollama pull llama3.2:3b (or qwen2.5:3b) and ollama pull nomic-embed-text.
Done when: ollama run llama3.2:3b "hi" responds.
Phase 1: MVP chat
T1.1 Provider module
Create lib/ai/provider.ts exporting getModel() and getEmbeddingModel(), selected by AI_PROVIDER and AI_MODEL env vars. Start with Ollama only; leave a clearly marked branch for a hosted provider.
Validate env with zod at startup.
Done when: a unit test confirms bad env values throw a clear error.
T1.2 Streaming endpoint
Create app/api/chat/route.ts using streamText and the provider module. Validate the body with zod.
Done when: curl to the route streams tokens.
T1.3 Chat UI
Chat page with useChat, message list, composer, stop button, markdown rendering, auto-scroll.
Done when: you can hold a streamed conversation in the browser and stop a generation mid-way.
T1.4 Database and schema
Add Drizzle + Neon (or local Postgres for dev). Create conversations and messages tables per SPEC.md. Add db:generate, db:push scripts.
Done when: pnpm db:push creates the tables.
T1.5 Persistence
Persist user and assistant messages (assistant on stream finish). Route c/[id] loads history.
Done when: reloading the page keeps the conversation.
T1.6 Conversation sidebar
List, create, rename, delete conversations. Per-conversation system prompt editable in a settings popover.
Done when: switching conversations works and deleting cascades messages.
T1.7 Error handling
Provider errors (Ollama not running, timeout) show a retryable error message in the UI.
Done when: stopping Ollama and sending a message shows a friendly error and retry works after restarting it.
Phase 2: RAG
T2.1 pgvector and chunk tables
Enable the vector extension; add documents and chunks tables with vector(768) and a cosine index.
Done when: migration applies cleanly on a fresh database.
T2.2 Text extraction and chunking
lib/rag/extract.ts (txt, md, pdf) and lib/rag/chunk.ts (~500 tokens, ~50 overlap).
Done when: unit tests cover chunk sizes, overlap and empty input.
T2.3 Embedding and ingestion
lib/rag/embed.ts using the embedding model; POST /api/documents extracts, chunks, embeds (in batches) and stores.
Done when: uploading a markdown file creates a document row and chunk rows with embeddings.
T2.4 Retrieval
lib/rag/retrieve.ts: embed query, top-k cosine search, return chunks with document names and scores.
Done when: a test with known fixture text returns the expected chunk first.
T2.5 RAG in chat
When use_documents is on, inject retrieved chunks into the system context with an instruction to answer only from the context and say when it doesn't know.
Show sources under the answer.
Done when: a question about an uploaded file is answered correctly with a visible source, and an unrelated question gets "I don't know" style behavior.
Phase 3: Tools
T3.1 Tool definitions
lib/ai/tools.ts with zod-validated calculator, getCurrentTime, and searchDocuments.
Done when: unit tests cover each tool, including calculator edge cases (no eval; use a safe expression parser).
T3.2 Tools in chat and UI
Enable tools in streamText with a step limit. Persist tool parts. Render collapsible tool call/result blocks.
Done when: "What is 17.5% of 2480?" triggers the calculator and the call is visible in the UI.

Note: small local models are unreliable at tool calling. If results are poor, test with a hosted free-tier model before debugging your code.

Phase 4: Evals
T4.1 Eval runner
evals/run.ts loads evals/cases/*.json, runs each case through the same pipeline as the chat endpoint (no UI), applies the check, writes evals/results/<timestamp>.json and prints a summary table (pass rate by type, average latency, model/config).
Done when: pnpm eval runs on at least 15 cases (mix of plain Q&A, RAG, tool use).
T4.2 Compare runs
pnpm eval:compare a.json b.json prints per-case differences.
Done when: you can change the chunk size or model and see which cases improved or regressed.
T4.3 Use the evals
Try 2-3 experiments (chunk size, top-k, prompt wording, model) and record results in docs/experiments.md. This write-up is the most valuable part for a portfolio.
Phase 5: Ship
T5.1 Hosted provider
Implement the hosted branch in lib/ai/provider.ts. Choose a provider with a free tier and set env vars in Vercel.
Done when: the deployed app chats and RAG works there.
T5.2 README
Setup steps, architecture diagram, eval results, screenshots, limitations.
Stretch (only after the above)

Auth, rate limiting, auto-generated titles, regenerate/branching.

Tips for working with Copilot on this
If it produces a large unrelated rewrite, reject it and re-prompt with a narrower scope.
Ask it to write the test first for lib/rag/* and tools; those are easy to get subtly wrong.
Check any package or API it suggests against the current docs. The AI SDK changes between major versions, and models often write code for an older one.
Commit after every green task so you can roll back cleanly.