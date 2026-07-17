"use client";

import { useActionState } from "react";
import { addApplication } from "./actions";
import { STATUSES } from "./statuses";

const input =
  "w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white dark:placeholder:text-neutral-600 dark:focus:ring-white";
const label = "block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function AddApplicationForm() {
  const [state, formAction, isPending] = useActionState(addApplication, {});

  return (
    <form
      action={formAction}
      className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:items-end">
        <div className="sm:col-span-3">
          <label htmlFor="company" className={label}>Company</label>
          <input id="company" name="company" required placeholder="Acme Inc." className={input} />
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="role" className={label}>Role</label>
          <input id="role" name="role" required placeholder="Junior Full-Stack Developer" className={input} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="status" className={label}>Status</label>
          <select id="status" name="status" defaultValue="applied" className={input}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="appliedAt" className={label}>Date applied</label>
          <input id="appliedAt" name="appliedAt" type="date" required defaultValue={todayISO()} className={input} />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer w-full rounded-full bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Adding…" : "Add"}
          </button>
        </div>
      </div>
      {state?.error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{state.error}</p>}
    </form>
  );
}