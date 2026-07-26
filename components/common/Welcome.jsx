"use client";

import AppHeader from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import {
  Plus,
  NotebookPen,
  Sparkles,
} from "lucide-react";

export default function Welcome({ onNewNotebook }) {
  return (
    <div className="flex h-full flex-col">
      <AppHeader />

      <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-8 md:px-8">
        <div className="w-full max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 md:mb-8 md:h-28 md:w-28">
            <NotebookPen className="h-10 w-10 text-slate-700 md:h-12 md:w-12" />
          </div>

          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Welcome to Career Notebook AI
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Build AI-powered notebooks from PDFs, websites, YouTube videos and
            transcripts.
          </p>

          <div className="mt-8">
            <Button
              size="lg"
              onClick={onNewNotebook}
              className="w-full sm:w-auto"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Notebook
            </Button>

            {/*
            Uncomment when Learn More has an actual destination.

            <Button
              variant="outline"
              size="lg"
              className="mt-3 w-full sm:mt-0 sm:ml-4 sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Learn More
            </Button>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}