import { faArrowsRotate } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { RecurringInterval, RecurringIntervalList } from '../../../../../models/recurring-models';

import classes from '../RecurringEventForm.module.scss';

interface Props {
    register: UseFormRegister<any>;
    initialInterval?: RecurringInterval;
}

const IntervalInput: React.FC<Props> = ({ register, initialInterval }) => {
    return (
        <div className={`${classes.section} w-[45%]`}>
            <label htmlFor="interval">
                <FontAwesomeIcon icon={faArrowsRotate} className={'icon-medium mr-2'} />
                Interval
            </label>
            <select
                id="interval"
                defaultValue={initialInterval || RecurringInterval.WEEK}
                {...register('interval')}
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
