"use client";

import { Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

export function ControlPanel(props: {
  params: Promise<{ prefetchStrategy: string; delay: string }>;
}) {
  const { prefetchStrategy: prefetchValue, delay: delayValue } = use(
    props.params
  );

  const router = useRouter();

  const prefetchOptions = [
    ["true", "false"],
    ["undefined", "hover"],
  ];
  const delayOptions = ["0", "2000", "10000"];

  const handlePrefetchClick = (value: string) => {
    const url = `/${delayValue || "0"}/${value}`;
    router.push(url);
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  const handleDelayClick = (value: string) => {
    const url = `/${value}/${prefetchValue || "undefined"}`;
    router.push(url);
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  return (
    <Sidebar side="left">
      <SidebarHeader className="border-b p-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <h2 className="font-medium">Prefetch Controls</h2>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4 space-y-8">
        <div>
          <div className="text-sm font-medium mb-2">Prefetch Strategy</div>
          <div className="grid grid-cols-2 gap-2">
            {prefetchOptions.flat().map((option) => (
              <Button
                key={option}
                variant={prefetchValue === option ? "default" : "outline"}
                className="w-full"
                onClick={() => handlePrefetchClick(option)}
                type="button"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-2">Delay</div>
          <div className="flex flex-col gap-2">
            {delayOptions.map((option) => (
              <Button
                key={option}
                variant={delayValue === option ? "default" : "outline"}
                className="w-full"
                onClick={() => handleDelayClick(option)}
                type="button"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <div className="text-xs text-muted-foreground text-center">
          Last freshed: --
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
