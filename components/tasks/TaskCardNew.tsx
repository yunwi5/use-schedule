import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAlarmClock,
    faCircleExclamationCheck,
    faHourglass,
    faListTree,
    faStar,
} from '@fortawesome/pro-duotone-svg-icons';

import { CalendarItemType, getItemIcon } from '../../models/calendar-models/CalendarItemType';
import {
    getDurationFormat,
    getEventDateTimeFormat,
} from '../../utilities/date-utils/date-format';
import ItemCardButtons from '../ui/buttons/ItemCardButtons';
import TaskDetail from './task-modal/task-detail/TaskDetail';
import TaskEdit from '../planners/planner-crud/TaskEdit';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import TaskStatusToggler from './task-support/TaskStatusToggler';

interface Props {
    task: AbstractTask;
    onInvalidate: () => void;
    expand?: boolean;
    className?: string;
}

const leftBorderClass = 'sm:pl-5 sm:border-l-[3px] sm:border-l-slate-400';

// New version of task card that is responsive
const TaskCard: React.FC<Props> = ({ task, onInvalidate, expand = true, className = '' }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const { dateTime, name, importance, status, duration, category } = task;

    const statusClass = 'status-' + status.toLowerCase().replace(' ', '');

    return (
        <>
            <article
                className={`relative flex flex-col text-slate-700 gap-1 sm:gap-4 px-2 lg:px-4 pl-3 lg:pl-7 py-2 overflow-hidden bg-blue-50  rounded-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer ${className}`}
            >
                <div
                    className={`absolute top-0 left-0 w-[1.05%] h-full z-0 ${statusClass}-bg`}
                ></div>
                <div className={`text-slate-500 font-bold text-base`}>
                    <FontAwesomeIcon
                        icon={faAlarmClock}
                        className={`text-slate-900 icon-medium mr-2`}
                    />
                    <time>{getEventDateTimeFormat(dateTime)}</time>
                    <span className={`inline-block ml-4 text-slate-500/90`}>
                        <FontAwesomeIcon icon={faHourglass} className="icon-medium mr-2" />
                        {getDurationFormat(duration)}
                    </span>
                    <TaskStatusToggler task={task} onInvalidate={onInvalidate} />
                </div>
                <div>
                    <h3 className={'text-lg sm:text-xl'} onClick={() => setShowDetail(true)}>
                        <span className={`text-blue-600`}>
                            {getItemIcon(CalendarItemType.TASK)}
                        </span>
                        {name}
                    </h3>
                </div>
                {expand && (
                    <div
                        className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5 text-base sm:text-lg overflow-hidden`}
                    >
                        <span className={'inline-block'}>
                            <FontAwesomeIcon
                                icon={faStar}
                                className={'icon-medium text-amber-500'}
                            />{' '}
                            {importance}
                        </span>
                        <span className={`inline-block ${statusClass} ${leftBorderClass}`}>
                            <FontAwesomeIcon
                                icon={faCircleExclamationCheck}
                                className={'icon-medium'}
                            />{' '}
                            {status}
                        </span>
                        {category && (
                            <span
                                className={
                                    'inline-block sm:pl-5 sm:border-l-[3px] sm:border-l-slate-400'
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faListTree}
                                    className={'icon-medium mr-2 text-blue-600/90'}
                                />
                                {category}
                            </span>
                        )}
                    </div>
                )}
                <ItemCardButtons
                    onShowDetail={() => setShowDetail(true)}
                    onShowEdit={() => setShowEdit(true)}
                />
            </article>
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
