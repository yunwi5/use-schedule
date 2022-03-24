import { Template } from "../../models/template-models/Template";

export function convertToTemplate (data: any): Template {
	const template: Template = {
		id: data._id.toString(),
		name: data.name,
		description: data.description,
		importance: data.importance,
		userId: data.userId
	};

	return template;
}

export function convertToTemplateArray (data: any[]): Template[] {
	return data.map((piece) => convertToTemplate(piece));
}
