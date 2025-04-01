'use server'

export async function getDelayedData(delay: number) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/delay?delay=${delay}`, {
    cache: 'no-store'
  })
  return res.json()
} 