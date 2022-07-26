import React, { useState } from 'react';
import { updateTaskProperties } from '../../../lib/planners/tasks-api';
import { AbstractTask } from '../../../models/task-models/AbstractTask';
import { Status } from '../../../models/task-models/Status';
import { isOverdue } from '../../../utilities/date-utils/date-check';
import StatusTogglerButton from '../../ui/buttons/StatusTogglerButton';

interface Props {
    task: AbstractTask;
    onUpdate(status: Status): void;
}

const EventStatusToggler: React.FC<Props> = ({ task, onUpdate }) => {
    const [localStatus, setLocalStatus] = useState(task.status);

    const toggleStatus = async (e: React.MouseEvent) => {
        setLocalStatus((prevState) => {
            let newStatus;
            if (prevState === Status.COMPLETED)
                newStatus = isOverdue(task.dateTime) ? Status.OVERDUE : Status.OPEN;
            else newStatus = Status.COMPLETED;
            statusUpdateHandler(newStatus);
            return newStatus;
        });
    };

    const statusUpdateHandler = async (newStatus: Status) => {
        await updateTaskProperties(task.id, { status: newStatus }, task.plannerType);
        onUpdate(newStatus);
    };

    return (
        <StatusTogglerButton
            status={localStatus}
            onToggle={toggleStatus}
            className={'!mt-[0.35rem] !mr-[0.35rem]'}
        />
    );
};

export default EventStatusToggler;
