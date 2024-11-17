"use server";
import { actionClient } from "@/lib/safe-action";
import z from "zod";

const noteSchema = z.object({
  title: z.string().min(1).max(100),
  body: z.string(),
  color: z.string(),
  authorId: z.string(),
});

export const createNote = actionClient
  .schema(noteSchema)
  .action(async ({ parsedInput: { title, body, color, authorId } }) => {
    return { failure: "Incorrect credentials" };
  });
