export interface SubTask {
	id: string;
	name: string;
	order: number; // To arrange subtasks in order in the list.
	isImportant: boolean;
	isCompleted: boolean;
	parentTaskId: string;
}
