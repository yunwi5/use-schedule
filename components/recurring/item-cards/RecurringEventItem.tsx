import React, { useState } from 'react';
import { CalendarItemType, getItemIcon } from '../../../models/calendar-models/CalendarItemType';
import { RecurringEvent } from '../../../models/recurring-models/RecurringEvent';
import RecurringEventEdit from '../crud-operations/RecurringEventEdit';
import RecurringEventDetail from '../item-detail/RecurringEventDetail';
import RecurringItemCard from './RecurringItemCard';

interface Props {
    item: RecurringEvent;
    onInvalidate(): void;
}

const RecurringEventItem: React.FC<Props> = ({ item, onInvalidate }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    return (
        <>
            <RecurringItemCard
                item={item}
                onShowDetail={() => setShowDetail(true)}
                onShowEdit={() => setShowEdit(true)}
                icon={getItemIcon(CalendarItemType.EVENT)}
                location={item.location}
            />
            {showEdit && (
                <RecurringEventEdit
                    initialRecEvent={item}
                    onClose={() => setShowEdit(false)}
                    onEdit={onInvalidate}
                />
            )}
            {showDetail && (
                <RecurringEventDetail
                    recEvent={item}
                    onClose={() => setShowDetail(false)}
                    onInvalidate={onInvalidate}
                />
            )}
        </>
    );
};

export default RecurringEventItem;
