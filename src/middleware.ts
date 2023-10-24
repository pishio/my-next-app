interface ENV {
  BASIC_AUTH_IS_ENABLED: string;
  BASIC_AUTH_USERNAME: string;
  BASIC_AUTH_PASSWORD: string;
}
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (process.env.BASIC_AUTH_IS_ENABLED !== "1") {
    return NextResponse.rewrite(url);
  }
  if (!url.pathname.startsWith("/")) return;

  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = Buffer.from(authValue, "base64").toString().split(":");

    if (
      user === process.env.BASIC_AUTH_NAME &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }
  }
  url.pathname = "/api/auth";

  return NextResponse.rewrite(url);
}
