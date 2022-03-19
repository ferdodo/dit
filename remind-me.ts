import { todaysTask$, Task } from "./tasks";

export async function remindMe () {
	const permission: NotificationPermission = await askPermission();
	let todaysTask;

	todaysTask$.subscribe({
		next(task: Task | undefined){
			todaysTask = task;
		}
	});

	if (permission === "granted"){
		while (true) {
			await waitThreeHours();

			if (todaysTask) {
				break;
			}
			
			new Notification("Hey ! I noticed you haven't planned to do anything productive today... 😔");
		}
	}
}

function waitThreeHours() : Promise<void> {
	return new Promise(function (resolve) {
		setTimeout(resolve, 1000* 3600 * 3);
	});
}

function askPermission() : Promise<NotificationPermission> {
	if (Notification.permission === "default"){
		return Notification.requestPermission();
	} else {
		return Promise.resolve(Notification.permission);
	}
}
