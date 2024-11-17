import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersSchema } from "../users";
import { createId } from "@paralleldrive/cuid2";
import { ID_LENGTH } from "../imports";

export const colorsEnum = pgEnum("colors", ["white", "red", "blue", "green"]);

export const notesSchema = pgTable("notes", {
  id: varchar("id", { length: ID_LENGTH })
    .$defaultFn(() => createId())
    .primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  body: varchar("body").notNull(),
  color: colorsEnum("color").default("white"),
  authorId: varchar("author_id").notNull(),
});

export const notesRelations = relations(notesSchema, ({ one }) => ({
  author: one(usersSchema, {
    fields: [notesSchema.authorId],
    references: [usersSchema.id],
  }),
}));
