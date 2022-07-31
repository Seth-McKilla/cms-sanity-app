import { NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/([^/.]*)", "/home/posts/[slug]"],
};

export default function middleware(req) {
  const isProduction =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1";

  const url = req.nextUrl;

  const hostname = req.headers.get("host");

  const currentHost = hostname.replace(
    isProduction ? ".vercel.app" : ".localhost:3000",
    ""
  );

  if (currentHost === "app") {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (["localhost:3000"].includes(hostname)) {
    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}
