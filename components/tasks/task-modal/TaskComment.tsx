import { faPencilAlt } from "@fortawesome/pro-duotone-svg-icons";
import { faCheck, faXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import classes from "./TaskComment.module.scss";

interface Props {
	commentText: string;
	onSubmit: (newText: string) => void;
	label?: string;
	className?: string;
}

const TaskComment: React.FC<Props> = (props) => {
	const { commentText: initialText, onSubmit, className, label } = props;
	const [ isEditing, setIsEditing ] = useState(false);
	const [ currentText, setCurrentText ] = useState(initialText);

	const textChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCurrentText(e.target.value);
	};

	const commentSubmitHandler = () => {
		setIsEditing(false);
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
				<label htmlFor="comment">{label || "Comment"}</label>
				{!isEditing && (
					<FontAwesomeIcon
						icon={faPencilAlt}
						onClick={() => setIsEditing(true)}
						className={`${classes.icon} text-slate-700`}
					/>
				)}
				{isEditing && (
					<Fragment>
						<FontAwesomeIcon
							icon={faCheck}
							onClick={commentSubmitHandler}
							className={`${classes.icon} -translate-x-5 text-teal-600`}
						/>
						<FontAwesomeIcon
							icon={faXmark}
							className={`${classes.icon} text-rose-600`}
							onClick={cancelHandler}
						/>
					</Fragment>
				)}

				{!isEditing && <p className={classes.text}>{currentText}</p>}
				{isEditing && (
					<textarea rows={1} onChange={textChangeHandler} value={currentText} />
				)}
			</div>
		</div>
	);
};

export default TaskComment;
