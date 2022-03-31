import { useState, useEffect } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { WeekDayListFromMonday, WeekDay } from '../../../../../../models/date-models/WeekDay';

import { FormValues } from '../../../../../../utilities/form-utils/task-form-util';
import classes from '../../TaskForm.module.scss';

interface Props {
	register: UseFormRegister<FormValues>;
	initialDay?: WeekDay;
}

const weekdayList = WeekDayListFromMonday.slice(0, WeekDayListFromMonday.length - 1);

const WeekdayInput: React.FC<Props> = ({ register, initialDay }) => {
	return (
		<div className={`${classes.importance} ${classes.weekday}`}>
			<label htmlFor='dueDay'>Day</label>
			<select {...register('dueDay')} id='dueDay' defaultValue={initialDay ? initialDay : ''}>
				{weekdayList.map((day) => <option key={day}>{day}</option>)}
			</select>
		</div>
	);
};

export default WeekdayInput;