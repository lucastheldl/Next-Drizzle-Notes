import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { ID_LENGTH } from "../imports";
import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { notesSchema } from "../notes";

export const usersSchema = pgTable(
  "user",
  {
    id: varchar("id", { length: ID_LENGTH })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
  },
  (table) => {
    return {
      /**
       * An index on the email column for faster lookups.
       * Improves performance of queries that search or filter by email.
       */
      emailIdx: index("email_idx").on(table.email),
    };
  }
);

export const usersRelations = relations(usersSchema, ({ many }) => ({
  notes: many(notesSchema, {
    relationName: "userNotes",
  }),
}));
