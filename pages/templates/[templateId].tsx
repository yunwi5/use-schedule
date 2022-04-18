import { useCallback, useEffect } from "react";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Claims, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

import { TemplateFormObj, Template } from "../../models/template-models/Template";
import TemplatePlanner from "../../components/templates/TemplatePlanner";
import { Task } from "../../models/task-models/Task";
import { getTemplate, getTemplateTasks, patchTemplate } from "../../lib/templates/templates-api";
import { templateActions } from "../../store/redux/template-slice";
import { getTemplateFromPage, getTemplateTasksFromPage } from "../../db/pages-util";
import { convertToTemplate } from "../../utilities/template-utils/template-util";
import { convertToTasks } from "../../utilities/tasks-utils/task-util";

interface Props {
    template: null | Template;
    templateTasks: Task[];
    user: Claims;
}

const TemplatePage: NextPage<Props> = (props) => {
    const { template: initialTemplate, templateTasks: initialTasks } = props;

    const dispatch = useDispatch();
    const templateId = initialTemplate ? initialTemplate.id : null;

    const queryClient = useQueryClient();
    const { data: templateData, error: templateError } = useQuery(
        ["template", templateId],
        getTemplate,
        {
            enabled: !!templateId,
            initialData: { template: initialTemplate },
        },
    );
    const template: Template | null = templateData ? templateData.template : null;
    if (templateError) {
        console.error("Template query has errors!");
        console.log(templateError);
    }

    const {
        data: taskData,
        isLoading: isTasksLoading,
        error: tasksError,
    } = useQuery(
        ["templateTasks", templateId],
        getTemplateTasks,
        { enabled: !!templateId, initialData: { tasks: initialTasks } }, // false for now, since the API is not implemented yet.
    );
    const templateTasks: Task[] = taskData ? taskData.tasks : null;
    if (tasksError) {
        console.error("TemplateTasks query has errors!");
        console.log(tasksError);
    }

    const mutateTemplate = useCallback(
        async (tempObj: TemplateFormObj, isNew: boolean = false): Promise<boolean> => {
            // No post request needed since the template is already defined at the beginning.
            if (!templateId) return false;
            // Send PUT Request
            // Invalidate query then.
            const { isSuccess } = await patchTemplate(templateId, tempObj);
            queryClient.invalidateQueries("template");
            if (!isSuccess) {
                return false;
            }
            dispatch(templateActions.callUpdate());
            return true;
        },
        [queryClient, dispatch, templateId],
    );

    const invalidateTemplateTasks = useCallback(() => {
        queryClient.invalidateQueries("templateTasks");
    }, [queryClient]);

    useEffect(() => {
        if (template) {
            dispatch(templateActions.setActiveTemplate(template));
        }
    }, [template, dispatch]);

    return (
        <div>
            <Head>
                <title>Template {template ? template.name : "Unknown"}</title>
                <meta
                    name='description'
                    content='New custom template to add users&#39; repetitive tasks in one place.'
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
    async getServerSideProps(context) {
        const { req, res, query } = context;
        const session = getSession(req, res);
        if (!session || !session.user) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }
        const { templateId: initialId } = query;
        const templateId = Array.isArray(initialId) ? initialId.join("") : initialId;
        // Find template based on the userId
        if (!templateId) {
            return {
                notFound: true,
                redirect: { destination: "/" },
            };
        }

        const templateP = getTemplateFromPage(templateId);
        const templateTasksP = getTemplateTasksFromPage(templateId);

        const [templateData, templateTasksData] = await Promise.all([templateP, templateTasksP]);
        const template = convertToTemplate(templateData);
        const templateTasks = templateTasksData ? convertToTasks(templateTasksData) : [];

        return {
            props: {
                template,
                templateTasks,
            },
        };
    },
});
