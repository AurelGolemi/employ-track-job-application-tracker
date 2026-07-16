"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "../../lib/auth/client";
import { useAccountActions } from "../../lib/hooks/useAccountActions";

const NAV_LINKS = [
  { href: "/job-application-tracker", label: "Job Application Tracker" },
  { href: "/ai-copilot", label: "AI Copilot" },
  { href: "/interview-prep", label: "Interview Prep" },
];

const focus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black";
const navLink = `cursor-pointer text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded transition-colors ${focus}`;
const btnPrimary = `cursor-pointer inline-flex items-center justify-center rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors ${focus}`;
const btnSecondary = `cursor-pointer inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-950 transition-colors ${focus}`;

export default function Header() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { signOut, deleteAccount, isPending: deletePending } = useAccountActions();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleSignOut() {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    await signOut();
  }

  async function handleDeleteAccount() {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    await deleteAccount();
  }

  return (
    <header className="bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className={`inline-flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-white cursor-pointer rounded ${focus}`}>
            <Image src="/applicant.png" alt="EmployTrack Logo - Job Application Tracker" width={32} height={32} />
            <h3 className="text-2xl leading-none tracking-[-0.02em]">EmployTrack</h3>
          </Link>

          <nav className="hidden lg:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            {sessionPending ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
            ) : session?.user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((p) => !p)}
                  aria-expanded={isProfileOpen}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-sm font-semibold text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200 cursor-pointer ${focus}`}
                >
                  {(session.user.name?.[0] ?? session.user.email[0]).toUpperCase()}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black py-1 shadow-[0px_1px_1px_rgba(0,0,0,0.03),0px_2px_2px_rgba(0,0,0,0.04)] z-999">
                    <div className="px-4 pb-3 pt-2">
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">
                        {session.user.name ?? session.user.email}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{session.user.email}</div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="cursor-pointer block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-950"
                    >
                      Edit profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="cursor-pointer block w-full px-4 py-2 text-left text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-950"
                    >
                      Sign out
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deletePending}
                      className="cursor-pointer block w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-neutral-50 dark:hover:bg-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletePending ? "Deleting…" : "Delete account"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className={`${btnSecondary} px-4 py-1.5`}>Log in</Link>
                <Link href="/signup" className={`${btnPrimary} px-4 py-1.5`}>Sign Up</Link>
              </div>
            )}
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen((p) => !p)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className={`cursor-pointer text-neutral-900 dark:text-white rounded p-1 ${focus}`}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <Image src="/hamburg-menu.png" alt="more" width={24} height={24} className="dark:invert" />
              )}
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${isMenuOpen ? "max-h-96" : "max-h-0"}`}>
          <nav className="flex flex-col space-y-1 pb-4 pt-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className={`${navLink} px-2 py-2`}>
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-2 pt-2">
              {sessionPending ? (
                <div className="h-10 w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
              ) : session?.user ? (
                <>
                  <div className="px-2">
                    <div className="text-sm font-medium text-neutral-900 dark:text-white">
                      {session.user.name ?? session.user.email}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{session.user.email}</div>
                  </div>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)} className={`${btnSecondary} px-5 py-3`}>
                    Edit profile
                  </Link>
                  <button onClick={handleSignOut} className={`${btnSecondary} px-5 py-3`}>
                    Sign out
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deletePending}
                    className={`cursor-pointer inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed ${focus}`}
                  >
                    {deletePending ? "Deleting…" : "Delete account"}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className={`${btnSecondary} px-5 py-3`}>
                    Log in
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)} className={`${btnPrimary} px-5 py-3`}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}