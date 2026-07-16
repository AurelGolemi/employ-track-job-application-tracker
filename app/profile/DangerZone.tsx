"use client";

import { useAccountActions } from "../lib/hooks/useAccountActions";

export default function DangerZone() {
  const { signOut, deleteAccount, isPending } = useAccountActions();

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Signed in. Not you?</p>
        <button
          onClick={signOut}
          className="cursor-pointer rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-1.5 text-sm font-medium text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          Sign out
        </button>
      </div>

      <div className="mt-6 rounded-md border border-red-200 dark:border-red-900/60 p-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-900 dark:text-white">Delete account</p>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Permanently removes your account and data. This can&apos;t be undone.
          </p>
        </div>
        <button
          onClick={deleteAccount}
          disabled={isPending}
          className="cursor-pointer shrink-0 rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}