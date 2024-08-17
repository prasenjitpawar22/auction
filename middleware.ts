import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { parse } from "@/lib/middleware/utils";

export async function middleware(request: NextRequest) {
  const { path } = parse(request);
  const { supabase } = await updateSession(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // rewrite the url to role based path.
  if (user) {
    let role = user?.user_metadata?.role ?? "";
    return NextResponse.rewrite(new URL(`/${role}${path}`, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
