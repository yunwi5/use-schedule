import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlarmClock, faListTree, faStarExclamation } from '@fortawesome/pro-duotone-svg-icons';

import { updateTaskProperties } from '../../lib/planners/tasks-api';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import {
    getStatusBgClass,
    getStatusBorderClass,
    getStatusHoverBgClass,
    Status,
} from '../../models/task-models/Status';
import { useAppSelector } from '../../store/redux';
import { isOverdue } from '../../utilities/date-utils/date-check';
import TaskDetail from './task-modal/task-detail/TaskDetail';

import classes from './TaskCardSmall.module.scss';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import StatusTogglerButton from '../ui/buttons/StatusTogglerButton';

interface Props {
    task: AbstractTask;
    onMutate: () => void;
    style: Object;
}

function getStyleClasses(status: string, plannerMode: PlannerMode | null) {
    const isTemplateTask = plannerMode === PlannerMode.TEMPLATE;
    const statusBgClass = isTemplateTask
        ? getStatusBgClass(Status.COMPLETED)
        : getStatusBgClass(status);
    const hoverBgClass = isTemplateTask
        ? getStatusHoverBgClass(Status.COMPLETED)
        : getStatusHoverBgClass(status);
    const borderClass = isTemplateTask
        ? getStatusBorderClass(Status.COMPLETED)
        : getStatusBorderClass(status);
    return { statusBgClass, hoverBgClass, borderClass };
}

const TaskCardSmall: React.FC<Props> = ({ task, onMutate, style }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [localStatus, setLocalStatus] = useState(task.status);
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);

    const durationFormat = task.durationFormat;
    const { statusBgClass, hoverBgClass, borderClass } = getStyleClasses(localStatus, plannerMode);

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

    const taskStatus = task.status;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLocalStatus(taskStatus);
        }, 1000);
        return () => clearTimeout(timer);
    }, [taskStatus]);

    const showCheckToggler = plannerMode !== PlannerMode.TEMPLATE;

    return (
        <>
            <article
                key={task.id}
                style={style}
                onClick={() => setShowDetail(true)}
                className={`z-10 absolute left-[50%] w-[94%] top-0 ${statusBgClass} ${hoverBgClass} ${borderClass} 
                                    px-2 py-1 flex flex-col gap-2 text-slate-600 border-[1px] rounded-md cursor-pointer transition-all shadow-sm hover:!z-50 hover:shadow-lg ${classes.card}`}
            >
                <time className={`text-sm text-gray-500 font-semibold`}>
                    <FontAwesomeIcon
                        icon={faAlarmClock}
                        className={`text-sky-600/80 icon-medium mr-1`}
                    />
                    {durationFormat}
                </time>
                {showCheckToggler && (
                    <StatusTogglerButton
                        status={localStatus as Status}
                        onToggle={toggleCompletion}
                        className={classes['status-checker']}
                    />
                )}
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
                    task={task}
                    onInvalidate={onMutate}
                />
            )}
        </>
    );
};

export default TaskCardSmall;
