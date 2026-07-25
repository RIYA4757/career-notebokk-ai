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
      className={`w-full rounded-xl border p-4 text-left transition-all duration-200 hover:shadow-sm ${
        isSelected
          ? "border-slate-900 bg-slate-100"
          : "border-slate-200 bg-slate-50 hover:bg-slate-100"
      }`}
    >
      <NotebookPen className="mb-3 h-8 w-8 text-slate-500" />

      <h3 className="font-semibold text-slate-800">
        {notebook.title}
      </h3>

      {notebook.description && (
        <p className="mt-2 text-sm text-slate-500">
          {notebook.description}
        </p>
      )}
    </button>
  );
}