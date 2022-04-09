import { dbSet, dbGet, dbUpdates } from "./nosql-db";
import { BehaviorSubject } from 'rxjs';

function getTodaysTaskId(): string {
	const version = "2";
	const today: Date = new Date();
	const dd: string = String(today.getDate()).padStart(2, '0');
	const mm: string = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy: number = today.getFullYear();
	return yyyy + '/' + mm + '/' + dd + '/' + version;
}

type Task = string | null;
const todaysTaskId: string = getTodaysTaskId();
const todaysTask: Task = dbGet(todaysTaskId);
const todaysTask$: BehaviorSubject<Task> = new BehaviorSubject(todaysTask);

dbUpdates.addEventListener(todaysTaskId, function (event: Event) {
	todaysTask$.next((event as CustomEvent).detail);
});

export { Task, todaysTask$ };

export function promptTask () {
	const task: Task = prompt("What is your today's task ?");
	const key: string = getTodaysTaskId();
	dbSet(key, task);
	new Notification("A new task has been saved. 🚀 See you tomorrow !");
}
