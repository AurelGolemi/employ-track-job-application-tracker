import Link from "next/link";
import Image from "next/image";

const focus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black";
const footerLink = `cursor-pointer text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors rounded ${focus}`;
const btnPrimary = `cursor-pointer inline-flex items-center justify-center rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors px-5 py-3 ${focus}`;

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/job-application-tracker", label: "Job Tracker" },
      { href: "/interview-prep", label: "Interview Prep" },
      { href: "/ai-copilot", label: "AI Copilot" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/employers", label: "Employers" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center justify-center">
                <Image src="/applicant.png" alt="EmployTrack Logo" width={28} height={28} className="rounded" />
              </div>
              <div>
                <p className="text-lg font-semibold text-neutral-900 dark:text-white">EmployTrack</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Job application tracker for serious job seekers.</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-500 dark:text-neutral-400 max-w-md">
              Keep every role, status, follow-up, and insight in one place—so you can focus on interviewing.
            </p>

            <Link href="/job-application-tracker" className={`${btnPrimary} mt-6`}>
              Join EmployTrack
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">{col.title}</p>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={footerLink}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">Ready to track smarter?</p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Start organizing your job search in minutes.</p>
              </div>
              <Link href="/job-application-tracker" className={btnPrimary}>
                Get started
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">© {new Date().getFullYear()} EmployTrack. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Security"].map((label) => (
              <Link key={label} href="#" className={footerLink}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}