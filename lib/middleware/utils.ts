import { NextRequest } from "next/server";

export function parse(req: NextRequest) {
  const domain = req.headers.get("host") as string;

  // localhost:3000/about/me -> /about/me
  let path = req.nextUrl.pathname;

  return { domain, path };
}
