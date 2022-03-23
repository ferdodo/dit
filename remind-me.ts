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

	while (true) {
		await waitTenSeconds();

		if (todaysTask) {
			break;
		} else {
			createNotification("Hey ! I noticed you haven't planned to do anything productive today... 😔");
		}
		
		await waitThreeHours();
	}

	subscription.unsubscribe();
}

function waitTenSeconds() : Promise<void> {
	return new Promise(function (resolve) {
		setTimeout(resolve, 1000* 10 );
	});
}

function waitThreeHours() : Promise<void> {
	return new Promise(function (resolve) {
		setTimeout(resolve, 1000* 3600 * 3);
	});
}
