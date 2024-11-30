import { Card } from "@/components/ui/card";
import { IconDots } from "@tabler/icons-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function Note() {
	return (
		<Card className="bg-transparent p-7 border-zinc-500 text-gray-900 dark:text-white col-span-4">
			<div className="flex justify-between items-center">
				<h3 className="font-semibold">Title</h3>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild>
						<button type="button" aria-label="Customise options">
							<IconDots />
						</button>
					</DropdownMenu.Trigger>

					<DropdownMenu.Portal>
						<DropdownMenu.Content className="bg-white border-2 border-zinc-500 dark:bg-black rounded-md p-2">
							<DropdownMenu.Item>
								<button type="button" aria-label="editar">
									Editar
								</button>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<button type="button" aria-label="duplicar">
									Duplicar
								</button>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<button type="button" aria-label="deletar">
									Deletar
								</button>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu.Root>
			</div>
			<p className="mt-3">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas a iste
				incidunt perspiciatis molestias maxime reiciendis sapiente rerum modi
				inventore voluptatibus, debitis cum excepturi minima culpa? Molestiae
				officiis expedita aut?
			</p>
		</Card>
	);
}
