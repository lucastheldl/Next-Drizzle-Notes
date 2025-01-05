import { getNote } from "@/actions/notes/get-note";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

import { auth } from "@/auth";
import { NoteForm } from "./_components/note-form";

export default async function NotePage({ params }: { params: { id: string } }) {
	const { id } = await params;
	const session = await auth();
	const res = await getNote({ id: id });
	if (res?.data && !res.data.success) {
		notFound();
	}

	return (
		<Suspense fallback={<Loading />}>
			<NoteForm res={res} />
		</Suspense>
	);
}
