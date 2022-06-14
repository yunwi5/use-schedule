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
    const { domain, itemType } = useApiDomain();

    const postMutation = useMutation(
        async (recEvent: NoIdRecurringEvent) => {
            setNotification(NotifStatus.PENDING, `Posting your recurring ${itemType}...`);
            return await axios.post(`${domain}`, recEvent);
        },
        {
            onSuccess: () => {
                setNotification(NotifStatus.SUCCESS, `Adding recurring ${itemType} successful`);
                onInvalidate();
            },
            onError: () => {
                setNotification(NotifStatus.ERROR, `Adding recurring ${itemType} did not work`);
            },
            onSettled: () => {
                setNotification(NotifStatus.SUCCESS, `Adding recurring ${itemType} successful`);
                console.log('POST was settled...');
                onInvalidate();
            },
        },
    );

    const patchMutation = useMutation(
        async ({ recurringId, props, patchGenerated }: PatchConfig) => {
            setNotification(NotifStatus.PENDING, `Updating your recurring ${itemType}...`);
            return await axios.patch(
                `${domain}/${recurringId}?${patchGenerated && 'patchGenerated=true'}`,
                props,
            );
        },
        {
            onSuccess: () => {
                setNotification(NotifStatus.SUCCESS, `Updating recurring ${itemType} successful`);
                // console.log('result:', result);
                console.log('call onInvalidate');
                onInvalidate();
            },
            onSettled: () => {
                setNotification(NotifStatus.SUCCESS, `Updating recurring ${itemType} successful`);
                // console.log('result:', result);
                console.log('call onInvalidate');
                onInvalidate();
            },
            onError: () => {
                setNotification(NotifStatus.ERROR, `Updating recurring ${itemType} did not work`);
                // console.log(result || 'Patching recurring events did not work.');
            },
        },
    );

    const deleteMutation = useMutation(
        async ({ recurringId, deleteGenerated }: DeleteConfig) => {
            setNotification(NotifStatus.PENDING, `Deleting your recurring ${itemType}...`);
            return await axios.delete(
                `${domain}/${recurringId}?${deleteGenerated && 'deleteGenerated=true'}`,
            );
        },
        {
            onSuccess: (result: any) => {
                setNotification(NotifStatus.SUCCESS, `Deleting recurring ${itemType} successful`);
                console.log('result:', result);
                onInvalidate();
            },
            onError: (result: any) => {
                setNotification(NotifStatus.ERROR, `Deleting recurring ${itemType} did not work`);
                console.log(result);
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
        async (recurringId: string, props: RecurringEventProps, patchGenerated: boolean = true) => {
            console.log('Patch');
            patchMutation.mutate({ recurringId, props, patchGenerated });
        },
        [patchMutation],
    );

    const deleteHandler = useCallback(
        async (recurringId: string, deleteGenerated?: boolean) => {
            console.log('Delete');
            deleteMutation.mutate({ recurringId, deleteGenerated });
        },
        [deleteMutation],
    );

    return { addRecItem: addHandler, patchRecItem: patchHandler, deleteRecItem: deleteHandler };
};

export default useRecurringItemQuery;
