"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Note } from "./_components/note";
import { IconMoon, IconSun, IconNote, IconDots } from "@tabler/icons-react";

export default function Home() {
	const { theme, setTheme } = useTheme();

	function handleOpenCreateNoteModal() {
		const stringg = "ed";
	}

	return (
		<div className="flex flex-col items-center justify-center gap-5 min-h-screen p-8 pb-20  font-[family-name:var(--font-geist-sans)] bg-white dark:bg-black">
			<div className="flex justify-between items-center max-w-[1000px] w-full">
				<h1 className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold text-xl">
					<span className="font-normal">Next</span> Notes
					<IconNote />
				</h1>
				<div className="flex gap-2 items-center">
					<Button
						variant={"outline"}
						className="font-semibold"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						{theme === "dark" ? <IconSun /> : <IconMoon />}
					</Button>
					<Button
						variant={"outline"}
						className="font-semibold"
						onClick={handleOpenCreateNoteModal}
					>
						Criar nota
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-8 items-center justify-items-center gap-2 max-w-[1000px] h-fit">
				<Note />
				<Note />
				<Note />
				<Note />
			</div>
		</div>
	);
}
