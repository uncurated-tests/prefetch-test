import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ delay: string }> }
) {
  const { delay } = await params;
  const delayValue = Number(delay) || 0;

  // Ensure delay is between 0 and 10000ms
  const safeDelay = Math.min(Math.max(0, delayValue), 10000);

  await new Promise((resolve) => setTimeout(resolve, safeDelay));

  return NextResponse.json({
    message: `Response delayed by ${safeDelay}ms`,
    timestamp: new Date().toISOString(),
  });
}
