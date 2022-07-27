import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/pro-duotone-svg-icons';

import { Status } from '../../../../../models/task-models/Status';
import { patchEvent } from '../../../../../lib/events/event-apis';
import { EventProps, IEvent } from '../../../../../models/Event';
import IconEdit from '../../../../ui/icons/IconEdit';
import { eventStyles } from './common-styles';
import StatusSelect from '../../../../ui/input/custom-inputs/StatusSelect';

interface Props {
    event: IEvent;
    onEdit: (eventProps: EventProps) => void;
}

const EventStatus: React.FC<Props> = ({ event, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);

    const confirmHandler = () => {
        setIsEditing(false);
    };

    // choosing a new status automatically closes the editing mode.
    const changeHandler = (newStatus: Status) => {
        setIsEditing(false);
        statusRequestHandler(newStatus);
    };

    const statusRequestHandler = async (newStatus: Status) => {
        onEdit({ status: newStatus });
        if (event.status === newStatus) return; // no change, no request
        // send HTTP PATCH request
        await patchEvent(event.id, { status: newStatus });
    };

    return (
        <div className="flex-1 flex flex-col">
            <span className={`${eventStyles.labelClass} flex items-center`}>
                <FontAwesomeIcon icon={faCalendarCheck} className={'icon-medium mr-2'} />
                Status
                <div className="relative ml-auto mr-12">
                    <IconEdit
                        isEditing={isEditing}
                        onEdit={() => setIsEditing(true)}
                        onCheck={confirmHandler}
                        className={'!text-[100%]'}
                    />
                </div>
            </span>
            {isEditing ? (
                <StatusSelect onChange={changeHandler} value={event.status} />
            ) : (
                <p>{event.status}</p>
            )}
        </div>
    );
};

export default EventStatus;
