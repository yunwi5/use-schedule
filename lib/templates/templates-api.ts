import {
	TemplateFormObj,
	TemplateProperties
} from "../../models/template-models/Template";

const API_DOMAIN = `${process.env.API_DOMIN_RELATIVE}/templates`;

export async function postTemplate (newTemplate: TemplateFormObj) {
	let res;
	let data, insertedId;
	let message;
	try {
		res = await fetch(`${API_DOMAIN}/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTemplate)
		});
		data = await res.json();
		// console.log("Template POST data:", data);
		message = data.message;
		insertedId = data.insertedId.toString();
	} catch (err) {
		message = err instanceof Error ? err.message : "Inserting new template did not work.";
		console.error(err);
	}

	if (!res || !res.ok)
		return {
			isSuccess: false,
			message
		};
	return { isSuccess: true, message, insertedId };
}

export async function patchTemplate (templateId: string, templateProps: TemplateProperties) {
	let res;
	let data, message;
	try {
		res = await fetch(`${API_DOMAIN}/${templateId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(templateProps)
		});
		data = await res.json();
		// console.log("Template PATCH data:", data);
		message = data.message;
	} catch (err) {
		message = err instanceof Error ? err.message : "Inserting new template did not work.";
		console.error(err);
	}

	if (!res || !res.ok)
		return {
			isSuccess: false,
			message
		};
	return { isSuccess: true, message };
}
