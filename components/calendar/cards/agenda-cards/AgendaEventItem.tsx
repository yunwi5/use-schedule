import React, { useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';
import { IEvent } from '../../../../models/Event';
import { Importance } from '../../../../models/task-models/Status';
import EventDetail from '../../events/detail/EventDetail';
import EventEdit from '../../events/EventEdit';
import AgendaItemCard from './AgendaItemCard';

interface Props {
    item: IEvent;
    onInvalidate(): void;
}

const AgendaEventItem: React.FC<Props> = ({ item, onInvalidate }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    return (
        <>
            <AgendaItemCard
                item={item}
                itemType={CalendarItemType.EVENT}
                status={item.status}
                importance={item.importance || Importance.IMPORTANT}
                location={item.location}
                onShowDetail={() => setShowDetail(true)}
                onShowEdit={() => setShowEdit(true)}
            />
            {showDetail && (
                <EventDetail
                    onClose={() => setShowDetail(false)}
                    onInvalidate={onInvalidate}
                    event={item}
                />
            )}
            {showEdit && (
                <EventEdit
                    event={item}
                    onEditEvent={onInvalidate}
                    onClose={() => setShowEdit(false)}
                />
            )}
        </>
    );
};

export default AgendaEventItem;
