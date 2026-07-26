"use client";
import NotebookChat from "./NotebookChat";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import EditNotebookDialog from "./EditNotebookDialog";
import { Button } from "@/components/ui/button";
import { useNotebook } from "@/context/NotebookContext";
import SourceActions from "./SourceActions";
import SourceList from "./SourceList";
import AddSourceDialog from "./AddSourceDialog";

export default function NotebookWorkspace() {
  const { selectedNotebook, setSelectedNotebook } = useNotebook();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  if (!selectedNotebook) return null;

  async function handleDeleteNotebook() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${selectedNotebook.title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/notebooks/${selectedNotebook.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete notebook");
      }

      setSelectedNotebook(null);

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete notebook.");
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-white px-8 py-6">
        <h1 className="text-3xl font-bold">
          {selectedNotebook.title}
        </h1>

        <p className="mt-2 text-slate-500">
          {selectedNotebook.description || "No description"}
        </p>

        <div className="mt-6 flex gap-3">
          <Button 
            variant="outline"
            onClick={() => setEditDialogOpen(true)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Rename Notebook
          </Button>

          <Button
            variant="destructive"
            onClick={handleDeleteNotebook}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Notebook
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 p-8">
        <SourceActions
          onAddSource={() => setDialogOpen(true)}
        />

        <SourceList />
        <NotebookChat />
        
        <AddSourceDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
        <EditNotebookDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          notebook={selectedNotebook}
          onUpdated={(updatedNotebook) => {
            setSelectedNotebook(updatedNotebook);
          }}
        />
      </div>
    </div>
  );
}