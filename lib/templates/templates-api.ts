import axios from 'axios';
import { Task } from '../../models/task-models/Task';
import { TemplateFormObj, TemplateProperties } from '../../models/template-models/Template';
import { Collection } from '../../utilities/mongodb-util/mongodb-constant';

const API_TEMPLATE_DOMAIN = process.env.API_DOMIN_RELATIVE
	? `${process.env.API_DOMIN_RELATIVE}/templates`
	: 'api/templates';

const collection = Collection.TEMPLATE_TASKS;

export async function getTemplate (context: any) {
	const [ name, templateId ] = context.queryKey;
	return fetch(`${API_TEMPLATE_DOMAIN}/${templateId}`).then((res) => res.json());
}

// Should be used after template APIs are resolved.
export async function getTemplateTasks (context: any) {
	const [ name, templateId ] = context.queryKey;
	return fetch(`${API_TEMPLATE_DOMAIN}/${collection}/${templateId}`).then((res) => res.json());
}

// Tried axios. Is it inconsistent?
export async function getTemplateTasksById (templateId: string) {
	const { data } = await axios.get<{ message: string; tasks?: Task[] }>(
		`${API_TEMPLATE_DOMAIN}/${collection}/${templateId}`,
	);
	return data;
}

export async function postTemplate (newTemplate: TemplateFormObj) {
	let res;
	let data, insertedId;
	let message;
	try {
		res = await fetch(`${API_TEMPLATE_DOMAIN}/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTemplate),
		});
		data = await res.json();
		// console.log("Template POST data:", data);
		message = data.message;
		insertedId = data.insertedId.toString();
	} catch (err) {
		message = err instanceof Error ? err.message : 'Inserting new template did not work.';
		console.error(err);
	}

	if (!res || !res.ok)
		return {
			isSuccess: false,
			message,
		};
	return { isSuccess: true, message, insertedId };
}

export async function patchTemplate (templateId: string, templateProps: TemplateProperties) {
	let res;
	let data, message;
	try {
		res = await fetch(`${API_TEMPLATE_DOMAIN}/${templateId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(templateProps),
		});
		data = await res.json();
		// console.log("Template PATCH data:", data);
		message = data.message;
	} catch (err) {
		message = err instanceof Error ? err.message : 'Inserting new template did not work.';
		console.error(err);
	}

	if (!res || !res.ok)
		return {
			isSuccess: false,
			message,
		};
	return { isSuccess: true, message };
}

export async function deleteTemplate (templateId: string) {
	let message;
	try {
		const { data } = await axios.delete(`${API_TEMPLATE_DOMAIN}/${templateId}`);
		console.log('dalete data:', data);
	} catch (err) {
		message = err instanceof Error ? err.message : 'Delete template api did not work.';
		return { isSuccess: false, message };
	}

	return { isSuccess: true, message: 'Delete template successful!' };
}

export async function transferTemplateToWeekly (templateId: string, weekBeginning: Date) {
	let message;
	try {
		const response = await axios.post(`${API_TEMPLATE_DOMAIN}/import/${templateId}`, {
			weekBeginning,
		});
		const { data, status } = response;

		if (status >= 200 && status < 300) {
			return { isSuccess: true, data };
		}
	} catch (err) {
		message = err instanceof Error ? err.message : 'transferring template tasks did not work.';
		console.log(message);
	}
	return { isSuccess: false, data: message };
}
