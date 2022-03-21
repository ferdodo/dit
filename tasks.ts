import { dbSet, dbGet } from "./nosql-db";
import { BehaviorSubject } from 'rxjs';

function getTodaysTaskId(): string {
	const version = "1";
	const today: Date = new Date();
	const dd: string = String(today.getDate()).padStart(2, '0');
	const mm: string = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy: number = today.getFullYear();
	return mm + '/' + dd + '/' + yyyy + '/' + version;
}

const todaysTaskId: string = getTodaysTaskId();
const todaysTask: Task = dbGet(todaysTaskId);
export const todaysTask$: BehaviorSubject<Task> = new BehaviorSubject(todaysTask);

export type Task = string | null;

export function promptTask () {
	const task: Task = prompt("What is your today's task ?");
	const key: string = getTodaysTaskId();
	dbSet(key, task);
	todaysTask$.next(task);
	new Notification("A new task has been saved. 🚀 See you tomorrow !");
}
