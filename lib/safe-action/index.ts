import {
    createSafeActionClient,
    DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";
import { createClient } from "../supabase/server";

class ActionError extends Error { }

// Base client.
const actionClient = createSafeActionClient({
    handleReturnedServerError(e) {
        if (e instanceof ActionError) {
            return e.message;
        }

        return DEFAULT_SERVER_ERROR_MESSAGE;
    },
    defineMetadataSchema() {
        return z.object({
            actionName: z.string(),
        });
    },
    // Define logging middleware.
}).use(async ({ next, clientInput, metadata }) => {
    console.log("LOGGING MIDDLEWARE");

    // Here we await the action execution.
    const result = await next();

    console.log("Result ->", result);
    console.log("Client input ->", clientInput);
    console.log("Metadata ->", metadata);

    // And then return the result of the awaited action.
    return result;
});

// Auth client defined by extending the base one.
// Note that the same initialization options and middleware functions of the base client
// will also be used for this one.
export const authActionClient = actionClient
    // Define authorization middleware.
    .use(async ({ next }) => {
        const supabase = createClient()
        const auth = await supabase.auth.getUser()

        if (!auth) {
            throw new Error("Unauthoried!!");
        }

        // Return the next middleware with `userId` value in the context
        return next({ ctx: { user: auth.data.user, supabase } });
    });