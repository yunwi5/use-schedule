import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAlarmClock,
    faListTree,
    faStarExclamation,
} from '@fortawesome/pro-duotone-svg-icons';

import { updateTaskProperties } from '../../../../lib/planners/tasks-api';
import { AbstractTask } from '../../../../models/task-models/AbstractTask';
import {
    getStatusBgClass,
    getStatusBorderClass,
    getStatusHoverBgClass,
    Status,
} from '../../../../models/task-models/Status';
import { useAppSelector } from '../../../../store/redux';
import { isOverdue } from '../../../../utilities/date-utils/date-check';
import TaskDetail from '../../../tasks/task-modal/task-detail/TaskDetail';
import { PlannerMode } from '../../../../models/planner-models/PlannerMode';
import StatusTogglerButton from '../../../ui/buttons/StatusTogglerButton';
import classes from './TaskCardSmall.module.scss';

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
    const [localTask, setLocalTask] = useState(task);
    const [showDetail, setShowDetail] = useState(false);
    const [localStatus, setLocalStatus] = useState(localTask.status);
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);

    const durationFormat = localTask.durationFormat;
    const { statusBgClass, hoverBgClass, borderClass } = getStyleClasses(
        localStatus,
        plannerMode,
    );

    const handleMutation = (updatedTask: AbstractTask) => {
        setLocalTask(updatedTask);
        onMutate();
    };

    const toggleCompletion = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLocalStatus((prevState) => {
            let newStatus;
            if (prevState === Status.COMPLETED)
                newStatus = isOverdue(localTask.dueDate) ? Status.OVERDUE : Status.OPEN;
            else newStatus = Status.COMPLETED;
            updateStatusHandler(newStatus);
            return newStatus;
        });
    };

    const updateStatusHandler = async (newStatus: Status) => {
        await updateTaskProperties(
            localTask.id,
            { status: newStatus },
            localTask.plannerType || plannerMode,
        );
        onMutate();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLocalStatus(localTask.status);
        }, 1000);
        return () => clearTimeout(timer);
    }, [localTask.status]);

    const showCheckToggler = plannerMode !== PlannerMode.TEMPLATE;

    return (
        <>
            <article
                key={localTask.id}
                style={style}
                onClick={() => setShowDetail(true)}
                className={`z-10 absolute left-[50%] w-[94%] top-0 overflow-y-hidden ${statusBgClass} ${hoverBgClass} ${borderClass} 
                                    px-2 py-1 flex flex-col gap-2 text-slate-600 border-[1px] rounded-md cursor-pointer transition-all shadow-sm hover:!z-50 hover:shadow-lg ${classes.card}`}
            >
                <time className={`text-sm !whitespace-nowrap text-gray-500 font-semibold`}>
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
                <h5 className={`text-base sm:text-lg !leading-[1.3rem]`}>{localTask.name}</h5>
                <div className={`flex flex-col gap-1`}>
                    <p className={`text-[.9rem] hidden sm:inline-block`}>
                        <FontAwesomeIcon
                            icon={faListTree}
                            className={`icon-medium mr-1 text-blue-500`}
                        />
                        {localTask.category}
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faStarExclamation}
                            className={`icon-medium text-amber-500`}
                        />{' '}
                        {localTask.importance}
                    </p>
                </div>
            </article>
            {showDetail && (
                <TaskDetail
                    onEditTask={handleMutation}
                    onInvalidate={onMutate}
                    onClose={setShowDetail.bind(null, false)}
                    task={localTask}
                />
            )}
        </>
    );
};

export default TaskCardSmall;
