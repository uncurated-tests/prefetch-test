"use client";

import { ExternalLink, Settings, Info } from "lucide-react";

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
import { use, useEffect, useState, useRef } from "react";

export function ControlPanel(props: {
  params: Promise<{ prefetchStrategy: string; delay: string }>;
}) {
  const { prefetchStrategy: prefetchValue, delay: delayValue } = use(
    props.params
  );

  const router = useRouter();

  const [secondsSinceRefresh, setSecondsSinceRefresh] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSecondsSinceRefresh(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsSinceRefresh((s) => s + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
        <Link href={`/${delayValue || "0"}/${prefetchValue || "undefined"}`}>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <h2 className="font-medium text-lg">Prefetch Controls</h2>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4 space-y-8">
        <div>
          <div className="text-sm font-medium mb-2">
            <a
              href="https://nextjs.org/docs/app/api-reference/components/link#prefetch"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1"
            >
              Prefetch strategy
              <Info className="h-4 w-4" />
            </a>
          </div>
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
          <div className="text-sm font-medium mb-2">Delay (in ms)</div>
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
          Last refreshed: {secondsSinceRefresh}s ago
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
