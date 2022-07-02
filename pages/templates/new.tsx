// import type {NextPage} from 'next'
import { useState, useDebugValue, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Claims, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { TemplateFormObj, Template } from '../../models/template-models/Template';
import TemplatePlanner from '../../components/templates/TemplatePlanner';
import { Task } from '../../models/task-models/Task';
import {
    getTemplate,
    getTemplateTasks,
    patchTemplate,
    postTemplate,
} from '../../lib/templates/templates-api';
import { templateActions } from '../../store/redux/template-slice';
import { AppProperty } from '../../constants/global-constants';

interface Props {
    userId: string;
    template: null;
    user: Claims;
}

const New: React.FC<Props> = ({ userId, user }) => {
    const [templateId, setTemplateId] = useState<string>('');
    useDebugValue(templateId);
    const dispatch = useDispatch();

    const queryClient = useQueryClient();
    const {
        data: templateData,
        isLoading: isTemplateLoading,
        error: templateError,
    } = useQuery(['template', templateId], getTemplate, {
        enabled: !!templateId,
    });
    const template: Template | null = templateData ? templateData.template : null;
    if (!!templateError) {
        console.error('Template query has errors!');
        console.log(templateError);
    }

    const {
        data: taskData,
        isLoading: isTasksLoading,
        error: tasksError,
    } = useQuery(
        ['templateTasks', templateId],
        getTemplateTasks,
        { enabled: !!templateId }, // false for now, since the API is not implemented yet.
    );
    const templateTasks: Task[] = taskData ? taskData.tasks : null;
    if (tasksError) {
        console.error('TemplateTasks query has errors!');
        console.log(tasksError);
    }

    const mutateTemplate = async (
        tempObj: TemplateFormObj,
        isNew: boolean = true,
    ): Promise<boolean> => {
        // http request to post new template.
        if (isNew) {
            const newTemplate = { ...tempObj, userId };
            // Send POST Request
            // Unique Id will be retried as a reponse from the server.
            const { isSuccess, message, insertedId } = await postTemplate(newTemplate);
            if (isSuccess && insertedId) {
                setTemplateId(insertedId);
            } else return false;
        } else {
            if (!templateId) return false;
            // Send PUT Request
            // Invalidate query then.
            const { isSuccess, message } = await patchTemplate(templateId, tempObj);
            queryClient.invalidateQueries('template');
            if (!isSuccess) return false;
        }
        dispatch(templateActions.callUpdate());

        return true;
    };

    const invalidateTemplateTasks = () => {
        queryClient.invalidateQueries('templateTasks');
    };

    useEffect(() => {
        if (template) {
            dispatch(templateActions.setActiveTemplate(template));
        }
    }, [template, dispatch]);

    return (
        <div>
            <Head>
                <title>New Template | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="New custom template to add users&#39; repetitive tasks in one place."
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

export default New;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const { req, res } = context;
        const session = getSession(req, res);

        if (!session) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }
        const userId = session.user.sub;
        return {
            props: {
                userId,
                template: null,
            },
        };
    },
});
