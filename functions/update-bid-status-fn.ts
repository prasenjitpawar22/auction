import { Database } from "@/lib/supabase/types";
import { createServerClient } from "@supabase/ssr";

export const handler = async ({ bid, cookies, status }: any) => {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const supabase = createServerClient<Database>(supabaseUrl!, supabaseKey!, {
        cookies: {
            getAll() {
                return cookies;
            },
        },
    });

    await supabase
        .from('bids')
        .update({ status })
        .eq('id', bid.data.id)
}
