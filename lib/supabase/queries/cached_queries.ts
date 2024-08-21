import { cache } from "react";
import { createClient } from "../server";
import { unstable_cache } from "next/cache";
import { getUserQuery } from ".";

export const getSession = cache(async () => {
    const supabase = createClient();

    return supabase.auth.getSession();
});

// no data in table. not valid
// implementation remaining... 
// TODO: 
export const getUser = async () => {
    const {
        data: { session },
    } = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
        return null;
    }

    const supabase = createClient();

    return unstable_cache(
        async () => {
            return getUserQuery(supabase, userId);
        },
        ["user", userId],
        {
            tags: [`user_${userId}`],
            revalidate: 180,
        },
    );
};
