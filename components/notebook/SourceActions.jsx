"use client";

import { Button } from "@/components/ui/button";
import {
  Upload,
  Globe,
  Play,
  FileText,
} from "lucide-react";

export default function SourceActions() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">
        Add Knowledge Sources
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <Button
          variant="outline"
          className="h-28 flex-col gap-3"
        >
          <Upload className="h-7 w-7" />
          Upload PDF
        </Button>

        <Button
          variant="outline"
          className="h-28 flex-col gap-3"
        >
          <Globe className="h-7 w-7" />
          Website
        </Button>

        <Button
          variant="outline"
          className="h-28 flex-col gap-3"
        >
          <Play className="h-7 w-7" />
          YouTube
        </Button>

        <Button
          variant="outline"
          className="h-28 flex-col gap-3"
        >
          <FileText className="h-7 w-7" />
          Transcript
        </Button>

      </div>
    </div>
  );
}