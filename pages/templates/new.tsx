// import type {NextPage} from 'next'
import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useQuery, useQueryClient } from "react-query";

import { TemplateFormObj, Template } from "../../models/template-models/Template";
import { Collection } from "../../utilities/mongodb-util/mongodb-constant";
import TemplatePlanner from "../../components/templates/TemplatePlanner";
import { Task } from "../../models/task-models/Task";

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
}

const New: React.FC<Props> = ({ userId }) => {
	const [ templateId, setTemplateId ] = useState<string>("");

	const queryClient = useQueryClient();
	const { data: templateData, isLoading: isTemplateLoading, error: templateError } = useQuery(
		[ "template", templateId ],
		getTemplate,
		{
			enabled: !!templateId
		}
	);
	const template: Template | null = templateData ? templateData.template : null;
	if (templateError) {
		console.error("Template query has errors!");
		console.log(templateError);
	}

	const { data: taskData, isLoading: isTasksLoading, error: tasksError } = useQuery(
		[ "template-tasks", templateId ],
		getTemplateTasks,
		{ enabled: !!templateId }
	);
	const templateTasks: Task[] = taskData ? taskData.tasks : null;
	if (tasksError) {
		console.error("TemplateTasks query has errors!");
		console.log(tasksError);
	}

	const mutateTemplate = (newTemplate: TemplateFormObj, isNew: boolean = true) => {
		newTemplate.userId = userId;
		// http request to post new template.
		console.log("newTemplate:", newTemplate);

		if (isNew) {
			// Send POST Request
			// Unique Id will be retried as a reponse from the server.
		} else {
			// Send PUT Request
			// Invalidate query then.
			queryClient.invalidateQueries("template");
		}
	};

	const invalidateTemplateTasks = () => {};

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
