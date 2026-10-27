import Header from "../../app/Components/shared/Header";
import Footer from "../../app/Components/shared/Footer";

const quickPrompts = [
  "Rewrite my intro for a senior product role",
  "Summarize the gaps in my resume against this JD",
  "Draft a follow-up message after the final round",
  "Suggest 3 better ways to position my portfolio",
];

const sessions = [
  { name: "Resume strategy", status: "Ready to review", active: true },
  { name: "Interview prep", status: "2 new notes", active: false },
  { name: "Applications", status: "3 follow-ups due", active: false },
];

const guidance = [
  { title: "Strongest alignment", value: "92%" },
  { title: "Missing keywords", value: "4" },
  { title: "Next action", value: "Tailor portfolio" },
];

const chat = [
  {
    author: "AI Copilot",
    tone: "assistant",
    text: "I reviewed your recent applications and your strongest fit is in product and ops roles. Your experience in cross-functional delivery stands out, but your resume could better emphasize measurable outcomes.",
  },
  {
    author: "You",
    tone: "user",
    text: "Can you help me sharpen my resume intro for a Senior PM role without making it sound generic?",
  },
  {
    author: "AI Copilot",
    tone: "assistant",
    text: "Absolutely — I would lead with your experience owning roadmaps, reducing churn, and coordinating stakeholders across product, design, and engineering. The key is to anchor the story in business impact and decision-making, not just responsibility.",
  },
];

export default function AICopilot() {
  return (
    <>
      <Header />

      <main className="bg-neutral-50 dark:bg-neutral-950">
        <section className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  AI Copilot
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-neutral-900 dark:text-white sm:text-5xl">
                  Your job search coach, built into the workflow.
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
                  Review application fit, rewrite strategy, and turn scattered job-search tasks into clear next steps.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Live review",
                  "Resume feedback",
                  "Interview prep",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-5 md:grid-cols-3">
            {guidance.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {item.title}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-neutral-900 dark:text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_290px]">
            <aside className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  Workspaces
                </p>
                <button
                  type="button"
                  className="rounded-md border border-neutral-200 px-2 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                >
                  New
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {sessions.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition-colors ${
                      item.active
                        ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
                    }`}
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className={`text-[10px] uppercase tracking-[0.14em] ${item.active ? "text-neutral-200 dark:text-neutral-700" : "text-neutral-500 dark:text-neutral-400"}`}>
                      {item.status}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  Quick prompts
                </p>
                <div className="mt-3 space-y-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="block w-full rounded-xl border border-dashed border-neutral-200 bg-neutral-50 px-3 py-2 text-left text-sm text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
              <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    Resume strategy review
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Updated 5 minutes ago
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                    Online
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                {chat.map((message) => (
                  <div
                    key={`${message.author}-${message.text}`}
                    className={`flex ${message.tone === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.tone === "user"
                          ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                          : "border border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
                      }`}
                    >
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-inherit/80">
                        {message.author}
                      </p>
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
                <label htmlFor="copilot-prompt" className="sr-only">
                  Ask AI Copilot
                </label>
                <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-950 sm:flex-row">
                  <input
                    id="copilot-prompt"
                    type="text"
                    defaultValue="Rewrite my intro for a Senior PM application..."
                    className="w-full border-0 bg-transparent px-2 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 dark:text-white dark:placeholder:text-neutral-500"
                  />
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            <aside className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black">
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  Role match
                </p>
                <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-950">
                  <div className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
                    <span>Product Manager</span>
                    <span className="font-medium text-neutral-900 dark:text-white">84%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                    <div className="h-full w-[84%] rounded-full bg-neutral-900 dark:bg-white" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  Suggested next steps
                </p>
                <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {[
                    "Add measurable outcomes to your summary",
                    "Tighten the hiring manager intro around PM ownership",
                    "Prepare three examples for the leadership round",
                  ].map((step) => (
                    <li key={step} className="flex gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-950">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-medium text-white dark:bg-white dark:text-black">
                        ✓
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-950">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  Daily focus
                </p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  Finish resume rewrite and send two tailored applications before noon.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
