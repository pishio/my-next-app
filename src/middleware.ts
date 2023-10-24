interface ENV {
  BASIC_AUTH_IS_ENABLED: string;
  BASIC_AUTH_USERNAME: string;
  BASIC_AUTH_PASSWORD: string;
}
import { NextRequest, NextResponse } from "next/server";

const unauthorizedResponse = function (body: string) {
  return new Response(body, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="User Visible Realm"',
    },
  });
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (process.env.BASIC_AUTH_IS_ENABLED !== "1") {
    return NextResponse.next();
  }

  const authorization =
    req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authorization) return unauthorizedResponse("Unauthorized");

  if (authorization) {
    const authValue = authorization.split(" ")[1];
    const [user, pwd] = Buffer.from(authValue, "base64").toString().split(":");

    if (
      user === process.env.BASIC_AUTH_NAME &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    } else {
      return unauthorizedResponse("Unauthorized");
    }
  }
}
