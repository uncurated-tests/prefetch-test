import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const delay = parseInt(searchParams.get('delay') || '0')
  
  // Ensure delay is between 0 and 10000ms
  const safeDelay = Math.min(Math.max(0, delay), 10000)
  
  await new Promise(resolve => setTimeout(resolve, safeDelay))
  
  return NextResponse.json({
    message: `Response delayed by ${safeDelay}ms`,
    timestamp: new Date().toISOString()
  })
} 