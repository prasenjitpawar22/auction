import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const role = searchParams.get("role");

  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("") ?? "/";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // if (error) return NextResponse.redirect('/')
    // console.log(error, 'error');

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // if no metadata - user role.
      if (!user?.user_metadata?.role) {
        await supabase.auth.updateUser({ data: { role } });
        // await supabase.from("")
      }
      // already a user with a different role!
      else if (user.user_metadata.role !== role) {
        // remove cookies
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/auth/auth-role-error`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
