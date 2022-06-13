import { faArrowsRotate } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IEvent } from '../../../../../models/Event';
import { RecurringInterval, RecurringIntervalList } from '../../../../../models/recurring-models';
import { RecurringEvent } from '../../../../../models/recurring-models/RecurringEvent';

import classes from '../RecurringEventForm.module.scss';

interface Props {
    register: UseFormRegister<any>;
    disabled: boolean;
    initialInterval?: RecurringInterval;
    initialEvent?: IEvent | RecurringEvent;
}

function getInitialInterval(event: IEvent | RecurringEvent | undefined) {
    if (event == null || !event.hasOwnProperty('interval')) return RecurringInterval.WEEK;
    return (event as RecurringEvent).interval;
}

const IntervalInput: React.FC<Props> = ({ register, initialEvent, disabled }) => {
    return (
        <div className={`${classes.section} w-[45%]`}>
            <label htmlFor="interval">
                <FontAwesomeIcon icon={faArrowsRotate} className={'icon-medium mr-2'} />
                Interval
            </label>
            <select
                id="interval"
                defaultValue={getInitialInterval(initialEvent)}
                {...register('interval')}
                disabled={disabled}
            >
                {RecurringIntervalList.map((interval) => (
                    <option key={interval} value={interval}>
                        {'Every ' + interval}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default IntervalInput;
