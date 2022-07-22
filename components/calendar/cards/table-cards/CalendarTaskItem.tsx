import React, { useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';

import { Status } from '../../../../models/task-models/Status';
import { PlannerTask } from '../../../../models/task-models/Task';
import { TaskProps } from '../../../../models/task-models/TaskProperties';
import TaskDetail from '../../../tasks/task-modal/task-detail/TaskDetail';
import CalendarItemCard from './CalendarItemCard';

interface Props {
    task: PlannerTask;
    onInvalidate: () => void;
}

const CalendarTaskItem: React.FC<Props> = ({ task, onInvalidate }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [localTask, setLocalTask] = useState(task);

    const handleMutation = (props: TaskProps) => {
        setLocalTask((prevTask) => new PlannerTask({ ...prevTask, ...props }));
        onInvalidate();
    };

    return (
        <>
            <CalendarItemCard
                bgClass={'bg-blue-50'}
                textClass={'text-blue-500/80'}
                hoverBgClass={'hover:bg-blue-500/70'}
                hoverTextClass={'hover:text-blue-50'}
                borderClass={'border-blue-500/80'}
                dateTime={localTask.dateTime}
                isCompleted={localTask.status === Status.COMPLETED}
                overdue={localTask.status === Status.OVERDUE}
                itemType={CalendarItemType.TASK}
                onClick={setShowDetail.bind(null, true)}
            >
                {localTask.name}
            </CalendarItemCard>
            {showDetail && (
                <TaskDetail
                    task={localTask}
                    onEditTask={handleMutation}
                    onClose={setShowDetail.bind(null, false)}
                    onInvalidate={onInvalidate}
                />
            )}
        </>
    );
};

export default CalendarTaskItem;
