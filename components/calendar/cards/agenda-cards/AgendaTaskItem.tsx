import React, { useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';
import { AbstractTask } from '../../../../models/task-models/AbstractTask';

import { Importance, Status } from '../../../../models/task-models/Status';
import PlannerTaskEdit from '../../../planners/planner-crud/TaskEdit';
import TaskDetail from '../../../tasks/task-modal/task-detail/TaskDetail';
import AgendaItemCard from './AgendaItemCard';

interface Props {
    item: AbstractTask;
    onInvalidate: () => void;
}

const AgendaTaskItem: React.FC<Props> = ({ item, onInvalidate }) => {
    const [localTask, setLocalTask] = useState(item);
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleMutation = (updatedTask: AbstractTask) => {
        setLocalTask(updatedTask);
        onInvalidate();
    };

    const showDetailCurry = (show: boolean) => () => setShowDetail(show);
    const showEditCurry = (show: boolean) => () => setShowEdit(show);

    return (
        <>
            <AgendaItemCard
                item={localTask}
                itemType={CalendarItemType.TASK}
                status={localTask.status as Status}
                importance={localTask.importance as Importance}
                category={localTask.category}
                subCategory={localTask.subCategory}
                onShowDetail={showDetailCurry(true)}
                onShowEdit={showEditCurry(true)}
            />
            {showDetail && (
                <TaskDetail
                    task={localTask}
                    onEditTask={handleMutation}
                    onClose={showDetailCurry(false)}
                    onInvalidate={onInvalidate}
                />
            )}
            {showEdit && (
                <PlannerTaskEdit
                    initialTask={localTask}
                    onDelete={onInvalidate}
                    onClose={showEditCurry(false)}
                    beginningPeriod={localTask.dateTime}
                    onUpdate={onInvalidate}
                />
            )}
        </>
    );
};

export default AgendaTaskItem;
