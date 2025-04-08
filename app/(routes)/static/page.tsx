export default function StaticPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Static Page</h1>
      <p className="text-muted-foreground">
        This is a static page that renders immediately without any data fetching.
      </p>
      <div className="rounded-lg bg-muted p-4">
        <p className="text-sm">
          Rendered at: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
} 