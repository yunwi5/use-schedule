import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import classes from '../../TaskForm.module.scss';

interface Props {
	register: UseFormRegister<any>;
	defaultEndDate: string;
	isNoDueDate: boolean;
}

const DueDateInput: React.FC<Props> = ({ register, defaultEndDate, isNoDueDate }) => {
	return (
		<div className={classes.date}>
			<input
				type='date'
				{...register('dueDate')}
				id='dueDate'
				defaultValue={defaultEndDate}
				disabled={isNoDueDate}
			/>
			<label htmlFor='dueDate'>Due Date</label>
		</div>
	);
};

export default DueDateInput;
