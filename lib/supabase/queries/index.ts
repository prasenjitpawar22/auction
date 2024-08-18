import { Client } from "../types";

export async function getUserQuery(supabase: Client, userId: string) {
    return supabase
        .from("profiles")
        .select("*")
        .single()
        .throwOnError()
}
