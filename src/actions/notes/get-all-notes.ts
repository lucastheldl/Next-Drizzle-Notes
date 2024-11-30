"use server";
import { notesSchema } from "@/server/db/schema";
import {eq} from "drizzle-orm"

import { db } from "@/server/db";

export const getAllNotes = async () => {
    try {
        const notes = await db.select().from(notesSchema).where(eq(notesSchema.authorId, "1"));
    
        return {success:true, notes};
    } catch (error) {
        
      return {
        success: false,
        error: "Falha ao carregar notas",
      };
    }
};
