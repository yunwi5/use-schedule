import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlarmClock } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';

import { getISOTimeFormat } from '../../../../utilities/date-utils/date-format';
import classes from './FormInput.module.scss';

interface Props {
    register: UseFormRegister<any>;
    initialItem?: { dateTime: Date };
    beginningPeriod: Date;
    className?: string;
}

const EventTimeInput: React.FC<Props> = ({ register, initialItem, beginningPeriod, className }) => {
    const intialTimeInput = initialItem
        ? getISOTimeFormat(initialItem.dateTime)
        : getISOTimeFormat(beginningPeriod);

    return (
        <div className={`${classes.section} ${className} w-[45%]`}>
            <label htmlFor="time">
                <FontAwesomeIcon icon={faAlarmClock} className={`icon-medium mr-2`} />
                Time
            </label>
            <input
                type="time"
                defaultValue={intialTimeInput}
                {...register('time', { required: 'Time is requied' })}
            />
        </div>
    );
};

export default EventTimeInput;
