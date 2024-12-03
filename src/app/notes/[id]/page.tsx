import { getNote } from "@/actions/notes/get-note";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

export default async function NotePage({ params }: { params: { id: string } }) {
	const res = await getNote({ id: params.id });
	if (res?.data && !res.data.success) {
		notFound();
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className="flex text-black dark:text-white flex-col items-center justify-start gap-5 min-h-screen p-8 pb-20 bg-white dark:bg-black">
				{res?.data?.note!.id}
			</div>
		</Suspense>
	);
}
