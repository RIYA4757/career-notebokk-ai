import AppLayout from "@/components/layout/AppLayout";
import Sidebar from "@/components/notebook/Sidebar";
import Welcome from "@/components/common/Welcome";

export default function Home() {
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Welcome />
    </AppLayout>
  );
}