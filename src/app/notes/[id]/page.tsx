import { getNote } from "@/actions/notes/get-note";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import { IconBook, IconPencil } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default async function NotePage({ params }: { params: { id: string } }) {
	const { id } = await params;
	const res = await getNote({ id: id });
	if (res?.data && !res.data.success) {
		notFound();
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className="relative flex flex-col text-black dark:text-white justify-start gap-5 min-h-screen p-8 pb-20 bg-white dark:bg-black">
				<div className="max-w-5xl mx-auto w-full px-8">
					<div className="flex justify-between">
						<div className="inline-flex gap-4 items-center">
							<h3 className="font-bold text-lg">{res?.data?.note!.title}</h3>
							<button type="button">
								<IconPencil size={20} />
							</button>
						</div>
						<Button type="button" className="font-semibold inline-flex ga-2">
							Salvar
							<IconBook size={20} />
						</Button>
					</div>
					<div className="relative w-full pt-10">
						<style>{`
							.lined-textarea {
							background-image: linear-gradient(#575757 1px, transparent 1px);
							background-size: 100% 2rem;
							background-attachment: local;
							}
						`}</style>
						<textarea
							className="w-full min-h-[600px] leading-8 focus:outline-none bg-transparent lined-textarea"
							placeholder="Escreva uma nota..."
						/>
					</div>

					{/* 	<textarea
					className="w-full min-h-[600px] focus:border-none focus:outline-none "
					placeholder="Escreva uma nota..."
				/> */}
				</div>
			</div>
		</Suspense>
	);
}
