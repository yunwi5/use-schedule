import { useState, useEffect } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { WeekDayListFromMonday, WeekDay } from '../../../../../../models/date-models/WeekDay';

import { FormValues } from '../../../../../../utilities/form-utils/task-form-util';
import classes from '../../TaskForm.module.scss';

interface Props {
	register: UseFormRegister<FormValues>;
	initialDay?: WeekDay;
	isAnyTime: boolean;
}

const weekdayList = WeekDayListFromMonday.slice(0, WeekDayListFromMonday.length - 1);

const WeekdayInput: React.FC<Props> = ({ register, initialDay, isAnyTime }) => {
	return (
		<div className={`${classes.weekday}`}>
			<select
				{...register('day')}
				id='weekday'
				defaultValue={initialDay ? initialDay : ''}
				disabled={isAnyTime}
			>
				{weekdayList.map((day) => <option key={day}>{day}</option>)}
			</select>
			<label htmlFor='weekday'>Day</label>
		</div>
	);
};

export default WeekdayInput;
