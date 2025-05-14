import { Suspense } from "react";
import Link from "next/link";
import { PrefetchLink } from "@/components/prefetch-link";
import { getDelayedData } from "@/app/actions";

export const experimental_ppr = true;

export default async function SlugPage({
  params,
}: {
  params: Promise<{ id: string; prefetch?: string; delay?: string }>;
}) {
  const { id, prefetch, delay } = await params;
  const currentId = Number.parseInt(id);
  const nextId = currentId + 1;
  const delayValue = Number(delay) || 0;

  const data = await getDelayedData(delayValue);
  const renderLink = (href: string, children: React.ReactNode) => {
    if (prefetch === "hover") {
      return (
        <PrefetchLink href={href} delay={delayValue}>
          {children}
        </PrefetchLink>
      );
    }

    return (
      <Link
        href={href}
        prefetch={
          prefetch === "true" ? true : prefetch === "false" ? false : undefined
        }
        className="text-blue-500 hover:underline"
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Slug Page {currentId}</h1>
      <p className="text-muted-foreground">
        This is a dynamic page with sequential navigation.
      </p>
      <div className="rounded-lg border p-4">
        <p className="text-sm">Current ID: {currentId}</p>
        <div className="mt-4">
          {renderLink(
            `/${delay}/${prefetch}/slug/${nextId}`,
            `Go to page ${nextId}`
          )}
        </div>
      </div>
    </div>
  );
}
