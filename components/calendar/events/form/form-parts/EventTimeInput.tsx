import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlarmClock } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';

import { IEvent } from '../../../../../models/Event';
import { getISOTimeFormat } from '../../../../../utilities/date-utils/date-format';
import classes from '../EventForm.module.scss';

interface Props {
    register: UseFormRegister<any>;
    initialEvent?: IEvent;
    beginningPeriod: Date;
}

const EventTimeInput: React.FC<Props> = ({ register, initialEvent, beginningPeriod }) => {
    const intialTimeInput = initialEvent
        ? getISOTimeFormat(initialEvent.dateTime)
        : getISOTimeFormat(beginningPeriod);

    return (
        <div className={`${classes.section} w-[45%]`}>
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
