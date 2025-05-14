import { Suspense } from "react";
import { getDelayedData } from "../../../../actions";

export default function DynamicPage({
  params,
}: {
  params: Promise<{ delay: string; prefetchStrategy: string }>;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dynamic Page with Loading </h1>
      <p className="text-muted-foreground">
        This file has a static shell but dynamic content.
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <DelayedLoad params={params} />
      </Suspense>
    </div>
  );
}

const DelayedLoad = async ({
  params,
}: {
  params: Promise<{ delay: string; prefetchStrategy: string }>;
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
