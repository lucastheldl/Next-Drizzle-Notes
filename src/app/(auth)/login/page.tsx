import { Button } from "@/components/ui/button";
import { signIn } from "../../../auth";

export default function Login() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("google", { redirectTo: "/" });
			}}
		>
			<Button variant={"outline"} type="submit">
				Sign in
			</Button>
		</form>
	);
}
