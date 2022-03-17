import { ObjectId } from "mongodb";

export interface SubTask {
	id: string;
	name: string;
	order: number; // To arrange subtasks in order in the list.
	isImportant: boolean;
	isCompleted: boolean;
	parentTaskId: string;
}

export interface SubTaskFormObject {
	name: string;
	isImportant: boolean;
	isCompleted: boolean;
}
