"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";

export default function Home() {
	const { theme, setTheme } = useTheme();

	function handleOpenCreateNoteModal() {
		const stringg = "ed";
	}

	return (
		<div className="flex flex-col items-center justify-center gap-5 min-h-screen p-8 pb-20  font-[family-name:var(--font-geist-sans)] bg-white dark:bg-black">
			<div className="flex justify-between items-center max-w-[1000px] w-full">
				<h1 className="text-white font-semibold text-xl">
					<span className="font-normal">Next</span> Notes
				</h1>
				<div>
					<Button
						variant={"outline"}
						className="font-semibold"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						Switch to {theme === "dark" ? "light" : "dark"} mode
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
				<Card className="bg-transparent p-7 border-zinc-700 text-gray-900 dark:text-white col-span-4">
					<div className="flex justify-between items-center">
						<h3 className="font-semibold">Title</h3>
						<div>...</div>
					</div>
					<p className="mt-3">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas a iste
						incidunt perspiciatis molestias maxime reiciendis sapiente rerum
						modi inventore voluptatibus, debitis cum excepturi minima culpa?
						Molestiae officiis expedita aut?
					</p>
				</Card>
				<Card className="bg-transparent p-7 border-zinc-700 text-gray-900 dark:text-white col-span-4">
					<div className="flex justify-between items-center">
						<h3 className="font-semibold">Title</h3>
						<div>...</div>
					</div>
					<p className="mt-3">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas a iste
						incidunt perspiciatis molestias maxime reiciendis sapiente rerum
						modi inventore voluptatibus, debitis cum excepturi minima culpa?
						Molestiae officiis expedita aut?
					</p>
				</Card>
				<Card className="bg-transparent p-7 border-zinc-700 text-gray-900 dark:text-white col-span-4">
					<div className="flex justify-between items-center">
						<h3 className="font-semibold">Title</h3>
						<div>...</div>
					</div>
					<p className="mt-3">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas a iste
						incidunt perspiciatis molestias maxime reiciendis sapiente rerum
						modi inventore voluptatibus, debitis cum excepturi minima culpa?
						Molestiae officiis expedita aut?
					</p>
				</Card>
			</div>
		</div>
	);
}
