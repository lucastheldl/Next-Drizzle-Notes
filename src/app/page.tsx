import { Note } from "./_components/note";
import { getAllNotes } from "@/actions/notes/get-all-notes";
import { auth } from "@/auth";

export default async function Home() {
	const session = await auth();
	const res = await getAllNotes({
		userId: session?.user.id as string,
	});

	return (
		<div className="flex flex-col items-center justify-start gap-5 min-h-screen p-8 pb-20  bg-white dark:bg-black">
			<div className="grid grid-cols-8 items-center justify-items-center gap-4 w-full max-w-[1000px] h-fit">
				{res?.data?.success ? (
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					res?.data.notes!.map((note) => <Note key={note.id} {...note} />)
				) : (
					<p className="col-span-8 text-red-500">{res?.data?.error}</p>
				)}
			</div>
		</div>
	);
}
