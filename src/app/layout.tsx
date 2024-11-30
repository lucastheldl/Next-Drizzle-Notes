import type { Metadata } from "next";
import ThemeProvider from "../components/ThemeProvider";

import { Montserrat } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
	title: "Next Notes",
	description: "Generated by create next app",
};

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ThemeProvider>
				<body className={`${montserrat.className} antialiased `}>
					{children}
				</body>
			</ThemeProvider>
		</html>
	);
}
