import React, { useState } from 'react';
import { CalendarItemType, getItemIcon } from '../../../models/calendar-models/CalendarItemType';
import { RecurringTask } from '../../../models/recurring-models/RecurringTask';
import RecurringTaskEdit from '../crud-operations/RecurringTaskEdit';
import RecurringItemCard from './RecurringItemCard';

interface Props {
    item: RecurringTask;
    onInvalidate(): void;
}

const RecurringTaskItem = ({ item, onInvalidate }: Props) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    return (
        <>
            <RecurringItemCard
                item={item}
                onShowDetail={() => setShowDetail(true)}
                onShowEdit={() => setShowEdit(true)}
                icon={getItemIcon(CalendarItemType.TASK)}
                category={item.category}
            />
            {showEdit && (
                <RecurringTaskEdit
                    initialRecTask={item}
                    onClose={() => setShowEdit(false)}
                    onEdit={onInvalidate}
                />
            )}
            {/* {showDetail && (
                <RecurringEventDetail
                    recEvent={item}
                    onClose={() => setShowDetail(false)}
                    onInvalidate={onInvalidate}
                />
            )} */}
        </>
    );
};

export default RecurringTaskItem;
