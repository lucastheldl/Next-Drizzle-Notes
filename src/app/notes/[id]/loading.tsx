import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex flex-col min-h-screen">
			<Skeleton className="h-8 w-32 mb-7" />
			<div className="flex justify-between w-full">
				<div className="flex gap-4">
					<Skeleton className="h-10 w-96" />
					<Skeleton className="h-10 w-32" />
				</div>
				<Skeleton className="h-10 w-32" />
			</div>
			<Skeleton className="w-full h-[40rem] mt-8" />
		</div>
	);
}
