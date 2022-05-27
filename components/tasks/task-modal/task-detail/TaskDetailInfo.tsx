import { useState } from 'react';
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAlarmClock,
    faCalendarExclamation,
    faDiagramNested,
    faHourglass,
    faListTree,
    faStarExclamation,
    faHourglassEnd,
    faMemoCircleInfo,
} from '@fortawesome/pro-duotone-svg-icons';

import { AbstractTask } from '../../../../models/task-models/AbstractTask';
import {
    getDateTimeFormat,
    getDurationFormat,
    getFullDateFormat,
} from '../../../../utilities/date-utils/date-format';
import { getImportanceValue } from '../../../../models/task-models/Status';
import { PlannerMode } from '../../../../models/planner-models/PlannerMode';
import classes from './TaskDetail.module.scss';
import TaskStatus from './TaskStatus';
import OperationList from '../../../ui/OperationList';
import useTaskDelete from '../../../../hooks/task-hooks/useTaskDelete';
import TaskDuplicate from '../../../planners/planner-crud/TaskDuplicate';
import TaskEdit from '../../../planners/planner-crud/TaskEdit';

interface Props {
    onClose: () => void;
    task: AbstractTask;
    onInvalidate?: () => void;
    onShowDetail: (show: boolean) => void;
}

enum ModalEventType {
    SHOW = 'Show',
    UPDATE = 'Update',
    CLOSE = 'Close',
}

const TaskDetailInfo: React.FC<Props> = (props) => {
    const { onClose, task, onInvalidate, onShowDetail } = props;
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const editHandler = (eventType: ModalEventType) => {
        if (eventType === ModalEventType.UPDATE || eventType === ModalEventType.CLOSE) {
            setShowEditModal(false);
            onShowDetail(true);
            if (eventType === ModalEventType.UPDATE) onInvalidate && onInvalidate();
        } else {
            setShowEditModal(true);
            onShowDetail(false);
        }
    };

    const duplicateHandler = (eventType: ModalEventType) => {
        if (eventType === ModalEventType.UPDATE || eventType === ModalEventType.CLOSE) {
            setShowDuplicateModal(false);
            onShowDetail(true);
            if (eventType === ModalEventType.UPDATE) onInvalidate && onInvalidate();
        } else {
            setShowDuplicateModal(true);
            onShowDetail(false);
        }
    };

    const { deleteTask } = useTaskDelete({
        task,
        onDelete: () => {
            onClose();
            onInvalidate && onInvalidate();
        },
    });

    const { description, category, subCategory, importance, duration } = task;
    const defaultValue = '-';

    const { plannedDateFormat, dueDateFormat, endTimeFormat } = getTaskDetailDateTimeFormat(task);
    const durationFormat = getDurationFormat(duration).trim() || defaultValue;

    return (
        <>
            <div className={`${classes.grid}`}>
                <TaskStatus task={task} onInvalidate={onInvalidate} />
                <div className={classes.item}>
                    <div className={classes.label}>
                        <FontAwesomeIcon icon={faStarExclamation} className={classes.icon} />
                        Importance
                    </div>
                    <p className={classes.value}>
                        {importance}
                        <Rating
                            name="importance-rating"
                            className={classes.rating}
                            value={getImportanceValue(importance)}
                            readOnly
                        />
                    </p>
                </div>

                <div className={classes.item}>
                    <div className={classes.label}>
                        <FontAwesomeIcon icon={faListTree} className={classes.icon} />
                        Category
                    </div>
                    <p className={classes.value}>{category}</p>
                </div>

                <div className={classes.item}>
                    <div className={classes.label}>
                        <FontAwesomeIcon icon={faDiagramNested} className={classes.icon} />
                        Sub category
                    </div>
                    <p className={classes.value}>{subCategory ? subCategory : defaultValue}</p>
                </div>

                {/* Need formatted date */}
                <div className={classes.item}>
                    <div className={classes.label}>
                        <FontAwesomeIcon icon={faAlarmClock} className={classes.icon} />
                        Planned Date
                    </div>
                    <time className={classes.value}>{plannedDateFormat}</time>
                </div>

                {/* Need formatted duration in hrs & mins */}
                <div className={classes.item}>
                    <div className={classes.label}>
                        <FontAwesomeIcon icon={faHourglass} className={classes.icon} />
                        Duration
                    </div>
                    <time className={classes.value}>{durationFormat}</time>
                </div>

                <div className={classes.item}>
                    <div className={classes.label}>
                        <FontAwesomeIcon icon={faCalendarExclamation} className={classes.icon} />
                        Due Date
                    </div>
                    <time className={`${classes.value} ${classes.danger}`}>{dueDateFormat}</time>
                </div>

                <div className={classes.item}>
                    <div className={classes.label}>
                        <FontAwesomeIcon icon={faHourglassEnd} className={classes.icon} />
                        Endtime (estimate)
                    </div>
                    <time className={`${classes.value} ${classes.primary}`}>{endTimeFormat}</time>
                </div>

                <div className={`${classes.item} ${classes.longitem}`}>
                    <div className={classes.label}>
                        <FontAwesomeIcon icon={faMemoCircleInfo} className={classes.icon} />
                        Description
                    </div>
                    <p className={classes.value}>{description}</p>
                </div>
            </div>

            <div className={classes.actions}>
                <OperationList
                    onEdit={editHandler.bind(null, ModalEventType.SHOW)}
                    onDelete={deleteTask}
                    onDuplicate={duplicateHandler.bind(null, ModalEventType.SHOW)}
                    hoverColorClass="hover:text-blue-500/90"
                />
            </div>
            {showEditModal && (
                <TaskEdit
                    onClose={editHandler.bind(null, ModalEventType.CLOSE)}
                    onUpdate={editHandler.bind(null, ModalEventType.UPDATE)}
                    beginningPeriod={task.dateTime}
                    initialTask={task}
                />
            )}
            {showDuplicateModal && (
                <TaskDuplicate
                    task={task}
                    onClose={duplicateHandler.bind(null, ModalEventType.CLOSE)}
                    onDuplicate={duplicateHandler.bind(null, ModalEventType.UPDATE)}
                />
            )}
        </>
    );
};

function hasSetTime(date: Date) {
    const is12am = date.getHours() === 0 && date.getMinutes() === 0;
    const isEndOfDay = date.getHours() === 23 && date.getMinutes() === 59;
    // console.log(date.getHours(), date.getMinutes());
    return !(is12am || isEndOfDay);
}

function getTaskDetailDateTimeFormat(task: AbstractTask, defaultValue: string = '-') {
    let plannedDateFormat = '',
        dueDateFormat = '',
        endTimeFormat = '';
    switch (task.plannerType) {
        case PlannerMode.WEEKLY:
        case PlannerMode.TEMPLATE:
            plannedDateFormat = task.planDateFormat;
            endTimeFormat = task.endTimeFormat || defaultValue;
            dueDateFormat = task.dueDateFormat || defaultValue;
            break;
        case PlannerMode.MONTLY:
        case PlannerMode.YEARLY:
            plannedDateFormat = hasSetTime(task.dateTime)
                ? getDateTimeFormat(task.dateTime)
                : getFullDateFormat(task.dateTime);
            dueDateFormat = !task.dueDate
                ? defaultValue
                : hasSetTime(task.dueDate)
                ? getDateTimeFormat(task.dueDate)
                : getFullDateFormat(task.dueDate);
            endTimeFormat = task.endTimeFormat || defaultValue;
            break;
    }

    if (task.isAnyDateTime) {
        plannedDateFormat = 'Any Time';
        endTimeFormat = defaultValue;
    }

    return {
        plannedDateFormat,
        dueDateFormat,
        endTimeFormat,
    };
}

export default TaskDetailInfo;
