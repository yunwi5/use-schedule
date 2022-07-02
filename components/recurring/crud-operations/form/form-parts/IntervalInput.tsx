import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';
import { IEvent } from '../../../../../models/Event';
import {
    RecurringInterval,
    RecurringIntervalList,
    RecurringItem,
} from '../../../../../models/recurring-models';
import { RecurringEvent } from '../../../../../models/recurring-models/RecurringEvent';
import { AbstractTask } from '../../../../../models/task-models/AbstractTask';

import classes from '../RecurringForm.module.scss';

interface Props {
    register: UseFormRegister<any>;
    disabled: boolean;
    initialInterval?: RecurringInterval;
    initialItem?: IEvent | RecurringItem | AbstractTask;
    className?: string;
}

function getInitialInterval(event: any) {
    if (event == null || !event.hasOwnProperty('interval')) return RecurringInterval.WEEK;
    return (event as RecurringEvent).interval;
}

const IntervalInput: React.FC<Props> = ({ register, initialItem, disabled, className }) => {
    return (
        <div className={`${classes.section} ${className} w-[45%]`}>
            <label htmlFor="interval">
                <FontAwesomeIcon icon={faArrowsRotate} className={'icon-medium mr-2'} />
                Interval
            </label>
            <select
                id="interval"
                defaultValue={getInitialInterval(initialItem)}
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
