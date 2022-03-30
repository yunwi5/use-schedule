export interface NoIdSubTask {
	id?: string;
	name: string;
	order: number; // To arrange subtasks in order in the list.
	isImportant: boolean;
	isCompleted: boolean;
	parentTaskId: string;
	isTemplated?: boolean;
}

export interface SubTask {
	id: string;
}
