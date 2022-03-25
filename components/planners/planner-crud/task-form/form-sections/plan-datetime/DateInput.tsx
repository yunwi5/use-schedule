import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import classes from '../../TaskForm.module.scss';

interface Props {
	register: UseFormRegister<any>;
	defaultDate: string;
	isAnyTime: boolean;
}

const DateInput: React.FC<Props> = ({ register, defaultDate, isAnyTime }) => {
	return (
		<div className={classes.date}>
			<input
				type='date'
				{...register('date')}
				id='date'
				defaultValue={defaultDate}
				disabled={isAnyTime}
			/>
			<label htmlFor='date'>Date</label>
		</div>
	);
};

export default DateInput;
