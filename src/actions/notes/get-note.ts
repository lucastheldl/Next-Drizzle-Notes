"use server";
import { notesSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { z } from "zod";
import { actionClient } from "@/lib/safe-action";

const noteSchemaZod = z.object({
	id: z.string(),
});

export const getNote = actionClient
	.schema(noteSchemaZod)
	.action(async ({ parsedInput: { id } }) => {
		try {
			const note = await db.query.notesSchema.findFirst({
				where: eq(notesSchema.id, id),
			});

			return { success: true, note };
		} catch (error) {
			return {
				success: false,
				error: "Falha ao carregar nota",
			};
		}
	});
