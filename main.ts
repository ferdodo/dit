import { createApp, h as createElement, defineComponent, ref } from "vue";
import { Task, todaysTask$, setTodaysTask } from "./tasks";
import { remindMe } from "./remind-me";

remindMe().catch(console.error);

const todayPrompt = defineComponent({
	render (component) {
		return createElement('p', { onClick: component.promptTask }, 'What productive thing will you do today ?');
	},

	setup() {
		function promptTask () {
			const task: Task | null = prompt("What is your today's task ?");

			if (task) {
				setTodaysTask(task);
				new Notification("A new task has been saved 🚀");
			}
		}

		return {
			promptTask
		};
	}
});

const todayDisplay = defineComponent({
	render(component) {
		return createElement('p', component.todaysTask);
	},
	setup() {
		const todaysTask = ref();
		
		todaysTask$.subscribe({
			next(task: Task | undefined){
				todaysTask.value = task;
			}
		});

		return {
			todaysTask	
		};
	}
});

const app = createApp({
	render (app) {
		return createElement('div', [
			app.todaysTask
				? createElement(todayDisplay)
				: createElement(todayPrompt)
		]);
	},
	setup (){
		const todaysTask = ref();
		
		todaysTask$.subscribe({
			next(task: Task | undefined){
				todaysTask.value = task;
			}
		});

		return {
			todaysTask	
		};
	}
});

app.mount('body');
