"use client";
import { Card } from "@/components/ui/card";
import { IconDots } from "@tabler/icons-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { deleteNote } from "@/actions/notes/delete-note";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NoteColors } from "@/@types";

type NotePropsType = {
	id: string;
	title: string;
	body: string;
	color: NoteColors | null;
};
export function Note({ id, title, body, color }: NotePropsType) {
	const router = useRouter();
	async function handleDeleteNote() {
		try {
			await deleteNote({ id });
		} catch (error) {
			console.log(error.message);
		}
	}
	function handleEditNote() {
		router.push(`/notes/${id}`);
	}
	function handleDuplicateNote() {}

	return (
		<Card className="relative bg-transparent px-7 py-4 border-zinc-500 text-gray-900 dark:text-white col-span-4 w-full h-full">
			<div
				className={cn(
					"absolute top-1/2 left-0 h-12 w-2 transform -translate-y-1/2 rounded-r-md border-r-[1px] border-t-[1px] border-b-[1px] border-gray-500",
					color === "white" && "bg-white",
					color === "red" && "bg-red-600",
					color === "blue" && "bg-blue-600",
					color === "green" && "bg-green-600",
				)}
			/>
			<div className="flex flex-col">
				<div className="flex justify-between">
					<div className="max-h-12 overflow-hidden">
						<h3 className="font-semibold">{title}</h3>
					</div>
					<div className="flex flex-col justify-start">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild>
								<button type="button" aria-label="Customise options">
									<IconDots />
								</button>
							</DropdownMenu.Trigger>

							<DropdownMenu.Portal>
								<DropdownMenu.Content className="bg-white border-2 border-zinc-500 dark:bg-black rounded-md p-2">
									<DropdownMenu.Item>
										<button
											type="button"
											onClick={handleEditNote}
											aria-label="editar"
										>
											Editar
										</button>
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<button
											type="button"
											aria-label="duplicar"
											onClick={handleDuplicateNote}
										>
											Duplicar
										</button>
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<button
											type="button"
											onClick={handleDeleteNote}
											aria-label="deletar"
										>
											Deletar
										</button>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu.Root>
					</div>
				</div>
				<p className="mt-3 break-all max-h-32 overflow-hidden">
					{body ? body : "Uma nota qualquer..."}
				</p>
			</div>
		</Card>
	);
}
