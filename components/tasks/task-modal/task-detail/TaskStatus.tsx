import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/pro-duotone-svg-icons";

import { StatusList } from "../../../../models/task-models/Status";
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

    const statusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
    };

    const confirmHandler = async () => {
        setIsEditng(false);
        const { isSuccess, message } = await updateTaskProperties(task.id, { status }, plannerType);
        if (isSuccess && onInvalidate) {
            onInvalidate();
        }
    };

    const cancelHandler = () => {
        setIsEditng(false);
        setStatus(initialStatus);
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
                        onCancel={cancelHandler}
                        className={"!text-[100%]"}
                    />
                </div>
            </div>
            {!isEditing && <p className={`${classes.value}`}>{status}</p>}
            {isEditing && (
                <select
                    className={"mt-2 p-1 cursor-pointer max-w-[10.5rem]"}
                    onChange={statusHandler}
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
