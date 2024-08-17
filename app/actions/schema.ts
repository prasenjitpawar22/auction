import { z } from "zod";

export const createBidSchema = z
  .object({
    title: z.string().min(1, { message: "title is required" }).max(200),
    startDateTime: z.date(),
    endDateTime: z.date(),
    items: z
      .object({
        name: z.string().min(1, { message: "name is required" }).max(200),
        description: z
          .string()
          .min(1, { message: "description is required" })
          .max(200),
      })
      .array(),
  })
  .refine((data) => data.startDateTime < data.endDateTime, {
    message: "Start Date must be less than End Date",
    path: ["startDateTime"],
  });
