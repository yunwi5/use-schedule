import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import {
	FormValues,
	getInitialEndtimeInput
} from '../../../../../../utilities/form-utils/task-form-util';
import DueDateInput from './DueDateInput';
import DueTimeInput from './DueTimeInput';
import classes from '../../TaskForm.module.scss';
import { RootStateOrAny, useSelector } from 'react-redux';
import { PlannerMode } from '../../../../../../models/planner-models/PlannerMode';
import DueDayInput from './DueDayInput';
import { WeekDay } from '../../../../../../models/date-models/WeekDay';

interface Props {
	register: UseFormRegister<FormValues>;
	beginningPeriod: Date;
	isNoDueDate: boolean;
	onDueDateExist: () => void;
	watch: () => FormValues;
}

const DueDateTimeInput: React.FC<Props> = (props) => {
	const { register, beginningPeriod, isNoDueDate, onDueDateExist } = props;

	const plannerMode = useSelector((state: RootStateOrAny) => state.planner.plannerMode);
	const showDayInsteadOfDate = plannerMode === PlannerMode.TEMPLATE;

	// Initial input for due datetime
	const { defaultEndDate, defaultEndTime } = getInitialEndtimeInput(beginningPeriod);

	return (
		<div className={`${classes.dueDatetime} ${classes.section}`}>
			{showDayInsteadOfDate ? (
				<DueDayInput register={register} initialDay={WeekDay.SUNDAY} />
			) : (
				<DueDateInput
					register={register}
					defaultEndDate={defaultEndDate}
					isNoDueDate={isNoDueDate}
				/>
			)}

			<DueTimeInput
				register={register}
				defaultEndTime={defaultEndTime}
				isNoDueDate={isNoDueDate}
			/>

			<div className={classes.checkbox}>
				<input
					type='checkbox'
					id='no-due-date'
					onChange={onDueDateExist}
					checked={isNoDueDate}
				/>
				<label htmlFor='no-due-date'>No Due Date</label>
			</div>
		</div>
	);
};

export default DueDateTimeInput;
