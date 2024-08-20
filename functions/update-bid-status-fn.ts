import { createClient } from "@supabase/supabase-js";

export const handler = async ({ bid }: any) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    const supabase = createClient(supabaseUrl, supabaseKey);

    // ?? also can user validation here....
    // Perform database operations
    await supabase
        .from('bids')
        .update({ title: 'neww' })
        .eq('id', bid.data.id)
}