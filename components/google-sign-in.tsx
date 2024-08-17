"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { Icon } from "./icons";
import { Role, RoleType } from "@/app/types";

export const GoogleSignIn = ({ role }: { role: RoleType }) => {
  const supabase = createClient();

  const handleSignIn = async () => {
    const redirectTo = new URL("/api/auth/callback", location.origin);

    redirectTo.searchParams.append("role", role);

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectTo.toString(),
        queryParams: { role }, // role
      },
    });
  };

  return (
    <Button
      variant={"outline"}
      className="rounded-full inline-flex items-center gap-2"
      onClick={handleSignIn}
    >
      <Icon.Google /> Sign in with Google
    </Button>
  );
};
