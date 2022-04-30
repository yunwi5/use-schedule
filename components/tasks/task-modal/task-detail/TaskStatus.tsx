import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/pro-duotone-svg-icons";

import { Status, StatusList } from "../../../../models/task-models/Status";
import IconEdit from "../../../ui/icons/IconEdit";
import classes from "./TaskDetail.module.scss";
import { AbstractTask } from "../../../../models/task-models/AbstractTask";
import { updateTaskProperties } from "../../../../lib/planners/tasks-api";

interface Props {
    task: AbstractTask;
    onInvalidate?: () => void;
}

const TaskStatus: React.FC<Props> = ({ task, onInvalidate }) => {
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
        const { isSuccess } = await updateTaskProperties(
            task.id,
            { status: newStatus },
            plannerType,
        );
        if (isSuccess && onInvalidate) onInvalidate();
    };

    return (
        <div className={classes.item}>
            <div className={`${classes.label} flex items-center`}>
                <FontAwesomeIcon icon={faClipboardCheck} className={classes.icon} />
                <div className={`relative flex items-center w-[60%]`}>
                    Status
                    <IconEdit
                        isEditing={isEditing}
                        onEdit={() => setIsEditng(true)}
                        onCheck={confirmHandler}
                        className={"!text-[100%]"}
                    />
                </div>
            </div>
            {!isEditing && <p className={`${classes.value}`}>{status}</p>}
            {isEditing && (
                <select
                    className={"mt-2 p-1 cursor-pointer max-w-[10.5rem]"}
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
