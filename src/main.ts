import { createApp, h as createElement, ref, Ref } from "vue";
import { Task, todaysTask$, promptTask } from "./tasks";
import { remindMe } from "./remind-me";

remindMe().catch(console.error);

const app = createApp({
	render(app) {
		return createElement('div', [
			app.todaysTask
				? createElement('p', app.todaysTask)
				: createElement('p', { onClick: app.promptTask }, 'What productive thing will you do today ?')
		]);
	},
	setup() {
		const todaysTask: Ref<Task> = ref(null);
		todaysTask$.subscribe((value: Task) => todaysTask.value = value);
		return { todaysTask, promptTask };
	}
});

app.mount('body');
