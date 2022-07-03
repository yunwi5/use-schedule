import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlarmClock, faCalendarDay } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';
import { IEvent } from '../../../../../models/Event';
import {
    getISODateFormat,
    getISOTimeFormat,
} from '../../../../../utilities/date-utils/date-format';
import { addDays } from '../../../../../utilities/date-utils/date-control';
import classes from '../EventForm.module.scss';

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

interface Props {
    register: UseFormRegister<any>;
    initialEvent?: IEvent;
    beginningPeriod: Date;
}

const EventDateTimeInput: FC<Props> = ({ register, initialEvent, beginningPeriod }) => {
    const initialDateInput = initialEvent
        ? getISODateFormat(addDays(initialEvent.dateTime, -1))
        : getISODateFormat(addDays(beginningPeriod, -1));
    const intialTimeInput = initialEvent
        ? getISOTimeFormat(initialEvent.dateTime)
        : getISOTimeFormat(beginningPeriod);

    return (
        <div className={`grid grid-cols-2 gap-x-6 lg:x-gap-10`}>
            <div className={`${classes.section}`}>
                <label htmlFor="date">
                    <FontAwesomeIcon icon={faCalendarDay} className={labelIconClass} />
                    Date
                </label>
                <input type="date" defaultValue={initialDateInput} {...register('date')} />
            </div>
            <div className={`${classes.section}`}>
                <label htmlFor="time">
                    <FontAwesomeIcon icon={faAlarmClock} className={labelIconClass} />
                    Time
                </label>
                <input
                    type="time"
                    defaultValue={intialTimeInput}
                    {...register('time', { required: 'Time is requied' })}
                />
            </div>
        </div>
    );
};

export default EventDateTimeInput;
