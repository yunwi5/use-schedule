import React, { useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';

import { Status } from '../../../../models/task-models/Status';
import { PlannerTask } from '../../../../models/task-models/Task';
import TaskDetail from '../../../tasks/task-modal/task-detail/TaskDetail';
import CalendarItemCard from './CalendarItemCard';

interface Props {
    task: PlannerTask;
    onInvalidate: () => void;
}

const CalendarTaskItem: React.FC<Props> = ({ task, onInvalidate }) => {
    const [showDetail, setShowDetail] = useState(false);
    // const [localTask, setLocalTask] = useState(task);

    return (
        <>
            <CalendarItemCard
                bgClass={'bg-blue-50'}
                textClass={'text-blue-500/80'}
                hoverBgClass={'hover:bg-blue-500/70'}
                hoverTextClass={'hover:text-blue-50'}
                borderClass={'border-blue-500/80'}
                dateTime={task.dateTime}
                isCompleted={task.status === Status.COMPLETED}
                overdue={task.status === Status.OVERDUE}
                itemType={CalendarItemType.TASK}
                onClick={setShowDetail.bind(null, true)}
            >
                {task.name}
            </CalendarItemCard>
            {showDetail && (
                <TaskDetail
                    task={task}
                    onClose={setShowDetail.bind(null, false)}
                    onInvalidate={onInvalidate}
                />
            )}
        </>
    );
};

export default CalendarTaskItem;
