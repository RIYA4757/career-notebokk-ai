"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SourceActions({ onAddSource }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          Knowledge Sources
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Upload documents, websites, videos and transcripts.
        </p>
      </div>

      <Button onClick={onAddSource}>
        <Plus className="mr-2 h-4 w-4" />
        Add Source
      </Button>
    </div>
  );
}