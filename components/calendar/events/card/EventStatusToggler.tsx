import React, { useState } from 'react';
import { patchEvent } from '../../../../lib/events/event-apis';
import { IEvent } from '../../../../models/Event';
import { Status } from '../../../../models/task-models/Status';
import { isOverdue } from '../../../../utilities/date-utils/date-check';
import StatusTogglerButton from '../../../ui/buttons/StatusTogglerButton';

interface Props {
    event: IEvent;
    onUpdate(newStatus: Status): void;
}

const EventStatusToggler: React.FC<Props> = ({ event, onUpdate }) => {
    const [localStatus, setLocalStatus] = useState(event.status);

    const toggleStatus = async (e: React.MouseEvent) => {
        setLocalStatus((prevState) => {
            let newStatus;
            if (prevState === Status.COMPLETED)
                newStatus = isOverdue(event.dateTime) ? Status.OVERDUE : Status.OPEN;
            else newStatus = Status.COMPLETED;
            statusUpdateHandler(newStatus);
            return newStatus;
        });
    };

    const statusUpdateHandler = async (newStatus: Status) => {
        await patchEvent(event.id, { status: newStatus });
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
