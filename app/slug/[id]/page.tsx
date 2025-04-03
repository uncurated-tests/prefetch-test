import { Suspense } from 'react'
import Link from 'next/link'
import { PrefetchLink } from '@/components/prefetch-link'
import { getDelayedData } from '@/app/actions'

export const experimental_ppr = true

export default async function SlugPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: Promise<{ prefetch?: string; delay?: string }>
}) {
  const p = await searchParams
  const currentId = parseInt(params.id)
  const nextId = currentId + 1
  const delay = Number(p.delay) || 0

  const data = await getDelayedData(delay)  
  const renderLink = (href: string, children: React.ReactNode) => {
    if (p.prefetch === "hover") {
      return (
        <PrefetchLink href={href} delay={delay}>
          {children}
        </PrefetchLink>
      )
    }

    return (
      <Link
        href={href}
        prefetch={
            p.prefetch === "true"
            ? true
            : p.prefetch === "false"
            ? false
            : undefined
        }
        className="text-blue-500 hover:underline"
      >
        {children}
      </Link>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Slug Page {currentId}</h1>
      <p className="text-muted-foreground">
        This is a dynamic page with sequential navigation.
      </p>
      <div className="rounded-lg border p-4">
        <p className="text-sm">Current ID: {currentId}</p>
        <div className="mt-4">
          {renderLink(
            `/slug/${nextId}?prefetch=${p.prefetch || 'undefined'}&delay=${delay}`,
            `Go to page ${nextId}`
          )}
        </div>
      </div>
    </div>
  )
} 