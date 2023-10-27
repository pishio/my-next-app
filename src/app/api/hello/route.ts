export const runtime = "edge";

export async function GET(request: Request) {
  return new Response("Hello World!", {
    status: 200,
    headers: {
      "content-type": "text/plain",
    },
  });
}
