export const STATUSES = [
  { value: "applied", label: "Applied", dot: "bg-blue-500" },
  { value: "interviewing", label: "Interviewing", dot: "bg-amber-500" },
  { value: "offer", label: "Offer", dot: "bg-emerald-500" },
  { value: "rejected", label: "Rejected", dot: "bg-neutral-400 dark:bg-neutral-600" },
] as const;

export function statusMeta(value: string) {
  return STATUSES.find((s) => s.value === value) ?? STATUSES[0];
}