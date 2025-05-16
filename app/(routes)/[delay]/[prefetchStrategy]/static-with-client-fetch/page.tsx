"use client";
import { use, useEffect, useState } from "react";

export const experimental_ppr = true;

export default function StaticPage({
  params,
}: {
  params: Promise<{ delay: string }>;
}) {
  const { delay } = use(params);

  const [time, setTime] = useState<string | null>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetch(`/api/${delay}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setTime(new Date().toString());
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Static Page</h1>
      <p className="text-muted-foreground">
        This is a static page that renders immediately without any data
        fetching.
      </p>
      <div className="rounded-lg bg-muted p-4">
        <p className="text-sm">Rendered at: {time}</p>
      </div>
    </div>
  );
}
