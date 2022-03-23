import { todaysTask$, Task } from "./tasks";
import { createNotification } from "./notification";
import { Subscription } from "rxjs";

export async function remindMe () {
	let todaysTask: Task = null;

	const subscription: Subscription = todaysTask$.subscribe({
		next(task: Task){
			todaysTask = task;
		}
	});

	await new Promise(r => setTimeout(r, 1000 * 10));

	while (!todaysTask) {
		createNotification("Hey ! I noticed you haven't planned to do anything productive today... 😔");
		await new Promise(r => setTimeout(r, 1000 * 3600 * 3));
	}

	subscription.unsubscribe();
}
