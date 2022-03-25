import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import classes from '../../TaskForm.module.scss';

interface Props {
	register: UseFormRegister<any>;
	defaultTime: string;
	isAnyTime: boolean;
}

// Time input for PlanDateTime section.
const TimeInput: React.FC<Props> = ({ register, defaultTime, isAnyTime }) => {
	return (
		<div className={classes.time}>
			<input
				type='time'
				{...register('time')}
				id='time'
				defaultValue={defaultTime}
				disabled={isAnyTime}
			/>
			<label htmlFor='time'>Time</label>
		</div>
	);
};

export default TimeInput;
