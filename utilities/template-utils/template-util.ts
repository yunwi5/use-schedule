import { Template } from "../../models/template-models/Template";

export function convertToTemplate (data: any): Template {
	const template: Template = {
		id: data._id,
		name: data.name,
		description: data.description,
		importance: data.importance,
		userId: data.userId
	};

	return template;
}
