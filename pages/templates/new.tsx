// import type {NextPage} from 'next'
import { useState, useEffect } from 'react';
import Head from 'next/head';
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
import useAuthNavigate from '../../hooks/useAuth';

interface Props {}

const New: React.FC<Props> = () => {
    const { user } = useAuthNavigate();
    const userId = user?.sub;

    const [templateId, setTemplateId] = useState<string>('');
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
        if (userId == null) return new Promise<boolean>((resolve) => resolve(true));
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
