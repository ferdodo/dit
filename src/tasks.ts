import { dbSet, dbGet, dbUpdates } from "./nosql-db";
import { Observable, Subscriber } from 'rxjs';

function getTodaysTaskId(): string {
	const version = "2";
	const today: Date = new Date();
	const dd: string = String(today.getDate()).padStart(2, '0');
	const mm: string = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy: number = today.getFullYear();
	return yyyy + '/' + mm + '/' + dd + '/' + version;
}

function getTimeToTomorrow(): number {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  const totalSecondsInADay = 86400;
  const margin = 1;
  return (totalSecondsInADay - totalSecondsToday + margin) * 1000;
}

export type Task = string | null;
let todaysTaskId: string = getTodaysTaskId();
let todaysTask: Task = dbGet(todaysTaskId);

export const todaysTask$: Observable<Task> = new Observable(function(subscriber: Subscriber<Task>) {
	subscriber.next(todaysTask);

	function taskUpdateListener(event: Event) {
		todaysTask = (event as CustomEvent).detail;
		subscriber.next(todaysTask);
	}

	dbUpdates.addEventListener(todaysTaskId, taskUpdateListener);

	async function handleFutureDays() {
		while (true) {
			const timeUntilTomorrow: number = getTimeToTomorrow();
			await new Promise(r => setTimeout(r, timeUntilTomorrow));
			dbUpdates.removeEventListener(todaysTaskId, taskUpdateListener);
			todaysTaskId = getTodaysTaskId();
			todaysTask = dbGet(todaysTaskId);
			subscriber.next(todaysTask);
			dbUpdates.addEventListener(todaysTaskId, taskUpdateListener);
		}
	}

	handleFutureDays().catch(console.error);
});

export function promptTask() {
	const task: Task = prompt("What is your today's task ?");
	const key: string = getTodaysTaskId();
	dbSet(key, task);
	new Notification("A new task has been saved. 🚀 See you tomorrow !");
}

export function getTodaysTask(): Task {
	return todaysTask;
}
