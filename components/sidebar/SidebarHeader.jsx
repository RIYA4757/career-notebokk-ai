"use client";

import { PanelLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";

export default function SidebarHeader({ onNewNotebook }) {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <div className="border-b border-slate-200 p-5">
      <div className="flex items-start justify-between">
        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Career Notebook AI
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              AI Knowledge Workspace
            </p>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-5">
        {!collapsed ? (
          <Button
            className="w-full"
            onClick={onNewNotebook}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Notebook
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="mx-auto flex"
            onClick={onNewNotebook}
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}