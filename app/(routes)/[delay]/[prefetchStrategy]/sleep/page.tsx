const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function SleepComponent({ ms }: { ms: number }) {
  await sleep(ms);
  return <div>slept {ms}ms</div>;
}

export default async function Page({
  params,
}: {
  params: Promise<{ ms?: string }>;
}) {
  const { ms } = await params;
  const msValue = ms ? Number.parseInt(ms) : 1000;
  return <SleepComponent ms={msValue} />;
}
