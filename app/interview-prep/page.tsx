import Header from "@/app/Components/shared/Header";
import Footer from "@/app/Components/shared/Footer";
import AccordionItem from "./AccordionItem";
import { BEHAVIORAL, TECHNICAL, COMPANY_PLAYBOOKS } from "./data";

const SECTIONS = [
  { id: "behavioral", label: "Behavioral" },
  { id: "technical", label: "Technical" },
  { id: "companies", label: "Company playbooks" },
];

export default function InterviewPrepPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-black">
        {/* Intro */}
        <section className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Interview Prep
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
              Questions & answers, from FAANG to Greek consulting firms.
            </h1>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl">
              {`Behavioral and technical questions that show up across almost every
              interview, plus company-specific playbooks for the kinds of
              places you're actually applying to.`}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="cursor-pointer inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Behavioral */}
        <section id="behavioral" className="py-14 sm:py-16 bg-neutral-50 dark:bg-neutral-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
              Behavioral & culture-fit
            </h2>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              Universal across FAANG, consulting, and startups — only the
              scoring rubric changes.
            </p>
            <div className="mt-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6">
              {BEHAVIORAL.map((item) => (
                <AccordionItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Technical */}
        <section id="technical" className="py-14 sm:py-16 bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
              Technical fundamentals
            </h2>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              JS, React, Next.js, SQL, and Git basics that come up for junior
              full-stack roles regardless of company size.
            </p>
            <div className="mt-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6">
              {TECHNICAL.map((item) => (
                <AccordionItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Company playbooks */}
        <section id="companies" className="py-14 sm:py-16 bg-neutral-50 dark:bg-neutral-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
              Company playbooks
            </h2>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              How the process and bar actually differ by company type.
            </p>

            <div className="mt-6 space-y-6">
              {COMPANY_PLAYBOOKS.map((c) => (
                <div
                  key={c.name}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-6"
                >
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{c.blurb}</p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                        Process
                      </p>
                      <ol className="mt-2 space-y-2">
                        {c.stages.map((stage, i) => (
                          <li key={stage} className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                            <span className="shrink-0 font-mono text-neutral-400 dark:text-neutral-600">{i + 1}.</span>
                            {stage}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                        Tips
                      </p>
                      <ul className="mt-2 space-y-2">
                        {c.tips.map((tip) => (
                          <li key={tip} className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                            <span className="shrink-0 text-neutral-400 dark:text-neutral-600">✦</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}