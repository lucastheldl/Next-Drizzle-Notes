import { Note } from "./_components/note";
import { getAllNotes } from "@/actions/notes/get-all-notes";
import { auth } from "@/auth";

export default async function Home() {
	const session = await auth();
	const { success, notes, error } = await getAllNotes(session?.user.id);

	return (
		<div className="flex flex-col items-center justify-start gap-5 min-h-screen p-8 pb-20  bg-white dark:bg-black">
			<div className="grid grid-cols-8 items-center justify-items-center gap-2 max-w-[1000px] h-fit">
				{success ? (
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					notes!.map((note) => <Note key={note.id} {...note} />)
				) : (
					<p className="col-span-8 text-red-500">{error}</p>
				)}
			</div>
		</div>
	);
}
