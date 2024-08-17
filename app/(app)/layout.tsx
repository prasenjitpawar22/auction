import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  dashboard,
  login,
}: {
  dashboard: ReactNode;
  login: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return login;

  return dashboard;
}
