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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function ControlPanel() {
  const searchParams = useSearchParams();
  const prefetchValue = searchParams.get("prefetch") || "undefined";
  const delayValue = searchParams.get("delay") || "0";

  const router = useRouter();

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
      <SidebarContent className="p-4">
        <form
          action={(formData) => {
            // Build URL and redirect
            const params = new URLSearchParams();
            const prefetch = formData.get("prefetch");
            const delay = formData.get("delay");
            if (prefetch && prefetch !== "undefined")
              params.set("prefetch", prefetch as string);
            if (delay && delay !== "0") params.set("delay", delay as string);
            const url = `/${params.toString() ? `?${params.toString()}` : ""}`;

            router.push(url);
            if (typeof window !== "undefined") {
              window.location.href = url;
            }
          }}
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Prefetch</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="prefetch"
                    value="true"
                    id="prefetch-true"
                    defaultChecked={prefetchValue === "true"}
                  />
                  <Label htmlFor="prefetch-true" className="cursor-pointer">
                    true
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="prefetch"
                    value="false"
                    id="prefetch-false"
                    defaultChecked={prefetchValue === "false"}
                  />
                  <Label htmlFor="prefetch-false" className="cursor-pointer">
                    false
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="prefetch"
                    value="undefined"
                    id="prefetch-undefined"
                    defaultChecked={
                      prefetchValue === "undefined" || !prefetchValue
                    }
                  />
                  <Label
                    htmlFor="prefetch-undefined"
                    className="cursor-pointer"
                  >
                    undefined
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="prefetch"
                    value="hover"
                    id="prefetch-hover"
                    defaultChecked={prefetchValue === "hover"}
                  />
                  <Label htmlFor="prefetch-hover" className="cursor-pointer">
                    on hover
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label htmlFor="delay" className="text-sm font-medium">
                Delay in MS
              </Label>
              <Input
                id="delay"
                name="delay"
                type="number"
                min="0"
                defaultValue={delayValue}
                placeholder="Enter delay in milliseconds"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 text-center">
            <Button type="submit" className="w-full">
              Apply Settings
            </Button>
            <div className="text-xs text-muted-foreground">
              Press apply settings to reload the page with the new settings.
            </div>
          </div>
        </form>
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
