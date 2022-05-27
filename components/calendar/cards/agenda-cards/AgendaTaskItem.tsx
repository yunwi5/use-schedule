import React, { useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';

import { Importance, Status } from '../../../../models/task-models/Status';
import { PlannerTask } from '../../../../models/task-models/Task';
import PlannerTaskEdit from '../../../planners/planner-crud/TaskEdit';
import TaskDetail from '../../../tasks/task-modal/task-detail/TaskDetail';
import AgendaItemCard from './AgendaItemCard';

interface Props {
    item: PlannerTask;
    onInvalidate: () => void;
}

const AgendaTaskItem: React.FC<Props> = ({ item, onInvalidate }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const showDetailCurry = (show: boolean) => () => setShowDetail(show);
    const showEditCurry = (show: boolean) => () => setShowEdit(show);

    return (
        <>
            <AgendaItemCard
                item={item}
                itemType={CalendarItemType.TASK}
                status={item.status as Status}
                importance={item.importance as Importance}
                category={item.category}
                subCategory={item.subCategory}
                onShowDetail={showDetailCurry(true)}
                onShowEdit={showEditCurry(true)}
            />
            {showDetail && (
                <TaskDetail
                    task={item}
                    onClose={showDetailCurry(false)}
                    onInvalidate={onInvalidate}
                />
            )}
            {showEdit && (
                <PlannerTaskEdit
                    initialTask={item}
                    onClose={showEditCurry(false)}
                    beginningPeriod={item.dateTime}
                    onUpdate={onInvalidate}
                />
            )}
        </>
    );
};

export default AgendaTaskItem;
