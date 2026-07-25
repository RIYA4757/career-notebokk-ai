"use client";

import { Settings, User } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

export default function SidebarFooter() {
  const { collapsed } = useSidebar();

  return (
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
  );
}