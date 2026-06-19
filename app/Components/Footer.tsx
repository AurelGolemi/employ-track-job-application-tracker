import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200/80 dark:border-[#2A2A3A] bg-white/70 dark:bg-[#0A0A0F]/60 backdrop-blur">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="py-12 sm:py-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-xl border border-neutral-200/60 bg-white/60 dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40 flex items-center justify-center">
                  <Image
                    src="/applicant.png"
                    alt="EmployTrack Logo"
                    width={28}
                    height={28}
                    className="rounded"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    EmployTrack
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Job application tracker for serious job seekers.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-neutral-600 dark:text-neutral-300 max-w-md">
                Keep every role, status, follow-up, and insight in one place—so you
                can focus on interviewing.
              </p>

              <div className="mt-6">
                <Link
                  href="/job-application-tracker"
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] transition-all duration-300 ease-out"
                >
                  Join EmployTrack
                </Link>
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Product
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      { href: "/job-application-tracker", label: "Job Tracker" },
                      { href: "/resume-builder", label: "Resume Builder" },
                      { href: "/ai-copilot", label: "AI Copilot" },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 ease-out"
                        >
                          <span className="inline-flex items-center gap-2">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Company
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      { href: "/blog", label: "Blog" },
                      { href: "/employers", label: "Employers" },
                      { href: "/about", label: "About" },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 ease-out"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Resources
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      { href: "/#features", label: "Features" },
                      { href: "/#faq", label: "FAQ" },
                      { href: "/contact", label: "Contact" },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 ease-out"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA card */}
              <div className="mt-8 rounded-2xl border border-neutral-200/60 bg-white/60 p-6 shadow-sm dark:border-neutral-800/60 dark:bg-[#0A0A0F]/40">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      Ready to track smarter?
                    </p>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                      Start organizing your job search in minutes.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/job-application-tracker"
                      className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] transition-all duration-300 ease-out"
                    >
                      Get started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-200/60 dark:border-neutral-800/60 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              © {new Date().getFullYear()} EmployTrack. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy", "Terms", "Security"].map((label) => (
                <Link
                  key={label}
                  href="#"
                  className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 ease-out"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

