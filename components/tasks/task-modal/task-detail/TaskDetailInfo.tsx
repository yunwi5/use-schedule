import { useState } from 'react';
import {
    faAlarmClock,
    faHourglass,
    faListTree,
    faStarExclamation,
    faHourglassEnd,
    faMemoPad,
} from '@fortawesome/pro-duotone-svg-icons';

import { AbstractTask } from '../../../../models/task-models/AbstractTask';
import { getDurationFormat } from '../../../../utilities/date-utils/date-format';
import classes from './TaskDetail.module.scss';
import TaskStatus from './TaskStatus';
import OperationList from '../../../ui/OperationList';
import useTaskDelete from '../../../../hooks/task-hooks/useTaskDelete';
import TaskDuplicate from '../../../planners/planner-crud/TaskDuplicate';
import TaskEdit from '../../../planners/planner-crud/TaskEdit';
import RecurringTaskDuplicate from '../../../recurring/crud-operations/RecurringTaskDuplicate';
import { TaskSection } from './task-parts';

interface Props {
    onClose: () => void;
    task: AbstractTask;
    onInvalidate?: () => void;
}

enum ModalEventType {
    SHOW = 'Show',
    UPDATE = 'Update',
    CLOSE = 'Close',
}

const TaskDetailInfo: React.FC<Props> = (props) => {
    const { onClose, task, onInvalidate } = props;
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRecurringModal, setShowRecurringModal] = useState(false);

    const editHandler = (eventType: ModalEventType) => {
        if (eventType === ModalEventType.UPDATE || eventType === ModalEventType.CLOSE) {
            setShowEditModal(false);
            if (eventType === ModalEventType.UPDATE) onInvalidate && onInvalidate();
        } else {
            setShowEditModal(true);
        }
    };

    const recurringHandler = (eventType: ModalEventType) => {
        if (eventType === ModalEventType.UPDATE || eventType === ModalEventType.CLOSE) {
            setShowRecurringModal(false);
            if (eventType === ModalEventType.UPDATE) onInvalidate && onInvalidate();
        } else {
            setShowRecurringModal(true);
        }
    };

    const duplicateHandler = (eventType: ModalEventType) => {
        if (eventType === ModalEventType.UPDATE || eventType === ModalEventType.CLOSE) {
            setShowDuplicateModal(false);
            if (eventType === ModalEventType.UPDATE) onInvalidate && onInvalidate();
        } else {
            setShowDuplicateModal(true);
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

    return (
        <>
            <div className={`${classes.grid} mb-1`}>
                <TaskStatus task={task} onInvalidate={onInvalidate} />
                <TaskSection label="Importance" value={importance} icon={faStarExclamation} />

                <TaskSection label={'Category'} value={category} icon={faListTree} />

                <TaskSection label={'Sub Category'} value={subCategory} icon={faListTree} />

                <TaskSection label={'Date'} value={task.planDateFormat} icon={faAlarmClock} />

                <TaskSection label={'Time'} value={task.planTimeFormat} icon={faAlarmClock} />

                {/* Need formatted duration in hrs & mins */}
                <TaskSection
                    label="Duration"
                    value={getDurationFormat(duration)}
                    icon={faHourglass}
                />

                <TaskSection
                    label="Endtime"
                    value={task.endTimeFormat}
                    icon={faHourglassEnd}
                />

                <div className={classes.longitem}>
                    <TaskSection label={'Description'} value={description} icon={faMemoPad} />
                </div>
            </div>

            <OperationList
                onEdit={editHandler.bind(null, ModalEventType.SHOW)}
                onDelete={deleteTask}
                onRecurring={recurringHandler.bind(null, ModalEventType.SHOW)}
                onDuplicate={duplicateHandler.bind(null, ModalEventType.SHOW)}
                hoverColorClass="hover:text-blue-500/90"
            />
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
            {showRecurringModal && (
                <RecurringTaskDuplicate
                    onClose={recurringHandler.bind(null, ModalEventType.CLOSE)}
                    onDuplicate={recurringHandler.bind(null, ModalEventType.UPDATE)}
                    initialTask={task}
                    formTitle="Add Recurring Task"
                />
            )}
        </>
    );
};

export default TaskDetailInfo;
