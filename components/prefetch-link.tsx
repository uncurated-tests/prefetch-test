"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PrefetchLinkProps {
  href: string;
  children: React.ReactNode;
  delay: number;
}

export function PrefetchLink({ href, children, delay }: PrefetchLinkProps) {
  const router = useRouter();
  const [isPrefetched, setIsPrefetched] = useState(false);

  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={() => {
        router.prefetch(href);

        setTimeout(() => {
          setIsPrefetched(true);
        }, delay);
      }}
      className={`hover:underline ${
        isPrefetched ? "text-green-600" : "text-blue-500"
      }`}
    >
      {children}
    </Link>
  );
}
