import React, { Fragment, useState } from "react";
import { PlannerTask } from "../../models/task-models/Task";
import { TaskStatus, TaskStatusList } from "../../models/task-models/Status";
import { addMinutes } from "../../utilities/time-utils/date-control";
import { copyClassObject } from "../../utilities/gen-utils/object-util";
import { getDateFormat, getTimeFormat } from "../../utilities/time-utils/date-format";
import classes from "./TaskCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAlarmClock,
	faCircleExclamationCheck,
	faListTree,
	faMagnifyingGlassPlus,
	faPenToSquare,
	faStar
} from "@fortawesome/pro-duotone-svg-icons";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";

interface Props {
	task: PlannerTask;
}

const PlannerTaskCard: React.FC<Props> = (props) => {
	const { task: initialTask } = props;
	const [ task, setTask ] = useState(initialTask);

	let endTime: null | Date = null;
	if (task.duration) {
		endTime = addMinutes(task.dateTime, task.duration);
	}

	const { dueDate, category, subCategory, importance, status } = task;

	const statusChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStatus = e.target.value.trim() as TaskStatus;
		const taskCopy = copyClassObject(task);
		taskCopy.status = newStatus;
		setTask(taskCopy);
	};

	return (
		<li className={`${classes.task}`}>
			{/* Heading */}
			<div className={`${classes.task__heading}`}>
				{/* Task Name */}
				<h4 className={classes.task__name}>{task.name}</h4>
				{/* Planned Time */}
				<div className={classes.task__time}>
					<FontAwesomeIcon icon={faAlarmClock} className={classes.icon} />
					<span>{getTimeFormat(task.dateTime)}</span>
					{endTime && (
						<Fragment>
							<span>~</span>
							<span>{getTimeFormat(endTime)}</span>
						</Fragment>
					)}
				</div>
				{/* Due Date */}
				{dueDate && <p>(due {getDateFormat(dueDate)})</p>}
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
				<p
					className={`${classes.task__status} ${classes[
						"status-" + status.toLowerCase().replace(" ", "")
					]}`}
				>
					<FontAwesomeIcon
						icon={faCircleExclamationCheck}
						className={`${classes.icon}`}
					/>
					{status}
				</p>
				<div>
					<button className={classes.task__detail}>
						<FontAwesomeIcon
							icon={faMagnifyingGlassPlus}
							className={`${classes.icon}`}
						/>
						Detail
					</button>
					<button className={classes.task__edit}>
						<FontAwesomeIcon icon={faPenToSquare} className={`${classes.icon}`} />
						Edit
					</button>
				</div>
			</div>
		</li>
	);
};

export default PlannerTaskCard;