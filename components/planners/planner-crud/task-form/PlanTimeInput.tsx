import React from "react";
import { UseFormRegister } from "react-hook-form";

import {
	FormValues,
	getInitialDateTimeInput
} from "../../../../utilities/form-utils/task-form-util";
import { Task } from "../../../../models/task-models/Task";
import classes from "./TaskForm.module.scss";

interface Props {
	initialTask?: Task;
	register: UseFormRegister<FormValues>;
	beginningPeriod: Date;
	isAnyTime: boolean;
	onAnyTime: () => void;
}

const PlanTimeInput: React.FC<Props> = (props) => {
	const { register, initialTask, beginningPeriod, onAnyTime, isAnyTime } = props;

	// Initial input for datetime
	const { defaultDate, defaultTime } = getInitialDateTimeInput(initialTask, beginningPeriod);

	return (
		<div className={`${classes.datetime} ${classes.section}`}>
			<div className={classes.date}>
				<input
					type="date"
					{...register("date")}
					id="date"
					defaultValue={defaultDate}
					disabled={isAnyTime}
				/>
				<label htmlFor="date">Date</label>
			</div>
			<div className={classes.time}>
				<input
					type="time"
					{...register("time")}
					id="time"
					defaultValue={defaultTime}
					disabled={isAnyTime}
				/>
				<label htmlFor="time">Time</label>
			</div>

			<div className={classes.checkbox}>
				<input type="checkbox" id="no-datetime" onChange={onAnyTime} checked={isAnyTime} />
				<label htmlFor="no-datetime">Any time this period</label>
			</div>
		</div>
	);
};

export default PlanTimeInput;
