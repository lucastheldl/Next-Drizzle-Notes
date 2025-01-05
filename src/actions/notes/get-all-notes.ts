"use server";
import { notesSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

const noteSchemaZod = z.object({
	userId: z.string(),
});

export const getAllNotes = actionClient
	.schema(noteSchemaZod)
	.action(async ({ parsedInput: { userId } }) => {
		try {
			const notes = await db
				.select()
				.from(notesSchema)
				.where(eq(notesSchema.authorId, userId));

			return { success: true, notes };
		} catch (error) {
			return {
				success: false,
				error: "Falha ao carregar notas",
			};
		}
	});
