import { dbSet, dbGet } from "./nosql-db";
import { BehaviorSubject } from 'rxjs';

const todaysTask: Task | undefined = getTodaysTask();
export const todaysTask$: BehaviorSubject<Task | undefined> = new BehaviorSubject(todaysTask);

export type Task = string;

function getTodaysTask() : Task | undefined {
	const today: Date = getToday();
	const key: string = getKey(today);
	return dbGet(key);
}

export function setTodaysTask(task: Task) {
	const today: Date = getToday();
	const key: string = getKey(today);
	dbSet(key, task);
	todaysTask$.next(task);
}

function getKey(date: Date): string {
	const version = "1";
	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0');
	var yyyy = date.getFullYear();
	return mm + '/' + dd + '/' + yyyy + '/' + version;
}

function getToday() : Date {
	return new Date();
}
