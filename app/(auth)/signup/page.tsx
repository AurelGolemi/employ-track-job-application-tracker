"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpWithEmail } from "./actions";
import { authLabel, authInput, authButton, authLink } from "../authStyles";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="cursor-pointer block text-center text-lg font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
          EmployTrack
        </Link>
        <h1 className="mt-6 text-center text-2xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
          Create your account
        </h1>

        <form action={formAction} className="mt-8 space-y-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
          <div className="space-y-1.5">
            <label htmlFor="name" className={authLabel}>Name</label>
            <input id="name" name="name" type="text" required placeholder="John Doe" className={authInput} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className={authLabel}>Email address</label>
            <input id="email" name="email" type="email" required placeholder="john@my-company.com" className={authInput} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className={authLabel}>Password</label>
            <input id="password" name="password" type="password" required placeholder="••••••••" className={authInput} />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
          )}

          <button type="submit" disabled={isPending} className={authButton}>
            {isPending ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Already have an account?{" "}
          <Link href="/login" className={authLink}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}