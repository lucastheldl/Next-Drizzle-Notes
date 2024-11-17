import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";
import { usersSchema } from "@/server/db/schema";
import { sessions } from "@/server/db/schema/session";
import { verificationTokens } from "@/server/db/schema/verification-tokens";
import { accounts } from "@/server/db/schema/accounts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: usersSchema,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [],
});
