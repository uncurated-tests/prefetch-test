"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { ControlPanel } from "@/components/control-panel";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";


export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial values from URL params
  const [prefetchValue, setPrefetchValue] = useState<string | null>(
    searchParams.get("prefetch") || "undefined"
  );
  const [delayValue, setDelayValue] = useState<string>(
    searchParams.get("delay") || "0"
  );

  // Function to update URL with form values
  const handleApplySettings = () => {
    const params = new URLSearchParams();

    if (prefetchValue !== "undefined") {
      params.set("prefetch", prefetchValue || "");
    }

    if (delayValue && Number.parseInt(delayValue) > 0) {
      params.set("delay", delayValue);
    }

    const newUrl = `${window.location.pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    toast("Settings applied.", {
        position: "top-center",
        duration: 1000,
    })

    router.push(newUrl);
  };

  return (
    <SidebarProvider>
      <ControlPanel
        prefetchValue={prefetchValue}
        setPrefetchValue={setPrefetchValue}
        delayValue={delayValue}
        setDelayValue={setDelayValue}
        onApply={handleApplySettings}
      />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
