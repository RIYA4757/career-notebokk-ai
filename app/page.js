
"use client";
import AppLayout from "@/components/layout/AppLayout";
import Sidebar from "@/components/notebook/Sidebar";
import Welcome from "@/components/common/Welcome";
import NotebookWorkspace from "@/components/notebook/NotebookWorkspace";
import { useNotebook } from "@/context/NotebookContext";

function HomeContent() {
  const { selectedNotebook } = useNotebook();

  return (
    <AppLayout sidebar={<Sidebar />}>
      {selectedNotebook ? (
        <NotebookWorkspace />
      ) : (
        <Welcome />
      )}
    </AppLayout>
  );
}

export default function Home() {
  return <HomeContent />;
}