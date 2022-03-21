
if (Notification.permission !== "granted"){
	Notification.requestPermission();
}

export function createNotification(message: string){
	if (Notification.permission === "granted"){
		new Notification(message);
	}
}
