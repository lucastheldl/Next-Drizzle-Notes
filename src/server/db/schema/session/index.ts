import { timestamp, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { ID_LENGTH } from "../imports";
import { usersSchema } from "../users";

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: varchar("user_id", { length: ID_LENGTH })
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
