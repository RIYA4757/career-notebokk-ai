import AppHeader from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import {
  Plus,
  NotebookPen,
  Sparkles,
} from "lucide-react";

export default function Welcome() {
  return (
    <div className="flex h-full flex-col">

      <AppHeader />

      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6">

        <div className="max-w-2xl text-center">

          <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-slate-200">
            <NotebookPen className="h-12 w-12 text-slate-700" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome to Career Notebook AI
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Build AI-powered notebooks from PDFs,
            websites, YouTube videos and transcripts.
          </p>

          <div className="mt-10 flex justify-center gap-4">

            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              New Notebook
            </Button>

            <Button
              variant="outline"
              size="lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Learn More
            </Button>

          </div>

        </div>

      </div>

    </div>
  );
}