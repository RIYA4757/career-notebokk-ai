"use client";

import {
  PanelLeft,
  Plus,
  NotebookPen,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <div className="flex h-full flex-col bg-white">

      {/* Header */}
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
              {/* <span className="rounded bg-slate-200 px-2 py-1 text-xs">
                v1.0
              </span> */}
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
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              New Notebook
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="mx-auto flex"
            >
              <Plus className="h-5 w-5" />
            </Button>
          )}

        </div>

      </div>

      {/* Notebook Section */}

      <div className="flex-1 px-4 py-5">

        {!collapsed && (
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            My Notebooks
          </h2>
        )}

        <button
          className="mb-2 flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors  transition-all duration-200 hover:bg-slate-100 hover:shadow-sm"
        >
          <NotebookPen className="h-5 w-5 text-slate-600" />

          {!collapsed && (
            <div className="rounded-xl border bg-slate-50 p-5 shadow-sm">
              <NotebookPen className="mb-3 h-8 w-8 text-slate-400" />
              <h3 className="font-semibold text-slate-700">
                  No notebooks yet
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Create your first notebook to start organizing documents and chatting with AI.
              </p>
            </div>
          )}
        </button>

      </div>

      {/* Footer */}
{/* Footer */}
<div className="border-t border-slate-200 p-4">

  <button className="mb-2 flex w-full items-center gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-slate-100 hover:shadow-sm">

    <Settings className="h-5 w-5" />

    {!collapsed && (
      <span className="font-medium text-slate-700">
        Settings
      </span>
    )}

  </button>

  <button className="flex w-full items-center gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-slate-100 hover:shadow-sm">

    <User className="h-5 w-5" />

    {!collapsed && (
      <span className="font-medium text-slate-700">
        Profile
      </span>
    )}

  </button>

</div>

    </div>
  );
}