import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/pro-duotone-svg-icons';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';

import { Status, StatusList } from '../../../../../models/task-models/Status';
import { patchEvent } from '../../../../../lib/events/event-apis';
import { IEvent } from '../../../../../models/Event';
import IconEdit from '../../../../ui/icons/IconEdit';
import { eventStyles } from './common-styles';

interface Props {
    event: IEvent;
    onEdit: () => void;
}

const EventStatus: React.FC<Props> = ({ event, onEdit }) => {
    const [status, setStatus] = useState(event.status);
    const [isEditing, setIsEditing] = useState(false);

    const confirmHandler = () => {
        setIsEditing(false);
        changeHandler(status);
    };

    const changeHandler = (newStatus: Status) => {
        setStatus(newStatus);
        statusRequestHandler(newStatus);
    };

    const statusRequestHandler = async (newStatus: Status) => {
        if (event.status === newStatus) return; // no change, no edit
        // send HTTP PATCH request
        const { isSuccess } = await patchEvent(event.id, { status: newStatus });
        if (isSuccess) onEdit();
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
                <FormControl size="small" sx={{ mt: 1, minWidth: 120, maxWidth: 130 }}>
                    <Select
                        id="status-select"
                        value={status}
                        onChange={(e: SelectChangeEvent) =>
                            changeHandler(e.target.value as Status)
                        }
                    >
                        {StatusList.map((s) => (
                            <MenuItem key={s} value={s}>
                                {s}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                <p>{status}</p>
            )}
        </div>
    );
};

export default EventStatus;
