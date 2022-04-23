import React, { useState } from "react";

import classes from "./TaskComment.module.scss";
import IconEdit from "../../../ui/icons/IconEdit";

interface Props {
    commentText: string;
    onSubmit: (newText: string) => void;
    label?: string;
    className?: string;
}

const TaskComment: React.FC<Props> = (props) => {
    const { commentText: initialText, onSubmit, className, label = "Comment" } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [currentText, setCurrentText] = useState(initialText);

    const textChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentText(e.target.value);
    };

    const commentSubmitHandler = () => {
        setIsEditing(false);
        if (initialText.trim() == currentText.trim()) return;
        onSubmit(currentText);
    };

    const cancelHandler = () => {
        setIsEditing(false);
        setCurrentText(initialText);
    };

    return (
        <div className={`${classes.dialog} ${className}`}>
            <div className={`${classes["left-point"]}`} />
            <div className={classes.content}>
                <label htmlFor="comment" className={"relative"}>
                    {label}
                    <IconEdit
                        isEditing={isEditing}
                        onEdit={() => setIsEditing(true)}
                        onCheck={commentSubmitHandler}
                        onCancel={cancelHandler}
                        className="-translate-y-1"
                    />
                </label>

                {!isEditing && <p className={classes.text}>{currentText}</p>}
                {isEditing && (
                    <textarea rows={1} onChange={textChangeHandler} value={currentText} />
                )}
            </div>
        </div>
    );
};

export default TaskComment;
