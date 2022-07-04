import React, { useState } from 'react';

import {
    CalendarItemType,
    getItemIcon,
} from '../../../../models/calendar-models/CalendarItemType';
import { IEvent } from '../../../../models/Event';
import EventDetail from '../detail/EventDetail';
import EventEdit from '../EventEdit';
import EventStatusToggler from './EventStatusToggler';
import ItemCard from '../../../ui/cards/ItemCard';

interface Props {
    event: IEvent;
    onInvalidate: () => void;
    expand?: boolean;
}

const EventCard: React.FC<Props> = ({ event, onInvalidate, expand = true }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const { dateTime, name, importance, location, status, duration } = event;

    const statusToggler = <EventStatusToggler event={event} onInvalidate={onInvalidate} />;

    return (
        <>
            <ItemCard
                dateTime={dateTime}
                name={name}
                className={'bg-sky-50'}
                importance={importance}
                location={location}
                duration={duration}
                status={status}
                statusToggler={statusToggler}
                expand={expand}
                icon={getItemIcon(CalendarItemType.EVENT, 'text-sky-600/90')}
                onShowDetail={() => setShowDetail(true)}
                onShowEdit={() => setShowEdit(true)}
            />
            {showDetail && (
                <EventDetail
                    event={event}
                    onClose={() => setShowDetail(false)}
                    onInvalidate={onInvalidate}
                />
            )}
            {showEdit && (
                <EventEdit
                    event={event}
                    onClose={() => setShowEdit(false)}
                    onEditEvent={onInvalidate}
                />
            )}
        </>
    );
};

export default EventCard;
