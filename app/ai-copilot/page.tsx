import Header from "../../app/Components/shared/Header";
import Footer from "../../app/Components/shared/Footer";

export default function AICopilot() {
  return (
    <>
      <Header />

      <main className="bg-white dark:bg-black">
        <section className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              AI Copilot
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white sm:text-4xl">
              Intelligent support for your job search is almost here.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
              This space will soon bring tailored guidance, smarter prep, and
              streamlined next steps.
            </p>
          </div>
        </section>

        <section className="bg-neutral-50 py-14 sm:py-16 dark:bg-neutral-950">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-black sm:p-10">
              <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
                Coming soon
              </div>

              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white sm:text-3xl">
                AI Copilot
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                We&apos;re preparing this experience to make your job search
                feel more focused and effortless.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Prep", value: "Coming" },
                  { label: "Support", value: "Soon" },
                  { label: "Guidance", value: "Next" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center dark:border-neutral-800 dark:bg-neutral-950"
                  >
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
