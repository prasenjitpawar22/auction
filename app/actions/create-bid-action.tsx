"use server";

import { createBid, createBidItems } from "@/lib/supabase/mutations/index";
import { authActionClient } from "@/lib/safe-action/index";
import { createBidSchema } from "./schema";

import { CreateScheduleCommand, ActionAfterCompletion } from '@aws-sdk/client-scheduler'
import { schedulerClient } from "@/lib/aws/scheduler/server";


export const createBidAdction = authActionClient
    .schema(createBidSchema)
    .metadata({
        actionName: "create-bid",
    })
    .action(async ({ parsedInput: { title, items, endDateTime, startDateTime }, ctx: { supabase, user } }) => {
        // could be a procedure...
        // disabled postgres rls for now...
        const userId = user?.id as string
        const bid = await createBid(supabase, { title, userId })

        if (bid.data?.id) {
            await createBidItems(supabase, items.map((item) => { return { ...item, bid_id: bid.data?.id } }));

            const cmd = new CreateScheduleCommand(
                {
                    Name: `update-bid-status${bid.data.id}`,
                    ScheduleExpression: `at(${(startDateTime.toISOString().substring(0, 19))})`,
                    Target: {
                        Arn: "arn:aws:lambda:us-east-1:581821871397:function:auction-abhi-atul-updatebidstatusFunction",
                        RoleArn: "arn:aws:iam::581821871397:role/auction-abhi-atul-updatebidstatusRole-useast1",
                        Input: JSON.stringify({ bid }),
                    },
                    FlexibleTimeWindow: { Mode: "OFF" },
                    ActionAfterCompletion: ActionAfterCompletion.DELETE,

                })

            await schedulerClient.send(cmd)
        }


        return bid;
    });
