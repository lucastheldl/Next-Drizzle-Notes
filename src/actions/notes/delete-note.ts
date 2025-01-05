"use server";
import { notesSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

const noteSchemaZod = z.object({
	id: z.string(),
});

export const deleteNote = actionClient
	.schema(noteSchemaZod)
	.action(async ({ parsedInput: { id } }) => {
		try {
			await db.delete(notesSchema).where(eq(notesSchema.id, id));
			revalidatePath("/");
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: "Falha ao deletar nota",
			};
		}
	});
