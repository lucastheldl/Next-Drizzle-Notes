"use client";
import { IconBook, IconPencil } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { editNote } from "@/actions/notes/edit-note";
import type { Session } from "next-auth";
import { useState } from "react";
import type { NoteColors } from "@/@types";
import { toast } from "sonner";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

type NoteFormPropsType = {
	session: Session | null;
	res: {
		data: {
			note: { id: string; title: string; body: string; color: NoteColors };
		};
	} | null;
};
export function NoteForm({ session, res }: NoteFormPropsType) {
	const [noteTitle, setNoteTitle] = useState("Nova nota");
	const [noteBody, setNoteBody] = useState("Escreva uma nova nota...");
	const [noteColor, setNoteColor] = useState<NoteColors>("white");

	async function handleSaveNote() {
		try {
			const data = await editNote({
				title: noteTitle,
				body: noteBody,
				color: noteColor,
				noteId: res.data.note.id,
			});

			toast.success("Sucesso", {
				description: "Nota Salva!",
			});
			console.log(data);
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}
	return (
		<div className="relative flex flex-col text-black dark:text-white justify-start gap-5 min-h-screen p-8 pb-20 bg-white dark:bg-black">
			<div className="max-w-5xl mx-auto w-full px-8">
				<div className="flex justify-between">
					<div className="inline-flex items-center gap-2 w-full max-w-lg">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild>
								<button type="button" aria-label="Customise options">
									<div
										className={cn(
											"rounded-full bg-white h-8 w-8",
											noteColor === "white" && "bg-white",
											noteColor === "red" && "bg-red-600",
											noteColor === "blue" && "bg-blue-600",
											noteColor === "green" && "bg-green-600",
										)}
									/>
								</button>
							</DropdownMenu.Trigger>

							<DropdownMenu.Portal>
								<DropdownMenu.Content className="bg-white border-2 border-zinc-500 dark:bg-black rounded-md p-4">
									<DropdownMenu.Item>
										<button
											type="button"
											onClick={() => setNoteColor("white")}
											aria-label="editar"
											className="rounded-full h-6 w-6 bg-white"
										/>
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<button
											type="button"
											onClick={() => setNoteColor("red")}
											aria-label="editar"
											className="rounded-full bg-red-600 h-6 w-6"
										/>
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<button
											type="button"
											onClick={() => setNoteColor("blue")}
											aria-label="editar"
											className="rounded-full bg-blue-600 h-6 w-6"
										/>
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<button
											type="button"
											onClick={() => setNoteColor("green")}
											aria-label="editar"
											className="rounded-full bg-green-600 h-6 w-6"
										/>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu.Root>
						<input
							type="text"
							className="text-xl bg-transparent focus:outline-none w-full"
							onChange={(e) => setNoteTitle(e.target.value)}
							defaultValue={res?.data?.note?.title}
						/>
					</div>

					<Button
						type="button"
						onClick={handleSaveNote}
						className="font-semibold inline-flex ga-2 "
					>
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
						onChange={(e) => setNoteBody(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
}
