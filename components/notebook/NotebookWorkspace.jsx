"use client";

import { useNotebook } from "@/context/NotebookContext";
import SourceActions from "./SourceActions";
import SourceList from "./SourceList";

export default function NotebookWorkspace() {
  const { selectedNotebook } = useNotebook();

  if (!selectedNotebook) return null;

  return (
    <div className="flex h-full flex-col">

      <div className="border-b bg-white px-8 py-6">
        <h1 className="text-3xl font-bold">
          {selectedNotebook.title}
        </h1>

        <p className="mt-2 text-slate-500">
          {selectedNotebook.description || "No description"}
        </p>
      </div>

      <div className="flex-1 bg-slate-50 p-8">

        <SourceActions />

        <SourceList />

      </div>

    </div>
  );
}