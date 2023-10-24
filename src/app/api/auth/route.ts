import type { NextRequest } from "next/server";

export const runtime = "edge";
export async function GET(request: NextRequest) {
  return new Response("Basic Auth Required.", {
    status: 401,
    headers: { "WWW-authenticate": 'Basic realm="Secure Area"' },
  });
}
