"use client";

import { useEffect, useState } from "react";
// import { FileText } from "lucide-react";
import { useNotebook } from "@/context/NotebookContext";
import { FileText, Trash2 } from "lucide-react";

export default function SourceList() {
  const { selectedNotebook } = useNotebook();
  const [sources, setSources] = useState([]);

  async function deleteSource(id) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this source?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/sources/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete source");
    }

    setSources((prev) =>
      prev.filter((source) => source.id !== id)
    );
  } catch (error) {
    console.error(error);
  }
}

  useEffect(() => {
    if (!selectedNotebook) return;

    async function loadSources() {
      try {
        const res = await fetch(
          `/api/sources?notebookId=${selectedNotebook.id}`
        );

        const data = await res.json();
        setSources(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadSources();
  }, [selectedNotebook]);

  if (!selectedNotebook) return null;

  if (sources.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-lg font-semibold">
          No knowledge sources yet
        </h3>

        <p className="mt-2 text-slate-500">
          Upload a PDF, website, YouTube video or transcript
          to start chatting with your notebook.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {sources.map((source) => (
        <div
          key={source.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-red-500" />
               <div>
                <p className="font-medium">{source.title}</p>
                <p className="text-sm text-slate-500">
                    {source.status}
                </p>
            </div>
        </div>

    <button
        onClick={() => deleteSource(source.id)}
        className="rounded-md p-2 transition hover:bg-red-100"
    >
     <Trash2 className="h-5 w-5 text-red-500" />
    </button>
    </div>
    </div>
      ))}
    </div>
  );
}
