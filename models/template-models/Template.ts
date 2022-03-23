export interface Template {
	id: string;
	name: string;
	description: string;
	importance: number; // between 0.5 and 5
	userId: string;
}

// When the TemplateForm is submitted, id and userId may be null.
export interface TemplateFormObj {
	id?: string;
	name: string;
	description: string;
	importance: number;
	userId?: string;
}

export interface TemplateProperties {
	id?: string;
	name: string;
	description: string;
	importance: number;
	userId?: string;
}
