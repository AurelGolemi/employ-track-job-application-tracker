import Header from "@/app/Components/shared/Header";
import Footer from "@/app/Components/shared/Footer";
import AccordionItem from "./AccordionItem";
import { BEHAVIORAL, TECHNICAL, STACK_TRACKS } from "./data";

const SECTIONS = [
  { id: "behavioral", label: "Behavioral" },
  { id: "technical", label: "Technical" },
  { id: "stacks", label: "Popular stacks" },
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
              Interview prep for the stacks behind today&apos;s software.
            </h1>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl">
              Build confidence with universal interview fundamentals and focused
              starting points for widely used software and AI engineering stacks.
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
              Whether you&apos;re self-taught, studying, changing careers, or already
              building software, clear examples and thoughtful communication matter.
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
              Core concepts that travel across languages, frameworks, databases,
              and the responsible use of AI coding tools.
            </p>
            <div className="mt-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6">
              {TECHNICAL.map((item) => (
                <AccordionItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular stacks */}
        <section id="stacks" className="py-14 sm:py-16 bg-neutral-50 dark:bg-neutral-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
              Popular software engineering & AI stacks
            </h2>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              Explore common ecosystems, including building AI-powered features
              and working effectively with coding agents. You do not need to
              know every stack—start with the one that fits the role you want.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {STACK_TRACKS.map((stack) => (
                <article
                  key={stack.name}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-6"
                >
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                    {stack.name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                    {stack.blurb}
                  </p>
                  <ul aria-label={`${stack.name} technologies`} className="mt-4 flex flex-wrap gap-2">
                    {stack.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-300"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                  <h4 className="mt-5 text-xs font-mono uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    Interview focus
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {stack.focus.map((topic) => (
                      <li key={topic} className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                        <span className="shrink-0 text-neutral-400 dark:text-neutral-600" aria-hidden="true">
                          &bull;
                        </span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}