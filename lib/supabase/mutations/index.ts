import { Client } from "../types";

type CreateBid = {
    title: string;
    userId: string;
};

export async function createBid(supabase: Client, params: CreateBid) {
    const bid = await supabase.from("bids")
        .insert({ title: params.title, user_id: params.userId })
        .select()
        .single()

    return bid;
}

type CreateBidItem = { name: string, description: string, bid_id: number }
type CreateBidItems = CreateBidItem[]

export async function createBidItems(supabase: Client, params: CreateBidItems) {
    const bidItems = await supabase.from("bid_items")
        .insert(params)
        .select()

    return bidItems
}