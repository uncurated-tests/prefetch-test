"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { PrefetchLink } from "@/components/prefetch-link";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const delayValue = Number(searchParams.get("delay")) || 0;
  const prefetchValue = searchParams.get("prefetch") || "undefined";

  const renderLink = (href: string, children: React.ReactNode) => {
    // Add query parameters to the href
    const params = new URLSearchParams();

    // Only add prefetch parameter if it's not "undefined"
    if (prefetchValue != "undefined") {
      params.set("prefetch", prefetchValue || "");
    }

    // Add delay parameter if it exists
    if (delayValue) {
      params.set("delay", delayValue.toString());
    }

    // Construct the final URL with parameters
    const finalHref = params.toString()
      ? `${href}${href.includes("?") ? "&" : "?"}${params.toString()}`
      : href;

    if (prefetchValue === "hover") {
      return (
        <PrefetchLink href={finalHref} delay={delayValue}>
          {children}
        </PrefetchLink>
      );
    }

    return (
      <Link
        href={finalHref}
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
    <div className="flex h-full w-full flex-col">
      <header className="border-b p-4">
        <h1 className="text-xl font-semibold">Prefetch Demo</h1>
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
                <h3 className="font-medium mb-2">Dynamic Page with Suspense</h3>
                {renderLink("/dynamic", "Dynamic Page (fetches data)")}
              </div>

              <div>
                <h3 className="font-medium mb-2">
                  Dynamic Page with loading.tsx
                </h3>
                {renderLink(
                  "/dynamic-with-loading",
                  "Dynamic Page with Loading State"
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Dynamic PPR Page</h3>
                {renderLink("/dynamic-ppr", "Dynamic Page with PPR")}
              </div>
              <div>
                <h3 className="font-medium mb-2">Sleep Page</h3>
                {renderLink("/sleep", "Sleep Page")}
              </div>
              <div>
                <h3 className="font-medium mb-2">Sleep with Shell</h3>
                {renderLink("/sleep-with-shell", "Sleep with Static Shell")}
              </div>
              <div>
                <h3 className="font-medium mb-2">Sequential Navigation</h3>
                {renderLink("/slug/1", "Start Sequential Navigation")}
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
  );
}
