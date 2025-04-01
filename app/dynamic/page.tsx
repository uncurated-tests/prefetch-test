import { Suspense } from 'react'
import { getDelayedData } from '../actions'

export default function DynamicPage({
  searchParams,
}: {
  searchParams: Promise<{ delay?: string }>
}) {

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dynamic Page with Loading </h1>
      <p className="text-muted-foreground">
        This file has a static shell but dynamic content.
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <DelayedLoad searchParams={searchParams} />
      </Suspense>
    </div>
  )
} 


const DelayedLoad  = async ({
  searchParams,
}: {
  searchParams: Promise<{ delay?: string }>
}) => {
  const params = await searchParams
  const delay = Number(params.delay) || 0
  const data = await getDelayedData(delay)

  return (
    <div>
      Fetched at: {data.timestamp}
      <p className="text-sm">
        Message: {data.message}
      </p>
    </div>
  )
}
