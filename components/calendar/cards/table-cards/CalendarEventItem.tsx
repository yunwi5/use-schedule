import React, { useState } from 'react';
import { Event } from '../../../../models/Event';
import { Status } from '../../../../models/task-models/Status';
import EventDetail from '../../events/detail/EventDetail';
import EventEdit from '../../events/EventEdit';
import CalendarItemCard from './CalendarItemCard';

interface Props {
    event: Event;
    onInvalidate(): void;
}

const CalendarEventItem: React.FC<Props> = (props) => {
    const { event, onInvalidate } = props;

    //TODO: need to be implemented.
    const [showDetail, setShowDetail] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    return (
        <>
            <CalendarItemCard
                bgClass={`bg-white`}
                textClass={`text-sky-700`}
                hoverBgClass={`hover:bg-sky-500/70`}
                hoverTextClass={`hover:text-sky-50`}
                dateTime={event.dateTime}
                isCompleted={event.status === Status.COMPLETED}
                dueDate={event.dateTime}
                onClick={setShowDetail.bind(null, true)}
            >
                {event.name}
            </CalendarItemCard>
            {showEditForm && (
                <EventEdit
                    onClose={setShowEditForm.bind(null, false)}
                    onEditEvent={onInvalidate}
                    event={event}
                />
            )}
            {showDetail && (
                <EventDetail
                    onClose={setShowDetail.bind(null, false)}
                    onInvalidate={onInvalidate}
                    event={event}
                />
            )}
        </>
    );
};

export default CalendarEventItem;
