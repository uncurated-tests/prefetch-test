"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function useControlSettings() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get initial values from URL params
  const [prefetchValue, setPrefetchValue] = useState<string | null>(searchParams.get("prefetch") || "undefined")
  const [delayValue, setDelayValue] = useState<string>(searchParams.get("delay") || "0")

  // Update state when URL params change
  useEffect(() => {
    setPrefetchValue(searchParams.get("prefetch") || "undefined")
    setDelayValue(searchParams.get("delay") || "0")
  }, [searchParams])

  // Function to update URL with form values
  const applySettings = () => {
    const params = new URLSearchParams()

    if (prefetchValue !== "undefined") {
      params.set("prefetch", prefetchValue || "")
    }

    if (delayValue && Number.parseInt(delayValue) > 0) {
      params.set("delay", delayValue)
    }

    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`
    router.push(newUrl)
  }

  return {
    prefetchValue,
    setPrefetchValue,
    delayValue,
    setDelayValue,
    applySettings,
  }
}

