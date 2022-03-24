import { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Claims, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

import { TemplateFormObj, Template } from "../../models/template-models/Template";
import TemplatePlanner from "../../components/templates/TemplatePlanner";
import { Task } from "../../models/task-models/Task";
import {
	getTemplate,
	getTemplateTasks,
	patchTemplate,
} from "../../lib/templates/templates-api";
import { templateActions } from "../../store/redux/template-slice";
import { getTemplateFromPage } from "../../utilities/mongodb-util/pages-util";
import { convertToTemplate } from "../../utilities/template-utils/template-util";

interface Props {
	template: null | Template;
	user: Claims;
}

const TemplatePage: NextPage<Props> = (props) => {
	const { template: initialTemplate } = props;
	// console.log(user);

	const dispatch = useDispatch();
	const templateId = initialTemplate ? initialTemplate.id : null;

	const queryClient = useQueryClient();
	const { data: templateData, error: templateError } = useQuery(
		[ "template", templateId ],
		getTemplate,
		{
			enabled: !!templateId,
			initialData: { template: initialTemplate }
		}
	);
	const template: Template | null = templateData ? templateData.template : null;
	if (templateError) {
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

	const mutateTemplate = async (tempObj: TemplateFormObj, isNew: boolean = false): Promise<boolean> => {
		// No post request needed since the template is already defined at the beginning.
		if (!templateId) return false;
		// Send PUT Request
		// Invalidate query then.
		const { isSuccess, message } = await patchTemplate(templateId, tempObj);
		queryClient.invalidateQueries("template");
		if (!isSuccess) {
			console.log("Updating template unsuccessful.");
			console.log(`Look at: ${message}`);
			return false;
		}
		dispatch(templateActions.callUpdate());
		return true;
	};

	const invalidateTemplateTasks = () => {
		queryClient.invalidateQueries("templateTasks");
	};

	console.log(template);

	return (
		<div>
			<Head>
				<title>Template {template?.name}</title>
				<meta
					name="description"
					content="New custom template to add users' repetitive tasks in one place."
				/>
			</Head>
			<TemplatePlanner
				onInvalidateTasks={invalidateTemplateTasks}
				onMutateTemplate={mutateTemplate}
				template={template}
				templateTasks={templateTasks || []}
			/>
		</div>
	);
};

export default TemplatePage;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
	async getServerSideProps (context) {
		const { req, res, query } = context;
		const session = getSession(req, res);
		if (!session || !session.user) {
			return {
				redirect: {
					destination: "/login",
					permanent: false
				}
			};
		}
		const { templateId: initialId } = query;
		const templateId = Array.isArray(initialId) ? initialId.join("") : initialId;
		// Find template based on the userId
		if (!templateId) {
			return {
				notFound: true,
				redirect: { destination: "/" }
			};
		}

		const templateData = await getTemplateFromPage(templateId);
		const template = convertToTemplate(templateData);

		// Need to fetch templateTasks here as well.

		return {
			props: {
				template
			}
		};
	}
});
