import { Suspense } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function SleepComponent({ ms }: { ms: number }) {
  await sleep(ms);
  return <div>slept {ms}ms</div>;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ ms?: string }>;
}) {
  const params = await searchParams;
  const ms = params.ms ? Number.parseInt(params.ms) : 1000;
  return (
    <div className="space-y-4">
      This is a static part
      <Suspense fallback={<div>Loading...</div>}>
        <SleepComponent ms={ms} />
      </Suspense>
    </div>
  );
}
