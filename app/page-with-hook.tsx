"use client"

import { ControlPanel } from "@/components/control-panel"
import { useControlSettings } from "@/hooks/use-control-settings"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Home() {
  const { prefetchValue, setPrefetchValue, delayValue, setDelayValue, applySettings } = useControlSettings()

  return (
    <SidebarProvider>
      <ControlPanel
        prefetchValue={prefetchValue}
        setPrefetchValue={setPrefetchValue}
        delayValue={delayValue}
        setDelayValue={setDelayValue}
        onApply={applySettings}
      />
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="border-b p-4">
            <h1 className="text-xl font-semibold">Control Panel Demo</h1>
          </header>
          <main className="flex-1 p-6">
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h2 className="text-lg font-medium">Main Content Area</h2>
              <p className="mt-2 text-muted-foreground">Current settings:</p>
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <strong>Prefetch:</strong> {prefetchValue}
                </p>
                <p>
                  <strong>Delay:</strong> {delayValue} ms
                </p>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

