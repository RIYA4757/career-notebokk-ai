"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function EditNotebookDialog({
  open,
  onOpenChange,
  notebook,
  onUpdated,
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notebook) {
      setName(notebook.title);
    }
  }, [notebook]);

  async function updateNotebook() {
    if (!name.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/notebooks/${notebook.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: name,
          description: notebook.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update notebook");
      }

      const updatedNotebook = await response.json();

      onUpdated?.(updatedNotebook);

      onOpenChange(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update notebook.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Notebook</DialogTitle>
        </DialogHeader>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Notebook name..."
          className="mt-4 w-full rounded-md border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-slate-400"
        />

        <DialogFooter>
          <Button
            onClick={updateNotebook}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}