import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAlarmClock,
	faCircleExclamationCheck,
	faListTree,
	faMagnifyingGlassPlus,
	faPenToSquare,
	faStar,
	faCommentPen
} from "@fortawesome/pro-duotone-svg-icons";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { PlannerTask } from "../../models/task-models/Task";
import PlannerTaskEdit from "../planners/planner-modal/PlannerTaskEdit";
import { TaskStatus, TaskStatusList } from "../../models/task-models/Status";
import { addMinutes } from "../../utilities/time-utils/date-control";
import { copyClassObject } from "../../utilities/gen-utils/object-util";
import { getDateFormat, getISOTimeFormat } from "../../utilities/time-utils/date-format";
import { updateTaskStatus } from "../../lib/planners/planners-api";
import classes from "./TaskCard.module.scss";
import TaskDetail from "./task-modal/TaskDetail";
import TaskComment from "./task-modal/TaskComment";

interface Props {
	task: PlannerTask;
	beginningPeriod: Date;
	onMutate: () => void;
}

const PlannerTaskCard: React.FC<Props> = (props) => {
	const { task: initialTask, beginningPeriod, onMutate } = props;

	const [ task, setTask ] = useState(initialTask);
	const [ isEditing, setIsEditing ] = useState(false);
	const [ showDetail, setShowDetail ] = useState(false);

	const [ showComment, setShowComment ] = useState(false);

	const { dueDate, category, subCategory, importance, status, duration } = task;

	let endTime: null | Date = null;
	if (duration) {
		endTime = addMinutes(task.dateTime, task.duration);
	}

	const statusChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStatus = e.target.value.trim() as TaskStatus;
		const taskCopy = copyClassObject(task);
		taskCopy.status = newStatus;
		setTask(taskCopy);
		updateStatusHandler(newStatus);
	};

	const updateStatusHandler = async (newStatus: TaskStatus) => {
		// API call
		await updateTaskStatus(task.id, newStatus);
		onMutate();
	};

	const updateTaskHandler = () => onMutate();

	const editHandler = () => {
		setShowDetail(false);
		setIsEditing(true);
	};

	// Whenever there is a global update of tasks, update card as well.
	useEffect(
		() => {
			setTask(initialTask);
		},
		[ initialTask ]
	);

	const startTimeFormat = getISOTimeFormat(task.dateTime);
	const endTimeFormat = endTime && getISOTimeFormat(endTime);
	const dueDateFormat = dueDate && getDateFormat(dueDate);

	// Status color indicator
	const statusClass = "status-" + status.toLowerCase().replace(" ", "");

	return (
		<li className={`${classes.task}`}>
			<div className={`${classes.task__decorator} ${statusClass}-bg`} />
			{isEditing && (
				<PlannerTaskEdit
					onClose={() => setIsEditing(false)}
					onUpdate={updateTaskHandler}
					beginningPeriod={beginningPeriod}
					initialTask={task}
				/>
			)}

			{showDetail && (
				<TaskDetail
					onClose={setShowDetail.bind(null, false)}
					onEdit={editHandler}
					onDelete={editHandler}
					task={task}
				/>
			)}

			{/* Heading */}
			<div className={`${classes.task__heading}`}>
				{/* Task Name */}
				<h4 className={classes.task__name}>{task.name}</h4>
				<ClickAwayListener onClickAway={setShowComment.bind(null, false)}>
					<div className="ml-1 relative" onClick={setShowComment.bind(null, true)}>
						{!showComment && (
							<FontAwesomeIcon
								icon={faCommentPen}
								className={`max-w-lg text-xl text-slate-700 cursor-pointer hover:text-blue-600 ${classes.commentIcon}`}
							/>
						)}
						{showComment && (
							<TaskComment
								commentText="Demo comment"
								onSubmit={() => {}}
								className="absolute bottom-[1rem] translate-x-3"
							/>
						)}
					</div>
				</ClickAwayListener>
				{/* Planned Time */}
				<div className={classes.task__time}>
					<FontAwesomeIcon icon={faAlarmClock} className={classes.icon} />
					<span>{startTimeFormat}</span>
					{endTime && (
						<Fragment>
							<span>~</span>
							<span>{endTimeFormat}</span>
						</Fragment>
					)}
				</div>
				{/* Due Date */}
				<p className={classes.task__dueDate}>
					{dueDate && <Fragment>(due {dueDateFormat})</Fragment>}
				</p>
				{/* Status Control */}
				<select
					onChange={statusChangeHandler}
					className={classes.task__select}
					defaultValue={status}
				>
					{TaskStatusList.map((status) => <option key={status}>{status}</option>)}
				</select>
			</div>
			{/* Body */}
			<div className={`${classes.task__body}`}>
				<p className={classes.task__category}>
					<FontAwesomeIcon icon={faListTree} className={`${classes.icon}`} />
					{category}
					{subCategory && (
						<Fragment>
							<FontAwesomeIcon icon={faCircle} className={classes.task__icon_small} />
							{subCategory}
						</Fragment>
					)}
				</p>
				<p className={classes.task__importance}>
					<FontAwesomeIcon icon={faStar} className={`${classes.icon}`} />
					{importance}
				</p>
				<p className={`${classes.task__status} ${statusClass}`}>
					<FontAwesomeIcon
						icon={faCircleExclamationCheck}
						className={`${classes.icon}`}
					/>
					{status}
				</p>
				<div>
					<button className={classes.task__detail} onClick={() => setShowDetail(true)}>
						<FontAwesomeIcon
							icon={faMagnifyingGlassPlus}
							className={`${classes.icon}`}
						/>
						Detail
					</button>
					<button className={classes.task__edit} onClick={() => setIsEditing(true)}>
						<FontAwesomeIcon icon={faPenToSquare} className={`${classes.icon}`} />
						Edit
					</button>
				</div>
			</div>
		</li>
	);
};

export default PlannerTaskCard;
