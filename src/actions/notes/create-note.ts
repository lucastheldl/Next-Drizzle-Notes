"use server";

import { db } from "@/server/db";
import { notesSchema } from "@/server/db/schema";
import { revalidatePath } from "next/cache";


export const createNote = async (formData: FormData) => {

	try {
		const note:typeof notesSchema.$inferInsert={
			title:"Nova nota",
			body:"",
			color:"white",
			authorId:"1"
		}
		await db.insert(notesSchema).values(note);
		
		revalidatePath('/');
	} catch (error) {
		return {
			success: false,
			error: "Falha ao criar notas",
		  };
	}
};
