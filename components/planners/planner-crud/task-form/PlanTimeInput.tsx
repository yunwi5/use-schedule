import { Fragment, useEffect, useCallback } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { UseFormRegister } from "react-hook-form";

import {
	FormValues,
	getInitialDateTimeInput
} from "../../../../utilities/form-utils/task-form-util";
import { Task } from "../../../../models/task-models/Task";
import { PlannerMode } from "../../../../models/planner-models/PlannerMode";
import { getPlannerLabel } from "../../../../utilities/gen-utils/label-util";
import classes from "./TaskForm.module.scss";
import MonthDateInput from "./time-inputs/MonthDateInput";

interface Props {
	initialTask?: Task;
	register: UseFormRegister<FormValues>;
	beginningPeriod: Date;
	isAnyTime: boolean;
	onAnyTime: React.Dispatch<React.SetStateAction<boolean>>;
	onMonthDateOnly: React.Dispatch<React.SetStateAction<boolean>>;
	monthDateOnly: boolean;
}

const PlanTimeInput: React.FC<Props> = (props) => {
	const {
		register,
		initialTask,
		beginningPeriod,
		onAnyTime,
		isAnyTime,
		onMonthDateOnly,
		monthDateOnly
	} = props;

	const plannerMode = useSelector((state: RootStateOrAny) => state.planner.plannerMode);
	const isYearlyMode = plannerMode === PlannerMode.YEARLY;
	const plannerLabel = getPlannerLabel(plannerMode);

	// Initial input for datetime
	const { defaultDate, defaultTime } = getInitialDateTimeInput(initialTask, beginningPeriod);

	const anyTimeHandler = useCallback(
		() => {
			onMonthDateOnly(false);
			onAnyTime((prev) => !prev);
		},
		[ onAnyTime, onMonthDateOnly ]
	);

	useEffect(
		() => {
			if (monthDateOnly) {
				onAnyTime(false);
			}
		},
		[ monthDateOnly, onAnyTime ]
	);

	return (
		<div className={`${classes.datetime} ${classes.section}`}>
			{monthDateOnly && <MonthDateInput register={register} />}
			{!monthDateOnly && (
				<Fragment>
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
				</Fragment>
			)}

			<div className={classes.options}>
				{isYearlyMode && (
					<div className={classes.checkbox}>
						<input
							type="checkbox"
							id="only-month-and-date"
							onChange={() => onMonthDateOnly((prev) => !prev)}
							checked={monthDateOnly}
						/>
						<label htmlFor="only-month-and-date">Only Month & Date</label>
					</div>
				)}

				<div className={classes.checkbox}>
					<input
						type="checkbox"
						id="no-datetime"
						onChange={anyTimeHandler}
						checked={isAnyTime}
					/>
					<label htmlFor="no-datetime">Any time this {plannerLabel}</label>
				</div>
			</div>
		</div>
	);
};

export default PlanTimeInput;
