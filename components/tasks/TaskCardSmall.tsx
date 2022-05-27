import { faAlarmClock, faListTree, faStarExclamation } from '@fortawesome/pro-duotone-svg-icons';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { updateTaskProperties } from '../../lib/planners/tasks-api';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import {
    getStatusBgClass,
    getStatusBorderClass,
    getStatusHoverBgClass,
    Status,
} from '../../models/task-models/Status';
import { useAppSelector } from '../../store/redux';
import { isTaskOverdue } from '../../utilities/tasks-utils/task-util';
import TaskDetail from './task-modal/task-detail/TaskDetail';

import classes from './TaskCardSmall.module.scss';

interface Props {
    task: AbstractTask;
    onMutate: () => void;
    style: Object;
}

function isOverdue(dueDate: Date | null): boolean {
    if (!dueDate) return false;
    const now = new Date();
    return now.getTime() >= dueDate.getTime();
}

const TaskCardSmall: React.FC<Props> = ({ task, onMutate, style }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [localStatus, setLocalStatus] = useState(task.status);
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);

    const durationFormat = task.durationFormat;
    const statusBgClass = getStatusBgClass(localStatus);
    const hoverBgClass = getStatusHoverBgClass(localStatus);
    const borderClass = getStatusBorderClass(localStatus);

    const toggleCompletion = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLocalStatus((prevState) => {
            let newStatus;
            if (prevState === Status.COMPLETED)
                newStatus = isOverdue(task.dueDate) ? Status.OVERDUE : Status.OPEN;
            else newStatus = Status.COMPLETED;
            updateStatusHandler(newStatus);
            return newStatus;
        });
    };

    const updateStatusHandler = async (newStatus: Status) => {
        await updateTaskProperties(task.id, { status: newStatus }, task.plannerType || plannerMode);
        onMutate();
    };

    return (
        <>
            <article
                key={task.id}
                style={style}
                onClick={() => setShowDetail(true)}
                className={`z-10 absolute left-[50%] w-[94%] top-0 ${statusBgClass} ${hoverBgClass} ${borderClass} 
                                    px-2 py-1 flex flex-col gap-2 text-slate-600 border-[1px] rounded-md cursor-pointer transition-all shadow-sm hover:z-20 hover:shadow-lg ${classes.card}`}
            >
                <time className={`text-sm text-gray-500 font-semibold`}>
                    <FontAwesomeIcon
                        icon={faAlarmClock}
                        className={`text-sky-600/80 icon-medium mr-1`}
                    />
                    {durationFormat}
                </time>
                <div
                    className={`absolute z-30 top-1 right-1 w-[1.9rem] h-[1.9rem] flex-center rounded-full bg-white border-[1.3px] border-slate-300 ${classes['status-checker']}`}
                    onClick={toggleCompletion}
                >
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={`${
                            localStatus === Status.COMPLETED
                                ? 'text-emerald-600'
                                : 'text-emerald-100/90'
                        }`}
                    />
                </div>
                <h5 className={`text-lg !leading-[1.3rem]`}>{task.name}</h5>
                <div className={`flex flex-col gap-1`}>
                    <p className={`text-[.9rem]`}>
                        <FontAwesomeIcon
                            icon={faListTree}
                            className={`icon-medium mr-1 text-blue-500`}
                        />
                        {task.category}
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faStarExclamation}
                            className={`icon-medium text-amber-500`}
                        />{' '}
                        {task.importance}
                    </p>
                </div>
            </article>
            {showDetail && (
                <TaskDetail
                    onClose={setShowDetail.bind(null, false)}
                    onEdit={() => {}}
                    task={task}
                    onInvalidate={onMutate}
                />
            )}
        </>
    );
};

export default TaskCardSmall;
