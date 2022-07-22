import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/pro-duotone-svg-icons';

import { Status, StatusList } from '../../../../models/task-models/Status';
import IconEdit from '../../../ui/icons/IconEdit';
import classes from './TaskDetail.module.scss';
import { AbstractTask } from '../../../../models/task-models/AbstractTask';
import { updateTaskProperties } from '../../../../lib/planners/tasks-api';
import { PlannerMode } from '../../../../models/planner-models/PlannerMode';

interface Props {
    task: AbstractTask;
    onEdit: (status: Status) => void;
}

const TaskStatus: React.FC<Props> = ({ task, onEdit }) => {
    const { status: initialStatus, plannerType } = task;
    const [status, setStatus] = useState<string>(initialStatus);
    const [isEditing, setIsEditng] = useState(false);

    const confirmHandler = async () => {
        setIsEditng(false);
        changeHandler(status as Status); // patching current status
    };

    const changeHandler = (newStatus: Status) => {
        setStatus(newStatus);
        requestHandler(newStatus);
    };

    const requestHandler = async (newStatus: Status) => {
        if (newStatus === initialStatus) return;
        // Send HTTP PATCH request
        onEdit(newStatus);
        await updateTaskProperties(task.id, { status: newStatus }, plannerType);
    };

    const showEditIcon = task.plannerType !== PlannerMode.TEMPLATE;
    const statusClass = 'status-' + status.toLowerCase().replace(' ', '');

    return (
        <div className={'flex flex-col'}>
            <div className={`text-blue-600/75 font-semibold capitalize flex items-center`}>
                <FontAwesomeIcon icon={faClipboardCheck} className={`icon-medium mr-2`} />
                <div className={`relative flex items-center w-[60%]`}>
                    Status
                    {showEditIcon && (
                        <IconEdit
                            isEditing={isEditing}
                            onEdit={() => setIsEditng(true)}
                            onCheck={confirmHandler}
                            className={'!text-[100%]'}
                            pencialClass={'!text-blue-500'}
                        />
                    )}
                </div>
            </div>
            {!isEditing && <p className={`${classes.value} ${statusClass}`}>{status}</p>}
            {isEditing && (
                <select
                    className={'mt-2 p-1 cursor-pointer max-w-[10.5rem]'}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        changeHandler(e.target.value as Status)
                    }
                    value={status}
                >
                    {StatusList.map((st) => (
                        <option key={st} value={st}>
                            {st}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default TaskStatus;
