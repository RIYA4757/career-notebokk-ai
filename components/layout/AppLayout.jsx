"use client";

import { useSidebar } from "@/context/SidebarContext";

export default function AppLayout({ sidebar, children }) {
  const { collapsed } = useSidebar();

  return (
    <div className="flex h-screen bg-slate-50">
      <aside
        className={`bg-white border-r transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        {sidebar}
      </aside>

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}