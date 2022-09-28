import React, { useState } from 'react';
import useNotification from '../useNotification';
import Modal from '../../components/ui/modal/Modal';
import { IEvent, EventProps } from '../../models/Event';
import { deleteEvent, patchEvent } from '../../lib/events/event-apis';
import { NotifStatus } from '../../components/ui/Notification';
import { useQueryClient } from 'react-query';
import { StaticKeys } from '../../constants/query-keys';

interface Props {
    onClose: () => void;
    onInvalidate: () => void;
    event: IEvent;
}

const useEventDelete = ({ onClose, onInvalidate, event }: Props) => {
    const queryClient = useQueryClient();
    const { setNotification } = useNotification();

    const eventDeleteHandler = async () => {
        // send HTTP DELETE request
        const { isSuccess, message } = await deleteEvent(event.id);
        setNotification(NotifStatus.PENDING, 'Deleting Event...');
        if (isSuccess) {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries([StaticKeys.EVENT_QUERY_KEY]);

            // Optimistically update to the new value
            // Need to clean this up.
            queryClient.setQueryData(
                [StaticKeys.EVENT_QUERY_KEY],
                (eventsData: any | undefined) => {
                    const newEvents = (eventsData?.events || []).filter(
                        (e: any) => e.id !== event.id,
                    );
                    return { events: newEvents };
                },
            );

            setNotification(NotifStatus.SUCCESS, message);
            onClose();
        } else {
            setNotification(NotifStatus.ERROR, message);
        }

        isSuccess
            ? setNotification(NotifStatus.SUCCESS, message)
            : setNotification(NotifStatus.ERROR, message);
    };

    return { deleteEvent: eventDeleteHandler };
};

export default useEventDelete;
