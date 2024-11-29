"use client";

import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
	children: React.ReactNode;
}

// Wraps the application with SessionProvider to enable authentication context
export function Providers({ children }: ProvidersProps) {
	return children;
}
