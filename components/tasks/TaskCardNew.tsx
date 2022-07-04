import React, { useState } from 'react';

import { CalendarItemType, getItemIcon } from '../../models/calendar-models/CalendarItemType';
import TaskDetail from './task-modal/task-detail/TaskDetail';
import TaskEdit from '../planners/planner-crud/TaskEdit';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import TaskStatusToggler from './task-support/TaskStatusToggler';
import ItemCard from '../ui/cards/ItemCard';

interface Props {
    task: AbstractTask;
    onInvalidate: () => void;
    expand?: boolean;
    className?: string;
}

// New version of task card that is responsive
const TaskCard: React.FC<Props> = ({ task, onInvalidate, expand, className = '' }) => {
    const { dateTime, name, importance, status, duration, category } = task;
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const statusToggler = <TaskStatusToggler task={task} onInvalidate={onInvalidate} />;

    return (
        <>
            <ItemCard
                dateTime={dateTime}
                name={name}
                importance={importance}
                status={status}
                duration={duration}
                icon={getItemIcon(CalendarItemType.TASK, 'text-blue-600/90 mr-2')}
                statusToggler={statusToggler}
                className={className || 'bg-blue-50'}
                category={category}
                expand={expand}
                onShowDetail={() => setShowDetail(true)}
                onShowEdit={() => setShowEdit(true)}
            />
            {showDetail && (
                <TaskDetail
                    task={task}
                    onClose={() => setShowDetail(false)}
                    onInvalidate={onInvalidate}
                />
            )}
            {showEdit && (
                <TaskEdit
                    initialTask={task}
                    onClose={() => setShowEdit(false)}
                    onUpdate={onInvalidate}
                />
            )}
        </>
    );
};

export default TaskCard;
