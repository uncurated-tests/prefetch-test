"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { ControlPanel } from "@/components/control-panel";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PrefetchLink } from "@/components/prefetch-link";

export default function Home() {
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
    router.push(newUrl);
  };

  const delay = Number(delayValue) || 0;

  const renderLink = (href: string, children: React.ReactNode) => {
    if (prefetchValue === "hover") {
      return (
        <PrefetchLink href={href} delay={delay}>
          {children}
        </PrefetchLink>
      );
    }

    return (
      <Link
        href={href}
        prefetch={
          prefetchValue === "true"
            ? true
            : prefetchValue === "false"
            ? false
            : undefined
        }
        className="text-blue-500 hover:underline"
      >
        {children}
      </Link>
    );
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
        <div className="flex h-full w-full flex-col">
          <header className="border-b p-4">
            <h1 className="text-xl font-semibold">Control Panel Demo</h1>
          </header>
          <main className="flex-1 p-6">
            <div className="space-y-8">
              <div className="rounded-lg border p-6">
                <h2 className="text-lg font-medium mb-4">Test Pages</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Static Page</h3>
                    {renderLink("/static", "Static Page (renders immediately)")}
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">
                      Dynamic Page with Suspense
                    </h3>
                    {renderLink(
                      `/dynamic?delay=${delayValue}`,
                      "Dynamic Page (fetches data)"
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">
                      Dynamic Page with loading.tsx
                    </h3>
                    {renderLink(
                      `/dynamic-with-loading?delay=${delayValue}`,
                      "Dynamic Page with Loading State"
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Dynamic PPR Page</h3>
                    {renderLink(
                      `/dynamic-ppr?delay=${delayValue}`,
                      "Dynamic Page with PPR"
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Sleep Page</h3>
                    {renderLink(`/sleep?ms=${delayValue}`, "Sleep Page")}
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Sleep with Shell</h3>
                    {renderLink(
                      `/sleep-with-shell?ms=${delayValue}`,
                      "Sleep with Static Shell"
                    )}
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-dashed p-6">
                <h2 className="text-lg font-medium">Current Settings</h2>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <strong>Prefetch:</strong> {prefetchValue}
                  </p>
                  <p>
                    <strong>Delay:</strong> {delayValue} ms
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
