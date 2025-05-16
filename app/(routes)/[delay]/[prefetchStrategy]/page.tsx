import Link from "next/link";

import { PrefetchLink } from "@/components/prefetch-link";

export const experimental_ppr = true;

export default async function Home(props: {
  params: Promise<{ prefetchStrategy: string; delay: string }>;
}) {
  const params = await props.params;

  const delayValue = Number(params.delay) || 0;
  const prefetchValue = params.prefetchStrategy || "undefined";

  const renderLink = (href: string, children: React.ReactNode) => {
    const finalHref = `/${delayValue}/${prefetchValue}${href}`;
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
        <h1 className="text-xl font-semibold">Next Prefetch Playground</h1>
        <h2 className="text-sm text-gray-500 mt-2">
          This is a playground for understanding how different prefetching
          strategies work given different delays in Next.js.
        </h2>
        {/* <h2 className="text-xs text-gray-500 mt-2">
          Next.js was designed to enable instant transitions when clicking
          around via soft navigations, without full page refreshes. This{" "}
          <b>prefetching</b> playground allows you to understand how prefetching
          works, and how it interacts with server-side data fetching.
        </h2> */}
      </header>
      <main className="flex-1 p-6">
        <div className="space-y-8">
          <div className="rounded-lg border p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Static</h3>
                {renderLink("/static", "Static Page (renders immediately)")}
                <div>
                  {renderLink(
                    "/static-with-client-fetch",
                    "Static Page with Client Fetch (renders immediately)"
                  )}
                </div>
              </div>
              <div>
                <h3 className={"font-medium mb-2"}>Dynamic </h3>
                <div>
                  {renderLink("/dynamic", "Dynamic Page (fetches data)")}
                </div>
                <div>
                  {renderLink(
                    "/dynamic-with-loading",
                    "Dynamic Page with Loading State"
                  )}
                </div>
                <div>{renderLink("/dynamic-ppr", "Dynamic Page with PPR")}</div>
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
