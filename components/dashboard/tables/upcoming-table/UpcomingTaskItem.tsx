import React, { useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';
import { AbstractTask } from '../../../../models/task-models/AbstractTask';
import TaskDetail from '../../../tasks/task-modal/task-detail/TaskDetail';
import UpcomingItemCard from '../../cards/UpcomingItemCard';
import { useDashboardContext } from '../../../../store/context/dashboard-context';
import TaskEdit from '../../../planners/planner-crud/TaskEdit';

interface Props {
    task: AbstractTask;
}

const UpcomingTaskItem: React.FC<Props> = ({ task }) => {
    const { onInvalidate } = useDashboardContext();
    const [localTask, setLocalTask] = useState(task);

    const [showDetail, setShowDetail] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleMutation = (updatedTask: AbstractTask) => {
        setLocalTask(updatedTask);
        onInvalidate();
    };

    return (
        <>
            <UpcomingItemCard
                item={localTask}
                itemType={CalendarItemType.TASK}
                onShowDetail={setShowDetail.bind(null, true)}
            />
            {showDetail && (
                <TaskDetail
                    task={localTask}
                    onEditTask={handleMutation}
                    onClose={setShowDetail.bind(null, false)}
                    onInvalidate={onInvalidate}
                />
            )}
            {showEditForm && (
                <TaskEdit
                    initialTask={localTask}
                    onUpdate={handleMutation}
                    onDelete={onInvalidate}
                    onClose={setShowEditForm.bind(null, false)}
                    beginningPeriod={localTask.dateTime}
                />
            )}
        </>
    );
};

export default UpcomingTaskItem;
