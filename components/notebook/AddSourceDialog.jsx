"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PdfUpload from "./PdfUpload";
import { useNotebook } from "@/context/NotebookContext";
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
    const { selectedNotebook } = useNotebook();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>Add Knowledge Source</DialogTitle>
        </DialogHeader>

        <div className="mt-4 grid gap-4">

          <PdfUpload
            notebookId={selectedNotebook.id}
            onUploaded={(source) => {
            console.log("Uploaded:", source);
            onUploadPdf?.(source);
           onOpenChange(false);}}
      >
        <Button
        variant="outline"
        className="h-16 w-full justify-start"
    >
        <Upload className="mr-3 h-5 w-5" />
         Upload PDF
        </Button>
      </PdfUpload>

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