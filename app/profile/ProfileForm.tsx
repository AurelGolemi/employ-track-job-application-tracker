"use client";

import { useActionState } from "react";
import { updateProfile } from "./actions";

type State = { error?: string; success?: boolean };

const input =
  "w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white dark:placeholder:text-neutral-600 dark:focus:ring-white";
const focus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950";

export default function ProfileForm({ initialName }: { initialName: string }) {
  const [state, formAction] = useActionState<State, FormData>(updateProfile, {});

  return (
    <form action={formAction} className="space-y-4">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Update profile</h2>

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Name
        </label>
        <input id="name" name="name" defaultValue={initialName} className={input} placeholder="Your name" />
      </div>

      {state?.error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      ) : state?.success ? (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">Profile updated.</p>
      ) : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className={`cursor-pointer inline-flex items-center justify-center rounded-full bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200 ${focus}`}
        >
          Save
        </button>
        <button
          type="reset"
          className={`cursor-pointer inline-flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-2 text-sm font-medium text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 ${focus}`}
        >
          Reset
        </button>
      </div>
    </form>
  );
}