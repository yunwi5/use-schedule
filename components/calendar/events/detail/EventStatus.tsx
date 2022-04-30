import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/pro-duotone-svg-icons";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { Status, StatusList } from "../../../../models/task-models/Status";
import { patchEvent } from "../../../../lib/events/event-apis";
import { Event } from "../../../../models/Event";
import IconEdit from "../../../ui/icons/IconEdit";

interface Props {
    event: Event;
    onEdit: () => void;
}

const labelClass = "text-sky-600/75 font-semibold";
const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

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
        const { isSuccess, message } = await patchEvent(event.id, { status: newStatus });
        if (isSuccess) onEdit();
    };

    return (
        <div className="flex-1 flex flex-col">
            <span className={`${labelClass} flex items-center`}>
                <FontAwesomeIcon icon={faCalendarCheck} className={labelIconClass} />
                Status
                <div className="relative ml-auto mr-12">
                    <IconEdit
                        isEditing={isEditing}
                        onEdit={() => setIsEditing(true)}
                        onCheck={confirmHandler}
                        className={"!text-[100%]"}
                    />
                </div>
            </span>
            {isEditing ? (
                <FormControl size="small" sx={{ mt: 1, minWidth: 120, maxWidth: 130 }}>
                    <Select
                        id="status-select"
                        value={status}
                        onChange={(e: SelectChangeEvent) => changeHandler(e.target.value as Status)}
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
