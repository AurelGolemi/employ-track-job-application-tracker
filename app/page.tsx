import Image from "next/image";
import Header from "@/app/Components/shared/Header";
import Footer from "@/app/Components/shared/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-white dark:bg-black">
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-140 opacity-40 dark:opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(40% 60% at 20% 20%, #007cf0 0%, transparent 100%), radial-gradient(40% 60% at 60% 10%, #7928ca 0%, transparent 100%), radial-gradient(35% 55% at 85% 25%, #ff0080 0%, transparent 100%), radial-gradient(30% 50% at 45% 35%, #00dfd8 0%, transparent 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-white/60 dark:bg-black/70"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-neutral-900 dark:text-white">
                  Track your job search &amp; get hired faster.
                </h1>

                <p className="mt-4 text-lg leading-7 text-neutral-500 dark:text-neutral-400 max-w-xl">
                  Organize every application in one place, automate follow-ups,
                  and use job insights to tailor your next resume.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <a
                    href="/job-application-tracker"
                    className="cursor-pointer inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
                  >
                    Join now
                  </a>
                  <a
                    href="#features"
                    className="cursor-pointer inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-950 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
                  >
                    See features
                  </a>
                </div>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Track applications from day one",
                    "Never miss follow-ups & deadlines",
                    "Job insights for smarter targeting",
                    "Stay organized without spreadsheets",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white">
                        ✓
                      </span>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-lg border border-neutral-200 bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.03),0px_2px_2px_rgba(0,0,0,0.04)] dark:border-neutral-800 dark:bg-neutral-950">
                  <div className="p-4 sm:p-6">
                    <Image
                      src="/job-search-weekly-review-1.webp"
                      alt="Job Search Weekly Report"
                      width={720}
                      height={540}
                      className="w-full h-auto rounded-md"
                      priority
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Weekly", sub: "Review" },
                    { label: "Follow-ups", sub: "Auto" },
                    { label: "Insights", sub: "Targeting" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-md border border-neutral-200 bg-white p-3 text-center dark:border-neutral-800 dark:bg-neutral-950"
                    >
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {stat.label}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {stat.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-14 sm:py-16 bg-neutral-50 dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                Every job application in one place.
              </h2>
              <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                Save every application automatically, update your status in
                seconds, and generate follow-up emails—so you can focus on
                interviewing.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  n: "1",
                  title: "Track",
                  body: "Centralize roles, companies, contacts, and interview dates.",
                },
                {
                  n: "2",
                  title: "Update status",
                  body: "Keep every application current—without messy spreadsheets.",
                },
                {
                  n: "3",
                  title: "Follow-ups",
                  body: "Generate personalized emails to stay top-of-mind.",
                },
                {
                  n: "4",
                  title: "Insights",
                  body: "Extract keywords & skills to tailor your applications.",
                },
              ].map((f) => (
                <div
                  key={f.n}
                  className="rounded-md border border-neutral-200 bg-white p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03),0px_2px_2px_rgba(0,0,0,0.04)] dark:border-neutral-800 dark:bg-black"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-neutral-900 dark:text-white">
                      {f.title}
                    </h3>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 font-mono text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                      {f.n}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <Image
                  src="/feature-job-application-tracker-1.webp"
                  alt="Job application tracker preview"
                  width={640}
                  height={480}
                  className="w-full h-auto rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black"
                />
              </div>
              <div className="lg:col-span-7">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                  Manage applications like a system.
                </h2>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                  Track where each application stands, capture recruiter notes,
                  and prepare follow-ups at the right time.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    "Update status in seconds, not hours.",
                    "Keep all notes and dates in one view.",
                    "Reduce missed follow-ups with reminders.",
                  ].map((line) => (
                    <div key={line} className="flex gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white">
                        ✦
                      </span>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <a
                    href="/job-application-tracker"
                    className="cursor-pointer inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
                  >
                    Start tracking
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Insights */}
        <section className="py-14 sm:py-16 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Job Insights
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                  Tailor your applications with job insights.
                </h2>
                <p className="mt-4 text-neutral-500 dark:text-neutral-400">
                  Turn job descriptions into actionable keywords and skills. Use
                  recommendations to craft applications that match what
                  recruiters actually want.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-md border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      Keyword extraction
                    </p>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      Identify what matters most in each posting.
                    </p>
                  </div>
                  <div className="rounded-md border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      Tailoring guidance
                    </p>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      Recommend how to highlight relevant experience.
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <a
                    href="/ai-copilot"
                    className="cursor-pointer inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-950 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
                  >
                    Try AI Copilot
                  </a>
                </div>

                <p className="mt-4 text-xs font-mono text-neutral-400 dark:text-neutral-500">
                  Tip: Tailoring takes minutes when you have the right insights.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
                  <Image
                    src="/job-insights-keywords.webp"
                    alt="Job insights keywords and skills"
                    width={720}
                    height={540}
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-16 bg-neutral-50 dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                Frequently asked questions.
              </h2>
              <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                Everything you need to know about using EmployTrack to stay
                organized and increase interview chances.
              </p>
            </div>

            <div className="mt-10 max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "What is a job tracker?",
                  a: "A job tracker is a tool job seekers use to organize and manage applications and interviews during an ongoing search. A good tracker helps you keep track of upcoming interviews, referrals, notes, and follow-ups—so you can move faster and get hired sooner.",
                },
                {
                  q: "How much does the job tracker cost?",
                  a: "EmployTrack is free. Our goal is to help you stay organized throughout your search and keep deadlines and follow-ups top-of-mind.",
                },
                {
                  q: "What is the best way to track job applications?",
                  a: "Use a single source of truth: track each role, company, status, contact, and key dates. Then add notes from recruiter interactions and schedule follow-ups so nothing slips through the cracks. EmployTrack is designed exactly for this workflow.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-md border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black"
                >
                  <h3 className="text-base font-medium text-neutral-900 dark:text-white">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="/job-application-tracker"
                className="cursor-pointer inline-flex items-center justify-center rounded-full bg-neutral-900 px-7 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
              >
                Join EmployTrack
              </a>
              <p className="mt-3 text-xs font-mono text-neutral-400 dark:text-neutral-500">
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