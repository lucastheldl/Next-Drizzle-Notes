import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersSchema } from "../users";

export const colorsEnum = pgEnum("colors", ["white", "red", "blue", "green"]);

export const notesSchema = pgTable("notes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  body: varchar().notNull(),
  color: colorsEnum().default("white"),
  authorId: integer().notNull(),
});

export const notesRelations = relations(notesSchema, ({ one }) => ({
  author: one(usersSchema, {
    fields: [notesSchema.authorId],
    references: [usersSchema.id],
  }),
}));
