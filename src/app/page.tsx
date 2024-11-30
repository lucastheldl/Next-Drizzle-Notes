import { Button } from "@/components/ui/button";
import { Note } from "./_components/note";
import { IconNote } from "@tabler/icons-react";
import { createNote } from "@/actions/notes/create-note";
import { ThemeSwitch } from "./theme-switch";
import { getAllNotes } from "@/actions/notes/get-all-notes";

export default async function Home() {

	const { success, notes, error } = await getAllNotes();

	
	return (
		<div className="flex flex-col items-center justify-start gap-5 min-h-screen p-8 pb-20  font-[family-name:var(--font-geist-sans)] bg-white dark:bg-black">
			<div className="flex justify-between items-center max-w-[1000px] w-full">
				<h1 className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold text-xl">
					<span className="font-normal">Next</span> Notes
					<IconNote />
				</h1>
				<div className="flex gap-2 items-center">
					<ThemeSwitch />
					<form action={createNote}>
						<Button type="submit" variant={"outline"} className="font-semibold">
							Criar nota
						</Button>
					</form>
				</div>
			</div>
			<div className="grid grid-cols-8 items-center justify-items-center gap-2 max-w-[1000px] h-fit">
			
				{success ? (
				notes!.map((note) => (
					<Note key={note.id} {...note} />
				))
				) : (
				<p className="col-span-8 text-red-500">{error}</p>
				)}
			
				
			</div>
		</div>
	);
}
