import { SidebarProvider } from "@/components/ui/sidebar";
import { ControlPanel } from "@/components/control-panel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function LayoutShell() {
  return (
    <SidebarProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <ControlPanel />
      </Suspense>
    </SidebarProvider>
  );
}
