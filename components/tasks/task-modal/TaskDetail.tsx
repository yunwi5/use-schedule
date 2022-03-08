import React from "react";
import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAlarmClock,
	faCalendarExclamation,
	faClipboardCheck,
	faDiagramNested,
	faHourglass,
	faListTree,
	faStarExclamation,
	faXmark,
	faHourglassEnd,
	faMemoCircleInfo,
	faCalendarDay
} from "@fortawesome/pro-duotone-svg-icons";

import { PlannerTask } from "../../../models/task-models/Task";
import Modal from "../../ui/modal/Modal";
import Button from "../../ui/Button";
import {
	getDateTimeFormat,
	getDurationFormat,
	getEndDateTimeFormat,
	getFullDateFormat
} from "../../../utilities/time-utils/date-format";
import { getImportanceValue } from "../../../models/task-models/Status";
import { ButtonTheme } from "../../../models/design-models";
import classes from "./TaskDetail.module.scss";
import { PlannerMode } from "../../../models/planner-models/PlannerMode";
import { getTaskType } from "../../../utilities/tasks-utils/task-label";

interface Props {
	onClose: () => void;
	onEdit: () => void;
	onDelete: () => void;
	task: PlannerTask;
}

function hasSetTime (date: Date) {
	const is12am = date.getHours() === 0 && date.getMinutes() === 0;
	const isEndOfDay = date.getHours() === 23 && date.getMinutes() === 59;
	console.log(date.getHours(), date.getMinutes());
	return !(is12am || isEndOfDay);
}

function getTaskDetailDateTimeFormat (task: PlannerTask, defaultValue: string = "N/A") {
	let plannedDateFormat = "",
		dueDateFormat = "",
		endTimeFormat = "";
	switch (task.plannerType) {
		case PlannerMode.WEEKLY:
			plannedDateFormat = getDateTimeFormat(task.dateTime);
			dueDateFormat = task.dueDate ? getDateTimeFormat(task.dueDate) : defaultValue;
			endTimeFormat = !task.duration
				? defaultValue
				: getEndDateTimeFormat(task.dateTime, task.duration);
			break;
		case PlannerMode.MONTLY:
		case PlannerMode.YEARLY:
			plannedDateFormat = hasSetTime(task.dateTime)
				? getDateTimeFormat(task.dateTime)
				: getFullDateFormat(task.dateTime);
			dueDateFormat = !task.dueDate
				? defaultValue
				: hasSetTime(task.dueDate)
					? getDateTimeFormat(task.dueDate)
					: getFullDateFormat(task.dueDate);
			endTimeFormat = !task.duration
				? defaultValue
				: getEndDateTimeFormat(task.dateTime, task.duration);
			break;
	}

	if (task.isAnyDateTime) {
		plannedDateFormat = "Any Time";
		endTimeFormat = defaultValue;
	}

	return {
		plannedDateFormat,
		dueDateFormat,
		endTimeFormat
	};
}

const TaskDetail: React.FC<Props> = (props) => {
	const { onClose, onEdit, task } = props;

	const {
		name,
		description,
		category,
		subCategory,
		status,
		importance,
		duration,
		plannerType
	} = task;

	const defaultValue = "N/A";

	const { plannedDateFormat, dueDateFormat, endTimeFormat } = getTaskDetailDateTimeFormat(task);
	const durationFormat = getDurationFormat(duration).trim() || defaultValue;

	const taskType = getTaskType(plannerType || PlannerMode.WEEKLY);

	return (
		<Modal onClose={onClose} classes={`${classes.modal} text-semibold`}>
			<h2>{name}</h2>
			<FontAwesomeIcon icon={faXmark} className={classes.exit} onClick={onClose} />
			<h5>
				<FontAwesomeIcon icon={faCalendarDay} className={classes.icon} />
				{taskType}
			</h5>
			<div className={classes.grid}>
				<div className={classes.item}>
					<div className={classes.label}>
						<FontAwesomeIcon icon={faClipboardCheck} className={classes.icon} /> Status
					</div>
					<p className={`${classes.value}`}>{status}</p>
				</div>

				<div className={classes.item}>
					<div className={classes.label}>
						<FontAwesomeIcon icon={faStarExclamation} className={classes.icon} />
						Importance
					</div>
					<p className={classes.value}>
						{importance}
						<Rating
							name="importance-rating"
							className={classes.rating}
							value={getImportanceValue(importance)}
							readOnly
						/>
					</p>
				</div>

				<div className={classes.item}>
					<div className={classes.label}>
						<FontAwesomeIcon icon={faListTree} className={classes.icon} />
						Category
					</div>
					<p className={classes.value}>{category}</p>
				</div>

				<div className={classes.item}>
					<div className={classes.label}>
						<FontAwesomeIcon icon={faDiagramNested} className={classes.icon} />
						Sub category
					</div>
					<p className={classes.value}>{subCategory ? subCategory : defaultValue}</p>
				</div>

				{/* Need formatted date */}
				<div className={classes.item}>
					<div className={classes.label}>
						<FontAwesomeIcon icon={faAlarmClock} className={classes.icon} />
						Planned Date
					</div>
					<time className={classes.value}>{plannedDateFormat}</time>
				</div>

				{/* Need formatted duration in hrs & mins */}
				<div className={classes.item}>
					<div className={classes.label}>
						<FontAwesomeIcon icon={faHourglass} className={classes.icon} />
						Duration
					</div>
					<time className={classes.value}>{durationFormat}</time>
				</div>

				<div className={classes.item}>
					<div className={classes.label}>
						<FontAwesomeIcon icon={faCalendarExclamation} className={classes.icon} />
						Due Date
					</div>
					<time className={`${classes.value} ${classes.danger}`}>{dueDateFormat}</time>
				</div>

				<div className={classes.item}>
					<div className={classes.label}>
						<FontAwesomeIcon icon={faHourglassEnd} className={classes.icon} />
						Endtime (estimate)
					</div>
					<time className={`${classes.value} ${classes.primary}`}>{endTimeFormat}</time>
				</div>

				<div className={`${classes.item} ${classes.longitem}`}>
					<div className={classes.label}>
						<FontAwesomeIcon icon={faMemoCircleInfo} className={classes.icon} />
						Description
					</div>
					<p className={classes.value}>{description}</p>
				</div>
			</div>

			<div className={classes.actions}>
				<Button theme={ButtonTheme.SECONDARY} onClick={onEdit}>
					Edit
				</Button>
				<Button theme={ButtonTheme.DANGER} onClick={onClose}>
					Close
				</Button>
			</div>
		</Modal>
	);
};

export default TaskDetail;
