// This is also a type SubTask.
export interface TemplateSubTask {
	id: string;
	name: string;
	order: number; // To arrange subtasks in order in the list.
	isImportant: boolean;
	isCompleted: boolean;
	parentTaskId: string;
	isTemplated: true;
}
