import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white dark:bg-[#0A0A0F] border-b border-gray-200 dark:border-[#2A2A3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F]"
            >
              <Image
                src="/applicant.png"
                alt="EmployTrack Logo - Job Application Tracker"
                width={32}
                height={32}
                className="inline-block"
              />
              <h3 className="text-2xl leading-none">EmployTrack</h3>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link
              href="/resume-builder"
              className="text-gray-700 dark:text-neutral-300 hover:text-black dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] rounded"
            >
              Resume Builder
            </Link>
            <Link
              href="/job-application-tracker"
              className="text-gray-700 dark:text-neutral-300 hover:text-black dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] rounded"
            >
              Job Application Tracker
            </Link>
            <Link
              href="/ai-copilot"
              className="text-gray-700 dark:text-neutral-300 hover:text-black dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] rounded"
            >
              AI Copilot
            </Link>
            <Link
              href="/employers"
              className="text-gray-700 dark:text-neutral-300 hover:text-black dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] rounded"
            >
              Employers
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 dark:text-neutral-300 hover:text-black dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] rounded"
            >
              Blog
            </Link>
          </nav>
          <div className="space-x-4">
            <button className="inline-flex items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#0A0A0F]/40 px-5 py-3 text-neutral-900 dark:text-neutral-100 font-semibold hover:bg-white dark:hover:bg-[#121225] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] cursor-pointer transition-all">
              Log in
            </button>
            <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] cursor-pointer transition-all">
              Sign Up
            </button>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-neutral-900 dark:text-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0F] rounded"
            >
              <Image
                src="/hamburg-menu.png"
                alt="more"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
