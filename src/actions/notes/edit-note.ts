"use server";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/server/db";
import { notesSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

const noteSchemaZod = z.object({
	title: z.string().min(1).max(100),
	body: z.string(),
	color: z.enum(["white", "green", "blue", "red"]),
	noteId: z.string(),
});

export const editNote = actionClient
	.schema(noteSchemaZod)
	.action(async ({ parsedInput: { title, body, color, noteId } }) => {
		try {
			const res = await db
				.update(notesSchema)
				.set({ body: body, color: color, title: title })
				.where(eq(notesSchema.id, noteId))
				.returning();

			const id = res[0]?.id;

			revalidatePath("/");

			return { success: true, id: id };
		} catch (error) {
			return {
				success: false,
				error: "Falha ao editar nota",
			};
		}
	});
