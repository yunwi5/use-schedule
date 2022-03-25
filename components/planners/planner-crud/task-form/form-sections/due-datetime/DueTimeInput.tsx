import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import classes from '../../TaskForm.module.scss';

interface Props {
	register: UseFormRegister<any>;
	defaultEndTime: string;
	isNoDueDate: boolean;
}

const DueTimeInput: React.FC<Props> = ({ register, defaultEndTime, isNoDueDate }) => {
	return (
		<div className={classes.time}>
			<input
				type='time'
				{...register('dueTime')}
				id='dueTime'
				defaultValue={defaultEndTime}
				disabled={isNoDueDate}
			/>
			<label htmlFor='dueTime'>Due Time</label>
		</div>
	);
};

export default DueTimeInput;
