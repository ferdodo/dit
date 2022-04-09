
export const dbUpdates: EventTarget = new EventTarget();

export function dbGet(key: string) {
	const valueAsString = window.localStorage.getItem(key);
	return valueAsString ? JSON.parse(valueAsString) : null;
}

export function dbSet(key: string, value) {
	const valueAsString = JSON.stringify(value);
	window.localStorage.setItem(key, valueAsString);
	const updateEvent: CustomEvent = new CustomEvent(key, { detail: value });
	dbUpdates.dispatchEvent(updateEvent);
}

window.addEventListener('storage', function(storageEvent: StorageEvent) {
	const valueAsString: string | null = storageEvent.newValue;

	if (storageEvent.key) {
		const value = valueAsString ? JSON.parse(valueAsString) : null;
		const updateEvent: CustomEvent = new CustomEvent(storageEvent.key, { detail: value });
		dbUpdates.dispatchEvent(updateEvent);
	}
});
