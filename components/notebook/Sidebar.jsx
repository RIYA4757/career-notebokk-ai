"use client";

import { useState } from "react";

import SidebarHeader from "@/components/sidebar/SidebarHeader";
import NotebookList from "@/components/sidebar/NotebookList";
import SidebarFooter from "@/components/sidebar/SidebarFooter";
import CreateNotebookDialog from "@/components/notebook/CreateNotebookDialog";

export default function Sidebar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleNotebookCreated() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <>
      <div className="flex h-full flex-col bg-white">
        <SidebarHeader onNewNotebook={() => setDialogOpen(true)} />

        <div className="flex-1 px-4 py-5">
          <NotebookList refreshKey={refreshKey} />
        </div>

        <SidebarFooter />
      </div>

      <CreateNotebookDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={handleNotebookCreated}
      />
    </>
  );
}