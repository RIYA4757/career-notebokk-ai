"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PdfUpload from "./SourceUpload";
import { useNotebook } from "@/context/NotebookContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { Input } from "@/components/ui/input";

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
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [websiteUrl, setWebsiteUrl] = useState("");
    async function uploadYoutube() {
  if (!youtubeUrl) return;

    try {
        setLoading(true);

        const response = await fetch("/api/sources/youtube", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: youtubeUrl,
            notebookId: selectedNotebook.id,
        }),
        });

        const data = await response.json();

        console.log(data);

        onUploadPdf?.(data.source);
        onOpenChange(false);
        setYoutubeUrl("");
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    }
          async function uploadWebsite() {
        if (!websiteUrl) return;

        try {
          setLoading(true);

          const response = await fetch("/api/sources/website", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: websiteUrl,
              notebookId: selectedNotebook.id,
            }),
          });

          const data = await response.json();

          onUploadPdf?.(data.source);
          onOpenChange(false);
          setWebsiteUrl("");
        } finally {
          setLoading(false);
        }
      }
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

          {/* <Button
            variant="outline"
            className="h-16 justify-start"
            disabled
          >
            <Globe className="mr-3 h-5 w-5" />
            Website (Coming Soon)
          </Button> */}
          <div className="space-y-2">
  <input
    type="text"
    placeholder="Paste Website URL"
    value={websiteUrl}
    onChange={(e) => setWebsiteUrl(e.target.value)}
    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
  />

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={uploadWebsite}
          disabled={loading}
        >
          <Globe className="mr-3 h-5 w-5" />
          {loading ? "Importing..." : "Import Website"}
        </Button>
      </div>

          {/* <Button
            variant="outline"
            className="h-16 justify-start"
            disabled
          >
            <Play className="mr-3 h-5 w-5" />
            YouTube (Coming Soon)
          </Button> */}
        <div className="space-y-2">
        <input
            type="text"
            placeholder="Paste YouTube URL"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
            />

        <Button
            variant="outline"
            className="w-full justify-start"
            onClick={uploadYoutube}
            disabled={loading}
        >
            <Play className="mr-3 h-5 w-5" />
            {loading ? "Importing..." : "Import YouTube"}
        </Button>
        </div>

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