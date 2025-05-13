import LayoutShell from "./layout-shell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      <LayoutShell />
      {children}
    </div>
  );
}
