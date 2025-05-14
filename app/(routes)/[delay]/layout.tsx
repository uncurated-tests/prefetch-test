export function generateStaticParams() {
  return [{ delay: "0" }, { delay: "2000" }, { delay: "10000" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
