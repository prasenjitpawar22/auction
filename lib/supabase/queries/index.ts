import { Client } from "../types";

export async function getUserQuery(supabase: Client, userId: string) {
    return supabase
        .from("profiles")
        .select("*")
        .single()
        .throwOnError()
}

export async function getBidsByUserIdQuery(suoabase: Client, userId: string) {
    return suoabase
        .from('bids')
        .select('*')
        .eq('user_id', userId)
        .throwOnError()
}