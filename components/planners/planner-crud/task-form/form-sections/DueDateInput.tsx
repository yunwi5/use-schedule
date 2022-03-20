import React from "react";
import { UseFormRegister } from "react-hook-form";

import {
	FormValues,
	getInitialEndtimeInput
} from "../../../../../utilities/form-utils/task-form-util";
import classes from "../TaskForm.module.scss";

interface Props {
	register: UseFormRegister<FormValues>;
	beginningPeriod: Date;
	isNoDueDate: boolean;
	onDueDateExist: () => void;
	watch: () => FormValues;
}

const DueDateInput: React.FC<Props> = (props) => {
	const { register, beginningPeriod, isNoDueDate, onDueDateExist } = props;

	// Initial input for due datetime
	const { defaultEndDate, defaultEndTime } = getInitialEndtimeInput(beginningPeriod);

	return (
		<div className={`${classes.dueDatetime} ${classes.section}`}>
			<div className={classes.date}>
				<input
					type="date"
					{...register("dueDate")}
					id="dueDate"
					defaultValue={defaultEndDate}
					disabled={isNoDueDate}
				/>
				<label htmlFor="dueDate">Due Date</label>
			</div>
			<div className={classes.time}>
				<input
					type="time"
					{...register("dueTime")}
					id="dueTime"
					defaultValue={defaultEndTime}
					disabled={isNoDueDate}
				/>
				<label htmlFor="dueTime">Due Time</label>
			</div>

			<div className={classes.checkbox}>
				<input
					type="checkbox"
					id="no-due-date"
					onChange={onDueDateExist}
					checked={isNoDueDate}
				/>
				<label htmlFor="no-due-date">No Due Date</label>
			</div>
		</div>
	);
};

export default DueDateInput;
