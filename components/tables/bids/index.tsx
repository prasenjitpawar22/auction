import { createClient } from "@/lib/supabase/server";
import { DataTable } from "./table";
import { getBidsByUserIdQuery } from "@/lib/supabase/queries";

export type Bid = {
  created_at: string;
  id: number;
  status: number;
  title: string;
  user_id: string;
}

export async function BidsTable() {


  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const bids = await getBidsByUserIdQuery(supabase, user?.id!)
  console.log(bids);

  return <DataTable data={bids.data as Bid[]} />;
}
