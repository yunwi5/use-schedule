import { useCallback } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';

import useNotification from '../useNotification';
import { NotifStatus } from '../../components/ui/Notification';
import {
    NoIdRecurringTask,
    RecurringTaskProps,
} from '../../models/recurring-models/RecurringTask';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import {
    getRecurringDeleteQueryParam,
    getRecurringPatchQueryParam,
} from '../../utilities/gen-utils/query-util';

interface Props {
    onInvalidate(): void;
}

const API_DOMAIN = '/api/recurring/tasks';

interface PatchConfig {
    recurringId: string;
    props: RecurringTaskProps;
    patchGenerated?: boolean;
    plannerMode: PlannerMode;
}

interface DeleteConfig {
    recurringId: string;
    deleteGenerated?: boolean;
    plannerMode: PlannerMode;
}

const useRecurringTaskQuery = ({ onInvalidate }: Props) => {
    const { setNotification } = useNotification();

    const postMutation = useMutation(
        async (recTask: NoIdRecurringTask) => {
            setNotification(NotifStatus.PENDING, `Posting your recurring task...`);
            return await axios.post(`${API_DOMAIN}`, recTask);
        },
        {
            onSuccess: () => {
                setNotification(NotifStatus.SUCCESS, `Adding recurring task successful`);
                onInvalidate();
            },
            onError: () => {
                setNotification(NotifStatus.ERROR, `Adding recurring task did not work`);
            },
            onSettled: () => {
                setNotification(NotifStatus.SUCCESS, `Adding recurring task successful`);
                onInvalidate();
            },
        },
    );

    const patchMutation = useMutation(
        async ({ recurringId, props, patchGenerated, plannerMode }: PatchConfig) => {
            setNotification(NotifStatus.PENDING, `Updating your recurring task...`);
            const queryParams = getRecurringPatchQueryParam(patchGenerated, plannerMode);
            return await axios.patch(`${API_DOMAIN}/${recurringId}?${queryParams}`, props);
        },
        {
            onSuccess: () => {
                setNotification(NotifStatus.SUCCESS, `Updating recurring task successful`);
                onInvalidate();
            },
            onSettled: () => {
                setNotification(NotifStatus.SUCCESS, `Updating recurring task successful`);
                onInvalidate();
            },
            onError: () => {
                setNotification(NotifStatus.ERROR, `Updating recurring task did not work`);
            },
        },
    );

    const deleteMutation = useMutation(
        async ({ recurringId, deleteGenerated, plannerMode }: DeleteConfig) => {
            setNotification(NotifStatus.PENDING, `Deleting your recurring task...`);
            const queryParams = getRecurringDeleteQueryParam(deleteGenerated, plannerMode);
            return await axios.delete(`${API_DOMAIN}/${recurringId}?${queryParams}`);
        },
        {
            onSuccess: (result: any) => {
                setNotification(NotifStatus.SUCCESS, `Deleting recurring task successful`);
                onInvalidate();
            },
            onError: () => {
                setNotification(NotifStatus.ERROR, `Deleting recurring task did not work`);
            },
        },
    );

    const addHandler = useCallback(
        (recTask: NoIdRecurringTask) => {
            postMutation.mutate(recTask);
            return true;
        },
        [postMutation],
    );

    const patchHandler = useCallback(
        async (
            recurringId: string,
            props: RecurringTaskProps,
            patchGenerated,
            plannerMode: PlannerMode,
        ) => {
            patchMutation.mutate({ recurringId, props, patchGenerated, plannerMode });
        },
        [patchMutation],
    );

    const deleteHandler = useCallback(
        async (recurringId: string, deleteGenerated: boolean, plannerMode: PlannerMode) => {
            deleteMutation.mutate({ recurringId, deleteGenerated, plannerMode });
        },
        [deleteMutation],
    );

    return {
        addRecTask: addHandler,
        patchRecTask: patchHandler,
        deleteRecTask: deleteHandler,
    };
};

export default useRecurringTaskQuery;
