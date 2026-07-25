"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CreateNotebookDialog({
  open,
  onOpenChange,
  onCreated,
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function createNotebook() {
    if (!name.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/notebooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: name,
          description: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create notebook");
      }

      setName("");
      onCreated?.();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Create Notebook</DialogTitle>
        </DialogHeader>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter notebook name..."
          className="mt-4 w-full rounded-md border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-slate-400"
        />

        <DialogFooter>
          <Button
            onClick={createNotebook}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}