// import type {NextPage} from 'next'
import { useState, useDebugValue } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Claims, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useQuery, useQueryClient } from "react-query";

import { TemplateFormObj, Template } from "../../models/template-models/Template";
import { Collection } from "../../utilities/mongodb-util/mongodb-constant";
import TemplatePlanner from "../../components/templates/TemplatePlanner";
import { Task } from "../../models/task-models/Task";
import { patchTemplate, postTemplate } from "../../lib/templates/templates-api";

const API_TEMPLATE_DOMAIN = "/api/templates";

const API_TASKS_DOMAIN = "/api/planners/template-tasks";
const collection = Collection.TEMPLATE_TASKS;

async function getTemplate (context: any) {
	const [ name, templateId ] = context.queryKey;
	return fetch(`${API_TEMPLATE_DOMAIN}/${templateId}`).then((res) => res.json());
}

// Should be used after template APIs are resolved.
async function getTemplateTasks (context: any) {
	const [ name, templateId ] = context.queryKey;
	return fetch(`${API_TASKS_DOMAIN}/${templateId}?collection=${collection}`).then((res) =>
		res.json()
	);
}

interface Props {
	userId: string;
	template: null;
	user: Claims;
}

const New: React.FC<Props> = ({ userId, user }) => {
	const [ templateId, setTemplateId ] = useState<string>("");
	useDebugValue(templateId);

	const queryClient = useQueryClient();
	const { data: templateData, isLoading: isTemplateLoading, error: templateError } = useQuery(
		[ "template", templateId ],
		getTemplate,
		{
			enabled: !!templateId
		}
	);
	const template: Template | null = templateData ? templateData.template : null;
	if (!!templateError) {
		console.error("Template query has errors!");
		console.log(templateError);
	}

	const { data: taskData, isLoading: isTasksLoading, error: tasksError } = useQuery(
		[ "templateTasks", templateId ],
		getTemplateTasks,
		{ enabled: false } // false for now, since the API is not implemented yet.
	);
	const templateTasks: Task[] = taskData ? taskData.tasks : null;
	if (tasksError) {
		console.error("TemplateTasks query has errors!");
		console.log(tasksError);
	}

	const mutateTemplate = async (tempObj: TemplateFormObj, isNew: boolean = true) => {
		// http request to post new template.
		if (isNew) {
			const newTemplate = { ...tempObj, userId };
			// Send POST Request
			// Unique Id will be retried as a reponse from the server.
			const { isSuccess, message, insertedId } = await postTemplate(newTemplate);
			console.log(message);
			if (isSuccess || insertedId) {
				setTemplateId(insertedId);
			}
		} else {
			if (!templateId) return;
			// Send PUT Request
			// Invalidate query then.
			const { isSuccess, message } = await patchTemplate(templateId, tempObj);
			console.log("message:", message);
			queryClient.invalidateQueries("template");
		}
	};

	const invalidateTemplateTasks = () => {
		queryClient.invalidateQueries("templateTasks");
	};

	return (
		<div>
			<Head>
				<title>New Template</title>
				<meta
					name="description"
					content="New custom template to add users' repetitive tasks in one place."
				/>
			</Head>
			<h1 style={{ marginTop: "9rem", fontSize: "60px", textAlign: "center" }}>
				Welcome to new template page!
			</h1>
			<TemplatePlanner
				onInvalidateTasks={invalidateTemplateTasks}
				onMutateTemplate={mutateTemplate}
				template={template}
				templateTasks={templateTasks || []}
			/>
		</div>
	);
};

export default New;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
	async getServerSideProps (context) {
		const { req, res } = context;
		const session = getSession(req, res);

		if (!session) {
			return {
				redirect: {
					destination: "/login",
					permanent: false
				}
			};
		}
		const userId = session.user.sub;
		return {
			props: {
				userId,
				template: null
			}
		};
	}
});
