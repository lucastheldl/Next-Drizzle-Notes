import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const notesSchema = pgTable("notes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  body: varchar().notNull(),
  color: varchar({ length: 50 }).notNull().default("White"),
});
