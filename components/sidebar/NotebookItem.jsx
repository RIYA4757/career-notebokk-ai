"use client";

import { NotebookPen } from "lucide-react";

export default function NotebookItem({
  title,
  description,
}) {
  return (
    <button className="w-full rounded-xl border bg-slate-50 p-4 text-left transition-all duration-200 hover:bg-slate-100 hover:shadow-sm">

      <NotebookPen className="mb-3 h-8 w-8 text-slate-500" />

      <h3 className="font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

    </button>
  );
}