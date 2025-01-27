import {
	boolean,
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	varchar,
} from "drizzle-orm/pg-core";
import { usersSchema } from "../users";
import type { AdapterAccountType } from "next-auth/adapters";
import { ID_LENGTH } from "../imports";

const accounts = pgTable("account", {
	userId: varchar("userId", { length: ID_LENGTH })
		.notNull()
		.references(() => usersSchema.id, { onDelete: "cascade" }),
	type: text("type").$type<AdapterAccountType>().notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: text("token_type"),
	scope: text("scope"),
	id_token: text("id_token"),
	session_state: text("session_state"),
});

export { accounts };
