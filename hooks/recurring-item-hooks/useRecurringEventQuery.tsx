import { useCallback } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';

import useNotification from '../useNotification';
import { NotifStatus } from '../../components/ui/Notification';
import {
    NoIdRecurringEvent,
    RecurringEventProps,
} from '../../models/recurring-models/RecurringEvent';

interface Props {
    onInvalidate(): void;
}

const API_DOMAIN = '/api/recurring/events';

interface PatchConfig {
    recurringId: string;
    props: RecurringEventProps;
    patchGenerated?: boolean;
}

interface DeleteConfig {
    recurringId: string;
    deleteGenerated?: boolean;
}

const useEventAdd = ({ onInvalidate }: Props) => {
    const { setNotification } = useNotification();

    const postMutation = useMutation(
        async (recEvent: NoIdRecurringEvent) => {
            setNotification(NotifStatus.PENDING, 'Posting your recurring event...');
            return await axios.post(`${API_DOMAIN}`, recEvent);
        },
        {
            onSuccess: () => {
                setNotification(NotifStatus.SUCCESS, 'Adding recurring event successful');
                onInvalidate();
            },
            onError: () => {
                setNotification(NotifStatus.ERROR, 'Adding recurring event did not work');
            },
            onSettled: () => {
                setNotification(NotifStatus.SUCCESS, 'Adding recurring event successful');
                console.log('POST was settled...');
            },
        },
    );

    const patchMutation = useMutation(
        async ({ recurringId, props, patchGenerated }: PatchConfig) => {
            setNotification(NotifStatus.PENDING, 'Updating your recurring event...');
            return await axios.patch(
                `${API_DOMAIN}/${recurringId}?${patchGenerated && 'patchGenerated=true'}`,
                props,
            );
        },
        {
            onSuccess: () => {
                setNotification(NotifStatus.SUCCESS, 'Updating recurring event successful');
                // console.log('result:', result);
                onInvalidate();
            },
            onError: () => {
                setNotification(NotifStatus.ERROR, 'Updating recurring event did not work');
                // console.log(result || 'Patching recurring events did not work.');
            },
        },
    );

    const deleteMutation = useMutation(
        async ({ recurringId, deleteGenerated }: DeleteConfig) => {
            setNotification(NotifStatus.PENDING, 'Deleting your recurring event...');
            return await axios.delete(
                `${API_DOMAIN}/${recurringId}?${deleteGenerated && 'deleteGenerated=true'}`,
            );
        },
        {
            onSuccess: (result: any) => {
                setNotification(NotifStatus.SUCCESS, 'Deleting recurring event successful');
                console.log('result:', result);
                onInvalidate();
            },
            onError: (result: any) => {
                setNotification(NotifStatus.ERROR, 'Deleting recurring event did not work');
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

    return { addRecEvent: addHandler, patchRecEvent: patchHandler, deleteRecEvent: deleteHandler };
};

export default useEventAdd;
