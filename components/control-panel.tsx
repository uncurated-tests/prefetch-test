"use client";

import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ControlPanelProps {
  prefetchValue: string | null;
  setPrefetchValue: (value: string) => void;
  delayValue: string;
  setDelayValue: (value: string) => void;
  onApply: () => void;
}

export function ControlPanel({
  prefetchValue,
  setPrefetchValue,
  delayValue,
  setDelayValue,
  onApply,
}: ControlPanelProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const url = `/${params.toString() ? `?${params.toString()}` : ""}`;

  // Use the time when the component mounts as the last fetched time
  const [lastFetched] = useState<number>(() => Date.now());
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastFetched) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [lastFetched]);

  return (
    <Sidebar side="left">
      <SidebarHeader className="border-b p-4">
        <Link href={url}>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <h2 className="font-medium">Prefetch Controls</h2>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Prefetch</Label>
            <RadioGroup
              value={prefetchValue || "undefined"}
              onValueChange={setPrefetchValue}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="prefetch-true" />
                <Label htmlFor="prefetch-true" className="cursor-pointer">
                  true
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="prefetch-false" />
                <Label htmlFor="prefetch-false" className="cursor-pointer">
                  false
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="undefined" id="prefetch-undefined" />
                <Label htmlFor="prefetch-undefined" className="cursor-pointer">
                  undefined
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hover" id="prefetch-hover" />
                <Label htmlFor="prefetch-hover" className="cursor-pointer">
                  on hover
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label htmlFor="delay" className="text-sm font-medium">
              Delay in MS
            </Label>
            <Input
              id="delay"
              type="number"
              min="0"
              value={delayValue}
              onChange={(e) => setDelayValue(e.target.value)}
              placeholder="Enter delay in milliseconds"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 text-center">
          <Button onClick={onApply} className="w-full">
            Apply Settings
          </Button>
          <div className="text-xs text-muted-foreground">
            Press apply settings to reload the page with the new settings.
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <div className="text-xs text-muted-foreground text-center">
          Last freshed: {secondsAgo}s ago
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
