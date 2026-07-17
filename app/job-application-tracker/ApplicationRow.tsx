"use client";

import { useTransition } from "react";
import { updateStatus, deleteApplication } from "./actions";
import { STATUSES, statusMeta } from "./statuses";
import type { Application } from "../../app/lib/db/schema";

export default function ApplicationRow({ app }: { app: Application }) {
  const [isPending, startTransition] = useTransition();
  const meta = statusMeta(app.status);

  function handleStatusChange(value: string) {
    startTransition(() => updateStatus(app.id, value));
  }

  function handleDelete() {
    if (!window.confirm(`Delete the application to ${app.company}?`)) return;
    startTransition(() => deleteApplication(app.id));
  }

  return (
    <tr className={`border-b border-neutral-200 dark:border-neutral-800 last:border-0 ${isPending ? "opacity-50" : ""}`}>
      <td className="py-3 pr-4 pl-6 text-sm font-medium text-neutral-900 dark:text-white">{app.company}</td>
      <td className="py-3 pr-4 text-sm text-neutral-600 dark:text-neutral-300">{app.role}</td>
      <td className="py-3 pr-4">
        <div className="relative inline-flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
          <select
            value={app.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isPending}
            className="cursor-pointer rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black py-1 pl-2 pr-6 text-xs font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </td>
      <td className="py-3 pr-4 text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(app.appliedAt).toLocaleDateString()}
      </td>
      <td className="py-3 pr-6 text-right">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="cursor-pointer text-sm text-neutral-400 hover:text-red-600 dark:text-neutral-500 dark:hover:text-red-400 disabled:cursor-not-allowed"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}