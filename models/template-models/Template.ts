export interface Template {
	id: string;
	name: string;
	description: string;
	importance: number; // between 0.5 and 5
	userId: string;
}
