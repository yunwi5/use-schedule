import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/pro-duotone-svg-icons';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { IEvent } from '../../../../../models/Event';
import classes from '../EventForm.module.scss';

interface Props {
    register: UseFormRegister<any>;
    initialEvent?: IEvent;
    errors: { [key: string]: FieldError | undefined };
}

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

const EventDurationInput: React.FC<Props> = ({ register, errors, initialEvent }) => {
    const defaultDuration = initialEvent?.duration || 0;

    return (
        <div className={`${classes.section}`}>
            <label htmlFor="duration" className={'flex items-center'}>
                <FontAwesomeIcon icon={faHourglass} className={labelIconClass} />
                Duration
            </label>
            <div className="flex items-center">
                <input
                    type="number"
                    id="duration-hours"
                    className={`max-w-[42%] ${
                        errors.durationHours ? classes['invalid-input'] : ''
                    }`}
                    defaultValue={Math.floor(defaultDuration / 60)}
                    {...register('durationHours', {
                        min: { value: 0, message: 'Hours cannot be negative' },
                    })}
                />
                <label className="ml-1 mr-[1rem]" htmlFor="duration-hours">
                    h
                </label>
                <input
                    type="number"
                    id="duration-minutes"
                    className={`max-w-[42%] ${
                        errors.durationMinutes ? classes['invalid-input'] : ''
                    }`}
                    defaultValue={defaultDuration % 60}
                    {...register('durationMinutes', {
                        min: { value: 0, message: 'Minutes cannot be negative' },
                    })}
                />
                <label className="ml-1" htmlFor="duration-minutes">
                    m
                </label>
            </div>
            {errors.durationHours && (
                <p className={classes.error}>{errors.durationHours.message}</p>
            )}
            {errors.durationMinutes && (
                <p className={`${classes.error} -mt-3`}>{errors.durationMinutes.message}</p>
            )}
        </div>
    );
};

export default EventDurationInput;
