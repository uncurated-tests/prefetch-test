import LayoutShell from "./layout-shell";

export function generateStaticParams() {
  return [
    { prefetchStrategy: "true" },
    { prefetchStrategy: "false" },
    { prefetchStrategy: "hover" },
    { prefetchStrategy: "undefined" },
  ];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      <LayoutShell />
      {children}
    </div>
  );
}
