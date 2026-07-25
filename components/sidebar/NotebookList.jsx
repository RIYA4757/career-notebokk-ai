"use client";

import { useEffect, useState } from "react";
import NotebookItem from "./NotebookItem";
import { useNotebook } from "@/context/NotebookContext";

export default function NotebookList({ refreshKey }) {
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedNotebook, setSelectedNotebook } = useNotebook();

  useEffect(() => {
    fetchNotebooks();
  }, [refreshKey]);

  async function fetchNotebooks() {
    try {
      const response = await fetch("/api/notebooks");
      const data = await response.json();

      setNotebooks(data);
    } catch (error) {
      console.error("Failed to fetch notebooks:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-slate-500">
        Loading notebooks...
      </p>
    );
  }

  if (notebooks.length === 0) {
    return (
      <NotebookItem
        notebook={{ title: "No notebooks yet", description: "Click 'New Notebook' to create your first notebook." }}    
        isSelected={false}
        onSelect={() => {}}
      />
    );
  }

  return (
    <div className="space-y-3">
      {notebooks.map((notebook) => (
        <NotebookItem
          key={notebook.id}
        //   title={notebook.title}
        notebook={notebook}
        //   description="AI Notebook"
         isSelected={selectedNotebook?.id === notebook.id}
         onSelect={setSelectedNotebook}
        />
      ))}
    </div>
  );
}