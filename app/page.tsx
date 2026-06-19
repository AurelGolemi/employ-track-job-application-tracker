import Image from "next/image";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-indigo-50/70 via-white to-white dark:from-indigo-950/30 dark:via-[#0A0A0F] dark:to-[#0A0A0F]"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-3 py-1 text-sm text-indigo-700 dark:border-indigo-900/60 dark:bg-[#0A0A0F]/40 dark:text-indigo-200">
                  <span className="inline-block h-2 w-2 rounded-full bg-indigo-600" />
                  Free job application tracker for serious job seekers
                </p>

                <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                  Track your job search & get hired faster
                </h1>

                <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-xl">
                  Organize every application in one place, automate follow-ups,
                  and use job insights to tailor your next resume.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <a
                    href="/job-application-tracker"
                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] transition-all"
                  >
                    Join now
                  </a>
                  <a
                    href="#features"
                    className="inline-flex items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#0A0A0F]/40 px-5 py-3 text-neutral-900 dark:text-neutral-100 font-semibold hover:bg-white dark:hover:bg-[#121225] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] transition-all"
                  >
                    See features
                  </a>
                </div>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                      ✓
                    </span>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      Track applications from day one
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                      ✓
                    </span>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      Never miss follow-ups & deadlines
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                      ✓
                    </span>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      Job insights for smarter targeting
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                      ✓
                    </span>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      Stay organized without spreadsheets
                    </span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-2xl border border-neutral-200/60 bg-white/60 shadow-sm dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                  <div className="absolute -top-3 -left-3 h-16 w-16 rounded-full bg-indigo-100 blur-2xl opacity-70 dark:bg-indigo-900/30" />
                  <div className="p-4 sm:p-6">
                    <Image
                      src="/job-search-weekly-review-1.webp"
                      alt="Job Search Weekly Report"
                      width={720}
                      height={540}
                      className="w-full h-auto rounded-xl"
                      priority
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-neutral-200/60 bg-white/60 p-3 text-center dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      Weekly
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      Review
                    </p>
                  </div>
                  <div className="rounded-xl border border-neutral-200/60 bg-white/60 p-3 text-center dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      Follow-ups
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      Auto
                    </p>
                  </div>
                  <div className="rounded-xl border border-neutral-200/60 bg-white/60 p-3 text-center dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      Insights
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      Targeting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                Every job application in one place
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                Save every application automatically, update your status in
                seconds, and generate follow-up emails—so you can focus on
                interviewing.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl border border-neutral-200/60 bg-white/60 p-6 shadow-sm dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Track
                  </h3>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    1
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                  Centralize roles, companies, contacts, and interview dates.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200/60 bg-white/60 p-6 shadow-sm dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Update status
                  </h3>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    2
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                  Keep every application current—without messy spreadsheets.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200/60 bg-white/60 p-6 shadow-sm dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Follow-ups
                  </h3>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    3
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                  Generate personalized emails to stay top-of-mind.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200/60 bg-white/60 p-6 shadow-sm dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Insights
                  </h3>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    4
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                  Extract keywords & skills to tailor your applications.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <Image
                  src="/feature-job-application-tracker-1.webp"
                  alt="Job application tracker preview"
                  width={640}
                  height={480}
                  className="w-full h-auto rounded-2xl border border-neutral-200/60 bg-white/60 dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40"
                />
              </div>
              <div className="lg:col-span-7">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  Manage applications like a system
                </h2>
                <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                  Track where each application stands, capture recruiter notes,
                  and prepare follow-ups at the right time.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                      ✦
                    </span>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      Update status in seconds, not hours.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                      ✦
                    </span>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      Keep all notes and dates in one view.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                      ✦
                    </span>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      Reduce missed follow-ups with reminders.
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <a
                    href="/job-application-tracker"
                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] transition-all"
                  >
                    Start tracking
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Insights */}
        <section className="py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <p className="text-indigo-700 dark:text-indigo-200 font-semibold">
                  Job Insights
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                  Tailor your applications with job insights
                </h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-300">
                  Turn job descriptions into actionable keywords and skills. Use
                  recommendations to craft applications that match what
                  recruiters actually want.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-neutral-200/60 bg-white/60 p-5 dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      Keyword extraction
                    </p>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                      Identify what matters most in each posting.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-neutral-200/60 bg-white/60 p-5 dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      Tailoring guidance
                    </p>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                      Recommend how to highlight relevant experience.
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <a
                    href="/ai-copilot"
                    className="inline-flex items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#0A0A0F]/40 px-5 py-3 text-neutral-900 dark:text-neutral-100 font-semibold hover:bg-white dark:hover:bg-[#121225] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F]"
                  >
                    Try AI Copilot
                  </a>
                </div>

                <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                  Tip: Tailoring takes minutes when you have the right insights.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-2xl border border-neutral-200/60 bg-white/60 p-4 dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-100 blur-2xl opacity-70 dark:bg-indigo-900/30" />
                  <Image
                    src="/job-insights-keywords.webp"
                    alt="Job insights keywords and skills"
                    width={720}
                    height={540}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                Everything you need to know about using EmployTrack to stay
                organized and increase interview chances.
              </p>
            </div>

            <div className="mt-10 max-w-3xl mx-auto space-y-4">
              <div className="rounded-2xl border border-neutral-200/60 bg-white/60 p-6 dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  What is a job tracker?
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                  A job tracker is a tool job seekers use to organize and manage
                  applications and interviews during an ongoing search. A good
                  tracker helps you keep track of upcoming interviews,
                  referrals, notes, and follow-ups—so you can move faster and
                  get hired sooner.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200/60 bg-white/60 p-6 dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  How much does the job tracker cost?
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                  EmployTrack is free. Our goal is to help you stay organized
                  throughout your search and keep deadlines and follow-ups
                  top-of-mind.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200/60 bg-white/60 p-6 dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  What is the best way to track job applications?
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                  Use a single source of truth: track each role, company,
                  status, contact, and key dates. Then add notes from recruiter
                  interactions and schedule follow-ups so nothing slips through
                  the cracks. EmployTrack is designed exactly for this workflow.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <a
                href="/job-application-tracker"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F]"
              >
                Join EmployTrack
              </a>
              <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                No credit card. No spreadsheets. Just progress.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
