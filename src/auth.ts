import NextAuth, {
	CredentialsSignin,
	type DefaultSession,
	NextAuthConfig,
} from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";
import {
	usersSchema,
	sessions,
	verificationTokens,
	accounts,
} from "@/server/db/schema";
import Google from "next-auth/providers/google";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}

class InvalidLoginError extends CredentialsSignin {
	code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db, {
		usersTable: usersSchema,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: "jwt",
	},

	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token) {
				session.user.id = token.sub as string;
			}
			return session;
		},

		async jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},

		authorized: async ({ auth, request }) => {
			// Logged in users are authenticated, otherwise redirect to login page
			/* const { pathname } = request.nextUrl;
			if (pathname === "/sign-up") {
				return true;
			} */
			return !!auth;
		},
	},
	pages: {
		signIn: "/login",
	},
});
