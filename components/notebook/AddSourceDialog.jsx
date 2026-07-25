"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Upload,
  Globe,
  Play,
  FileText,
} from "lucide-react";

export default function AddSourceDialog({
  open,
  onOpenChange,
  onUploadPdf,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>Add Knowledge Source</DialogTitle>
        </DialogHeader>

        <div className="mt-4 grid gap-4">

          <Button
            variant="outline"
            className="h-16 justify-start"
            onClick={onUploadPdf}
          >
            <Upload className="mr-3 h-5 w-5" />
            Upload PDF
          </Button>

          <Button
            variant="outline"
            className="h-16 justify-start"
            disabled
          >
            <Globe className="mr-3 h-5 w-5" />
            Website (Coming Soon)
          </Button>

          <Button
            variant="outline"
            className="h-16 justify-start"
            disabled
          >
            <Play className="mr-3 h-5 w-5" />
            YouTube (Coming Soon)
          </Button>

          <Button
            variant="outline"
            className="h-16 justify-start"
            disabled
          >
            <FileText className="mr-3 h-5 w-5" />
            Transcript (Coming Soon)
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}