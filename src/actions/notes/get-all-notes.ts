"use server";
import { notesSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import { db } from "@/server/db";

export const getAllNotes = async (userId) => {
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
};
