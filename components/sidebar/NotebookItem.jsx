"use client";

import { NotebookPen } from "lucide-react";

export default function NotebookItem({
  notebook,
  isSelected,
  onSelect,
}) {
  return (
    <button
      onClick={() => onSelect(notebook)}
      title={notebook.title}
      className={`w-full rounded-xl border p-3 text-left transition-all duration-200 hover:shadow-sm ${
        isSelected
          ? "border-slate-900 bg-slate-100"
          : "border-slate-200 bg-slate-50 hover:bg-slate-100"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200">
          <NotebookPen className="h-5 w-5 text-slate-600" />
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className="truncate text-sm font-semibold text-slate-800"
            title={notebook.title}
          >
            {notebook.title}
          </h3>

          {notebook.description && (
            <p
              className="mt-1 line-clamp-2 text-xs text-slate-500"
              title={notebook.description}
            >
              {notebook.description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}