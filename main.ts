import { createApp, h as createElement, ref, Ref, onUnmounted } from "vue";
import { Task, todaysTask$, promptTask } from "./tasks";
import { remindMe } from "./remind-me";
import { Subscription } from "rxjs";

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

		const subscription: Subscription = todaysTask$.subscribe({
			next(value: Task){
				todaysTask.value = value;
			}
		});

		onUnmounted(() => subscription.unsubscribe());
		return { todaysTask, promptTask };
	}
});

app.mount('body');
