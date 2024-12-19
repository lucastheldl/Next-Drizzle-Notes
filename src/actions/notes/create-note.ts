"use server";

import { db } from "@/server/db";
import { notesSchema } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createNote = async (userId: string) => {
	try {
		const note: typeof notesSchema.$inferInsert = {
			title: "Nova nota",
			body: "",
			color: "white",
			authorId: userId,
		};
		const res = await db.insert(notesSchema).values(note).returning();

		const id = res[0]?.id;

		revalidatePath("/");

		return { success: true, id: id };
	} catch (error) {
		return {
			success: false,
			error: "Falha ao criar notas",
		};
	}
};
