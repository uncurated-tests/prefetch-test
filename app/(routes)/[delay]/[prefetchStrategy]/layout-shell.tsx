import { SidebarProvider } from "@/components/ui/sidebar";
import { ControlPanel } from "@/components/control-panel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LayoutShell({
  params,
}: {
  params: Promise<{ prefetchStrategy: string; delay: string }>;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <ControlPanel params={params} />
      </Suspense>
    </SidebarProvider>
  );
}
