import { Fragment, useRef, useState, useEffect } from "react";
import { UseFormRegister } from "react-hook-form";

import { Month, MonthListFromJan, getMonthDays } from "../../../../../models/date-models/Month";
import { FormValues } from "../../../../../utilities/form-utils/task-form-util";
import classes from "../TaskForm.module.scss";

interface Props {
	register: UseFormRegister<FormValues>;
}

const MonthDateInput: React.FC<Props> = (props) => {
	const { register } = props;

	const [ currentMonth, setCurrentMonth ] = useState<Month>(Month.JANUARY);
	const [ daysArray, setDaysArray ] = useState<number[] | null>(null);

	const monthList = [ ...MonthListFromJan ];
	monthList.pop(); // ANY should be removed from the options

	useEffect(
		() => {
			if (!currentMonth) return;
			const days: number[] = getMonthDays(currentMonth);
			setDaysArray(days);
		},
		[ currentMonth ]
	);

	return (
		<Fragment>
			<div className={classes.month}>
				<label htmlFor="month-select">Month</label>
				<select
					id="month-select"
					{...register("month")}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setCurrentMonth(e.target.value as Month)}
					defaultValue={monthList[0]}
				>
					{monthList.map((month) => (
						<option key={month} value={month}>
							{month}
						</option>
					))}
				</select>
			</div>
			{daysArray && (
				<div className={classes.day}>
					<label htmlFor="day-select">Day</label>
					<select
						id="day-select"
						{...register("monthDay", { valueAsNumber: true })}
						defaultValue={daysArray[0]}
					>
						{daysArray.map((day) => (
							<option key={day} value={day}>
								{day}
							</option>
						))}
					</select>
				</div>
			)}
		</Fragment>
	);
};

export default MonthDateInput;
