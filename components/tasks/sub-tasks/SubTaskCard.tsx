import React, { Fragment, useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarLight } from "@fortawesome/pro-light-svg-icons";
import { faCheck, faStar as faStarSolid } from "@fortawesome/pro-solid-svg-icons";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";

import { SubTask } from "../../../models/task-models/SubTask";
import classes from "./SubTaskCard.module.scss";

interface Props {
	subTask: SubTask;
	isEditMode: boolean;
	onEdit: (newTask: SubTask) => void;
	onDelete: (id: string) => void;
}

const SubTaskCard: React.FC<Props> = (props) => {
	const { subTask, onEdit, onDelete, isEditMode } = props;
	const [ currentText, setCurrentText ] = useState<string>(subTask.name);
	const [ isImportant, setIsImportant ] = useState(subTask.isImportant);
	const [ isCompleted, setIsCompleted ] = useState(subTask.isCompleted);

	const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
		setCurrentText(e.target.value);

	const toggleIsImportant = () => setIsImportant((prev) => !prev);

	const deleteHandler = () => {
		console.log(`Delete the subtask ${currentText}`);
		onDelete(subTask.id);
	};

	const updateHandler = useCallback(
		() => {
			onEdit({ ...subTask, name: currentText, isImportant, isCompleted });
		},
		[ subTask, currentText, isImportant, isCompleted, onEdit ]
	);

	const haveSameAttributes = useCallback(
		() => {
			return (
				currentText.trim() === subTask.name &&
				isImportant === subTask.isImportant &&
				isCompleted === subTask.isCompleted
			);
		},
		[ currentText, isImportant, isCompleted, subTask ]
	);

	// Update should be handled later on...
	useEffect(
		() => {
			if (isEditMode) return;
			if (haveSameAttributes()) return;
			console.log("Send http request when the edit mode is closed");
			updateHandler();
		},
		[ isEditMode, haveSameAttributes, onEdit, updateHandler ]
	);

	return (
		<div className="md:max-w-[99%] lg:max-w-[95%] mt-2 p-2 flex items-center justify-between shadow-md hover:shadow-xl hover:-translate-y-[2px] transition-all text-slate-600 border-slate-200 border-2 rounded-md">
			<div
				className={`md:w-6 md:h-6 lg:w-7 lg:min-w-7 lg:h-7 lg:min-w-7 flex items-center justify-center rounded-full border-2 ${isCompleted
					? "border-green-300"
					: "border-slate-300"} cursor-pointer`}
				onClick={() => setIsCompleted((prev) => !prev)}
			>
				{isCompleted && (
					<FontAwesomeIcon icon={faCheck} className={`text-green-500 ${classes.icon}`} />
				)}
			</div>
			{!isEditMode && (
				<Fragment>
					<p
						className={`mr-auto ml-4 max-w-[85%] ${isCompleted
							? "line-through text-slate-400"
							: ""}`}
					>
						{subTask.name}
					</p>
					{isImportant ? (
						<FontAwesomeIcon
							icon={faStarSolid}
							onClick={toggleIsImportant}
							className={`text-yellow-300 hover:text-yellow-400 text-xl ${classes.icon}`}
						/>
					) : (
						<FontAwesomeIcon
							icon={faStarLight}
							onClick={toggleIsImportant}
							className={`text-yellow-400 text-xl ${classes.icon}`}
						/>
					)}
				</Fragment>
			)}
			{isEditMode && (
				<Fragment>
					<input
						type="text"
						onChange={textChangeHandler}
						value={currentText}
						id="subtask-name"
						maxLength={30}
						className="lg:w-[85%] max-w-[85%] bg-transparent mr-auto ml-4 focus:outline-none"
					/>
					<FontAwesomeIcon
						onClick={deleteHandler}
						icon={faXmark}
						className={`max-w-sm text-lg text-rose-600 hover:border-rose-600 hover:border-b-[2.5px] ${classes.icon}`}
					/>
				</Fragment>
			)}
		</div>
	);
};

export default SubTaskCard;
