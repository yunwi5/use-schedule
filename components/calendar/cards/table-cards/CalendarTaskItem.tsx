import React, { useCallback, useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';

import { Status } from '../../../../models/task-models/Status';
import { PlannerTask } from '../../../../models/task-models/Task';
import PlannerTaskEdit from '../../../planners/planner-crud/TaskEdit';
import TaskDetail from '../../../tasks/task-modal/task-detail/TaskDetail';
import CalendarItemCard from './CalendarItemCard';

interface Props {
    task: PlannerTask;
    onInvalidate: () => void;
}

const CalendarTaskItem: React.FC<Props> = ({ task, onInvalidate }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const editHandler = useCallback(() => {
        setShowEditForm(true);
        setShowDetail(false);
    }, []);
    const updateHandler = (updateTask?: PlannerTask) => {
        onInvalidate();
    };

    return (
        <>
            <CalendarItemCard
                bgClass={'bg-white'}
                textClass={'text-blue-500/80'}
                hoverBgClass={'hover:bg-blue-500/70'}
                hoverTextClass={'hover:text-blue-50'}
                borderClass={'border-blue-500/80'}
                dateTime={task.dateTime}
                isCompleted={task.status === Status.COMPLETED}
                dueDate={task.dueDate}
                itemType={CalendarItemType.TASK}
                onClick={setShowDetail.bind(null, true)}
            >
                {task.name}
            </CalendarItemCard>
            {showDetail && (
                <TaskDetail
                    task={task}
                    onClose={setShowDetail.bind(null, false)}
                    onEdit={editHandler}
                    onInvalidate={onInvalidate}
                />
            )}
            {showEditForm && (
                <PlannerTaskEdit
                    initialTask={task}
                    onClose={setShowEditForm.bind(null, false)}
                    beginningPeriod={task.dateTime}
                    onUpdate={updateHandler}
                />
            )}
        </>
    );
};

export default CalendarTaskItem;
