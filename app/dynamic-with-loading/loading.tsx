export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-muted p-4">
        <div className="space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted-foreground/20" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  )
} 