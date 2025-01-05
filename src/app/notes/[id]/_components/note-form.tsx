"use client";
import { IconBook, IconPencil } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { editNote } from "@/actions/notes/edit-note";
import type { Session } from "next-auth";
import { useState } from "react";
import type { NoteColors } from "@/@types";
import { toast } from "sonner";

type NoteFormPropsType = {
	session: Session;
	res: {
		data: {
			note: { id: string; title: string; body: string; color: NoteColors };
		};
	};
};
export function NoteForm({ session, res }: NoteFormPropsType) {
	const [noteTitle, setNoteTitle] = useState("");
	const [noteBody, setNoteBody] = useState("");
	const [noteColor, setNoteColor] = useState<NoteColors>("white");

	async function handleSaveNote() {
		try {
			const data = await editNote({
				title: "Título atualizado",
				body: noteBody,
				color: "red",
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
					<div className="inline-flex gap-4 items-center">
						<h3 className="font-bold text-lg">{res?.data?.note?.title}</h3>
						<button type="button">
							<IconPencil size={20} />
						</button>
					</div>
					<Button
						type="button"
						onClick={handleSaveNote}
						className="font-semibold inline-flex ga-2"
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
