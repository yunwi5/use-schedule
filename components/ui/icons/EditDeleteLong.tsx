import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEraser, faPencilAlt } from "@fortawesome/pro-duotone-svg-icons";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";

import classes from "./EditDeleteLong.module.scss";

interface Props {
    isEditing: boolean;
    onEdit(edit: boolean): void;
    onDelete?: () => void;
}

const EditDeleteLong: React.FC<Props> = ({ isEditing, onEdit, onDelete }) => {
    const iconClass = "cursor-pointer text-3xl hover:scale-110 transition-all";

    return (
        <div className="mr-2">
            {!isEditing && (
                <div className="flex gap-2 items-center">
                    <div
                        className={`${classes.control} ${classes.edit}`}
                        onClick={onEdit.bind(null, true)}
                    >
                        <FontAwesomeIcon
                            icon={faPencilAlt}
                            className={`${iconClass} text-blue-500 hover:text-blue-800 max-w-[2rem] ${classes.icon}`}
                        />
                        <span className={classes.label}>Edit</span>
                    </div>
                    {onDelete && (
                        <div className={`${classes.control} ${classes.delete}`} onClick={onDelete}>
                            <FontAwesomeIcon
                                icon={faEraser}
                                className={`${iconClass} text-3xl text-rose-400 hover:text-rose-500 max-w-[2.2rem] ${classes.icon}`}
                            />
                            <span className={classes.label}>Delete</span>
                        </div>
                    )}
                </div>
            )}
            {isEditing && (
                <div
                    className={`${classes.control} ${classes.confirm}`}
                    onClick={onEdit.bind(null, false)}
                >
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={`${iconClass}${classes.icon}`}
                    />
                    <span className={classes.label}>Confirm</span>
                </div>
            )}
        </div>
    );
};

export default EditDeleteLong;
