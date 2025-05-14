import LayoutShell from "./layout-shell";

export function generateStaticParams() {
  return [
    { prefetchStrategy: "true" },
    { prefetchStrategy: "false" },
    { prefetchStrategy: "hover" },
    { prefetchStrategy: "undefined" },
  ];
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ prefetchStrategy: string; delay: string }>;
}) {
  return (
    <div className="flex flex-row">
      <LayoutShell params={params} />
      {children}
    </div>
  );
}
