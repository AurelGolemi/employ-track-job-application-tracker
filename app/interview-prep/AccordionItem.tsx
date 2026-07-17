"use client";

import { useState } from "react";

export default function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="cursor-pointer flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-medium text-neutral-900 dark:text-white">{question}</span>
        <span className="shrink-0 text-neutral-400 dark:text-neutral-500" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <p className="pb-4 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{answer}</p>}
    </div>
  );
}