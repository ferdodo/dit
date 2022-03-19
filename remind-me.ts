import { todaysTask$, Task } from "./tasks";

export async function remindMe () {
	await waitTenSeconds();
	const permission: NotificationPermission = await askPermission();
	let todaysTask;

	todaysTask$.subscribe({
		next(task: Task | undefined){
			todaysTask = task;
		}
	});

	if (permission === "granted"){
		while (true) {
			await waitTenSeconds();

			if (todaysTask) {
				break;
			}
			
			new Notification("Hey ! I noticed you haven't planned to do anything productive today... 😔");
			await waitThreeHours();
		}
	}
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

function askPermission() : Promise<NotificationPermission> {
	if (Notification.permission !== "granted"){
		return Notification.requestPermission();
	} else {
		return Promise.resolve(Notification.permission);
	}
}
