import React, { Fragment } from "react";
import { Task, PlannerTask } from "../../models/task-models/Task";
import { TaskStatusList } from "../../models/task-models/Status";
import { addMinutes } from "../../utilities/time-utils/date-control";
import classes from "./TaskCard.module.scss";

interface Props {
	task: PlannerTask;
}

function getTimeFormat (time: Date) {
	return `${time.getHours()}:${time.getMinutes()}`;
}

function getDateFormat (date: Date) {
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	});
}

const PlannerTaskCard: React.FC<Props> = (props) => {
	const { task } = props;

	let endTime: null | Date = null;
	if (task.duration) {
		endTime = addMinutes(task.dateTime, task.duration);
	}

	const { dueDate, category, subCategory, importance } = task;

	return (
		<li className={`${classes.task}`}>
			{/* Heading */}
			<div className={`${classes.task__heading}`}>
				{/* Task Name */}
				<h4>{task.name}</h4>
				{/* Planned Time */}
				<div className={classes.time}>
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
				<select className="select-control">
					{TaskStatusList.map((status) => <option key={status}>{status}</option>)}
				</select>
			</div>
			{/* Body */}
			<div className={`${classes.task__body}`}>
				<p>
					{category} {subCategory}
				</p>
				<p>{importance}</p>
				<div>
					<span>Detail</span>
					<span>Edit</span>
				</div>
			</div>
		</li>
	);
};

export default PlannerTaskCard;
