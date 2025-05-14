import { getDelayedData } from "../../../../actions";

export default function DynamicWithLoadingPage({
  params,
}: {
  params: Promise<{ delay?: string }>;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dynamic Page with Loading </h1>
      <p className="text-muted-foreground">
        This page has a file-level loading.tsx that shows while data is being
        fetched.
      </p>
      <DelayedLoad params={params} />
    </div>
  );
}

const DelayedLoad = async ({
  params,
}: {
  params: Promise<{ delay?: string }>;
}) => {
  const { delay } = await params;
  const delayValue = Number(delay) || 0;
  const data = await getDelayedData(delayValue);

  return (
    <div>
      Fetched at: {data.timestamp}
      <p className="text-sm">Message: {data.message}</p>
    </div>
  );
};
