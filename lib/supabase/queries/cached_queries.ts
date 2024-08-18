import { cache } from "react";
import { createClient } from "../server";
import { unstable_cache } from "next/cache";
import { getUserQuery } from ".";

export const getSession = cache(async () => {
    const supabase = createClient();

    return supabase.auth.getSession();
});

export const getUser = async () => {
    const {
        data: { session },
    } = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
        return null;
    }

    const supabase = createClient();

    const getCachedUser = unstable_cache(
        async () => {
            return getUserQuery(supabase, userId);
        },
        ["user", userId],
        {
            tags: [`user_${userId}`],
            revalidate: 180,
        },
    );

    return getCachedUser;
};