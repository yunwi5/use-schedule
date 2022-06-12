import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/pro-duotone-svg-icons';

import { UseFormRegister } from 'react-hook-form';
import { getISODateFormat } from '../../../../../utilities/date-utils/date-format';
import { addDays } from '../../../../../utilities/date-utils/date-control';
import classes from '../RecurringEventForm.module.scss';

interface Props {
    register: UseFormRegister<any>;
    disabled?: boolean;
    defaultDate: Date;
    label: string;
    name: string;
}

const DynamicDateInput: FC<Props> = (props) => {
    const { register, defaultDate, label, name, disabled } = props;

    const initialDateInput = getISODateFormat(addDays(new Date(defaultDate), -1));

    return (
        <div className={`${classes.section} w-[45%]`}>
            <label htmlFor={`date-${name}`}>
                <FontAwesomeIcon icon={faCalendarDay} className={'icon-medium mr-2'} />
                {label}
            </label>
            <input
                id={`date-${name}`}
                type="date"
                disabled={disabled}
                defaultValue={initialDateInput}
                {...register(name)}
            />
        </div>
    );
};

export default DynamicDateInput;
