import { useCallback } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';

import useNotification from '../useNotification';
import { NotifStatus } from '../../components/ui/Notification';
import {
    NoIdRecurringEvent,
    RecurringEventProps,
} from '../../models/recurring-models/RecurringEvent';
import { useAppSelector } from '../../store/redux';
import { RecurringItemMode } from '../../models/recurring-models';
import {
    getRecurringDeleteQueryParam,
    getRecurringPatchQueryParam,
} from '../../utilities/gen-utils/query-util';

interface Props {
    onInvalidate(): void;
}

const EVENT_API_DOMAIN = '/api/recurring/events';
const TASK_API_DOMAIN = '/api/recurring/tasks';

interface PatchConfig {
    recurringId: string;
    props: RecurringEventProps;
    patchGenerated?: boolean;
}

interface DeleteConfig {
    recurringId: string;
    deleteGenerated?: boolean;
}

const useApiDomain = () => {
    const mode = useAppSelector((state) => state.recurring.mode);
    if (mode === RecurringItemMode.EVENT)
        return { domain: EVENT_API_DOMAIN, itemType: mode.toLowerCase() };
    return { domain: TASK_API_DOMAIN, itemType: mode.toLowerCase() };
};

const useRecurringItemQuery = ({ onInvalidate }: Props) => {
    const { setNotification } = useNotification();

    const postMutation = useMutation(
        async (recEvent: NoIdRecurringEvent) => {
            setNotification(NotifStatus.PENDING, `Posting your recurring event...`);
            return await axios.post(`${EVENT_API_DOMAIN}`, recEvent);
        },
        {
            onSuccess: () => {
                setNotification(NotifStatus.SUCCESS, `Adding recurring event successful`);
                onInvalidate();
            },
            onError: () => {
                setNotification(NotifStatus.ERROR, `Adding recurring event did not work`);
            },
            onSettled: () => {
                setNotification(NotifStatus.SUCCESS, `Adding recurring event successful`);
                onInvalidate();
            },
        },
    );

    const patchMutation = useMutation(
        async ({ recurringId, props, patchGenerated }: PatchConfig) => {
            setNotification(NotifStatus.PENDING, `Updating your recurring event...`);
            const queryParams = getRecurringPatchQueryParam(patchGenerated);
            return await axios.patch(
                `${EVENT_API_DOMAIN}/${recurringId}?${queryParams}`,
                props,
            );
        },
        {
            onSuccess: () => {
                setNotification(NotifStatus.SUCCESS, `Updating recurring event successful`);
                onInvalidate();
            },
            onSettled: () => {
                setNotification(NotifStatus.SUCCESS, `Updating recurring event successful`);
                onInvalidate();
            },
            onError: () => {
                setNotification(NotifStatus.ERROR, `Updating recurring event did not work`);
            },
        },
    );

    const deleteMutation = useMutation(
        async ({ recurringId, deleteGenerated }: DeleteConfig) => {
            setNotification(NotifStatus.PENDING, `Deleting your recurring event...`);
            const queryParams = getRecurringDeleteQueryParam(deleteGenerated);
            return await axios.delete(`${EVENT_API_DOMAIN}/${recurringId}?${queryParams}`);
        },
        {
            onSuccess: (result: any) => {
                setNotification(NotifStatus.SUCCESS, `Deleting recurring event successful`);
                onInvalidate();
            },
            onError: (result: any) => {
                setNotification(NotifStatus.ERROR, `Deleting recurring event did not work`);
            },
        },
    );

    const addHandler = useCallback(
        (recEvent: NoIdRecurringEvent) => {
            postMutation.mutate(recEvent);
        },
        [postMutation],
    );

    const patchHandler = useCallback(
        async (
            recurringId: string,
            props: RecurringEventProps,
            patchGenerated: boolean = true,
        ) => {
            patchMutation.mutate({ recurringId, props, patchGenerated });
        },
        [patchMutation],
    );

    const deleteHandler = useCallback(
        async (recurringId: string, deleteGenerated?: boolean) => {
            deleteMutation.mutate({ recurringId, deleteGenerated });
        },
        [deleteMutation],
    );

    return {
        addRecEvent: addHandler,
        patchRecEvent: patchHandler,
        deleteRecEvent: deleteHandler,
    };
};

export default useRecurringItemQuery;
