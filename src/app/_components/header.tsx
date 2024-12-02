"use client";
import { IconNote } from "@tabler/icons-react";
import { ThemeSwitch } from "../theme-switch";
import { Button } from "@/components/ui/button";
import { createNote } from "@/actions/notes/create-note";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
	const router = useRouter();
	const [isCreating, setIsCreating] = useState(false);
	const handleCreateNote = async () => {
		try {
			setIsCreating(true);
			const result = await createNote();
			if (result.success) {
				router.push(`/notes/${result.id}`);
			} else {
				/* toast({
					title: "Error",
					description: result.error || "Failed to create note",
					variant: "destructive",
				}); */
			}
		} catch (error) {
			/* toast({
				title: "Error",
				description: "An unexpected error occurred",
				variant: "destructive",
			}); */
		} finally {
			setIsCreating(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-start p-8 bg-white dark:bg-black">
			<div className="flex justify-between items-center max-w-[1000px] w-full">
				<h1 className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold text-xl">
					<span className="font-normal">Next</span> Notes
					<IconNote />
				</h1>
				<div className="flex gap-2 items-center">
					<ThemeSwitch />

					<Button
						type="submit"
						onClick={handleCreateNote}
						variant={"outline"}
						className="font-semibold text-gray-900 dark:text-white"
					>
						{isCreating ? "Criando..." : "Criar nota"}
					</Button>
				</div>
			</div>
		</div>
	);
}