export function generateStaticParams() {
  return [{ delay: "0" }, { delay: "1000" }, { delay: "100000" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
