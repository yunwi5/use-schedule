import { faCalendarDay } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                type="date"
                {...register('date')}
                id="date"
                defaultValue={defaultDate}
                disabled={isAnyTime}
            />
            <label htmlFor="date">
                <FontAwesomeIcon icon={faCalendarDay} className={'icon-medium mr-2'} />
                Date
            </label>
        </div>
    );
};

export default DateInput;
