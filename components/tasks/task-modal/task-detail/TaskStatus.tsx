import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/pro-duotone-svg-icons';

import { Status } from '../../../../models/task-models/Status';
import IconEdit from '../../../ui/icons/IconEdit';
import classes from './TaskDetail.module.scss';
import { AbstractTask } from '../../../../models/task-models/AbstractTask';
import { updateTaskProperties } from '../../../../lib/planners/tasks-api';
import { PlannerMode } from '../../../../models/planner-models/PlannerMode';
import StatusSelect from '../../../ui/input/custom-inputs/StatusSelect';

interface Props {
    task: AbstractTask;
    onEdit: (status: Status) => void;
}

const TaskStatus: React.FC<Props> = ({ task, onEdit }) => {
    const { status, plannerType } = task;
    const [isEditing, setIsEditing] = useState(false);

    const confirmHandler = async () => {
        setIsEditing(false);
        changeHandler(status as Status); // patching current status
    };

    const changeHandler = (newStatus: Status) => {
        setIsEditing(false);
        requestHandler(newStatus);
    };

    const requestHandler = async (newStatus: Status) => {
        if (newStatus === status) return;
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
                            onEdit={() => setIsEditing(true)}
                            onCheck={confirmHandler}
                            className={'!text-[100%]'}
                            pencialClass={'!text-blue-500'}
                        />
                    )}
                </div>
            </div>
            {!isEditing && <p className={`${classes.value} ${statusClass}`}>{status}</p>}
            {isEditing && <StatusSelect onChange={changeHandler} value={status} />}
        </div>
    );
};

export default TaskStatus;
