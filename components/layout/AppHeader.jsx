"use client";

import { Search, Moon, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  return (
    //<header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Manage your AI notebooks and knowledge sources
        </p>
      </div>

      <div className="flex items-center gap-2">

        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <Moon className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>

      </div>

    </header>
  );
}