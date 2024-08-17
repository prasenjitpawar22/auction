"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Router from "next/router";

export default function Singout() {
  const supabase = createClient();
  const { refresh } = useRouter();

  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        refresh();
      }}
    >
      Sign out
    </button>
  );
}
