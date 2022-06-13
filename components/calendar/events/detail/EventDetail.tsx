import React, { useState } from 'react';

import { IEvent } from '../../../../models/Event';
import ExitIcon from '../../../ui/icons/ExitIcon';
import EventEdit from '../EventEdit';
import WrapperModal from '../../../ui/modal/wrapper/WrapperModal';
import useEventDelete from '../../../../hooks/event-hooks/useEventDelete';
import OperationList from '../../../ui/OperationList';
import EventDuplicate from '../EventDuplicate';
import {
    EventLocation,
    EventDateTime,
    EventDuration,
    EventDescription,
    EventImportance,
    MeetingLink,
    EventStatus,
    EventHeading,
    EventParticipants,
} from './detail-parts';
import RecurringEventAdd from '../../../recurring/crud-operations/RecurringEventAdd';
import RecurringEventDuplicate from '../../../recurring/crud-operations/RecurringEventDuplicate';

interface Props {
    onClose(): void;
    onInvalidate(): void;
    event: IEvent;
}

const EventDetail: React.FC<Props> = (props) => {
    const { onClose, onInvalidate, event } = props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showRecurringModal, setShowRecurringModal] = useState(false);
    const { deleteEvent } = useEventDelete({ onClose, event, onInvalidate });

    const { participants } = event;

    const editEventHandler = () => {
        setShowEditModal(false);
        onInvalidate();
    };

    const eventDuplicateHandler = () => {
        setShowDuplicateModal(false);
        onInvalidate();
    };

    const recurringHandler = () => {};

    return (
        <>
            <WrapperModal onClose={onClose}>
                <article className="min-h-[27rem] relative flex flex-col gap-3 justify-between text-slate-600">
                    <EventHeading event={event} />
                    <ExitIcon onClose={onClose} className={'!-translate-y-[2px]'} />
                    <div className="overflow-y-scroll overflow-x-hidden flex-1 flex flex-col gap-3 lg:px-3 text-lg">
                        <EventLocation event={event} />
                        <MeetingLink event={event} />
                        {!!participants?.length && <EventParticipants event={event} />}
                        <div
                            className={`grid grid-cols-2 grid-rows-2 justify-between gap-4 gap-x-2 sm:gap-x-4`}
                        >
                            <EventDateTime event={event} />
                            <EventDuration event={event} />
                            <EventStatus event={event} onEdit={onInvalidate} />
                            <EventImportance event={event} />
                        </div>
                        <EventDescription event={event} />
                    </div>
                    <div className="mt-3 lg:px-3">
                        <OperationList
                            onEdit={() => setShowEditModal(true)}
                            onDelete={deleteEvent}
                            onRecurring={() => setShowRecurringModal(true)}
                            onDuplicate={() => setShowDuplicateModal(true)}
                        />
                    </div>
                </article>
            </WrapperModal>
            {showEditModal && (
                <EventEdit
                    onClose={() => setShowEditModal(false)}
                    onEditEvent={editEventHandler}
                    event={event}
                />
            )}
            {showDuplicateModal && (
                <EventDuplicate
                    onClose={() => setShowDuplicateModal(false)}
                    event={event}
                    onDuplicate={eventDuplicateHandler}
                />
            )}
            {showRecurringModal && (
                <RecurringEventDuplicate
                    onClose={() => setShowRecurringModal(false)}
                    onDuplicate={onInvalidate}
                    initialRecEvent={event}
                />
            )}
        </>
    );
};

export default EventDetail;
