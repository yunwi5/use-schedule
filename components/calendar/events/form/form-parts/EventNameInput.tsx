import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek } from '@fortawesome/pro-duotone-svg-icons';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { IEvent } from '../../../../../models/Event';
import classes from '../EventForm.module.scss';

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

interface Props {
    register: UseFormRegister<any>;
    initialEvent?: IEvent;
    errors: { [key: string]: FieldError | undefined };
}

const EventNameInput: React.FC<Props> = ({ register, initialEvent, errors }) => {
    return (
        <div className={`${classes.section} ${errors.name ? classes['invalid-section'] : ''}`}>
            <label htmlFor="name">
                <FontAwesomeIcon icon={faCalendarWeek} className={labelIconClass} /> Title
            </label>
            <input
                type="text"
                id="name"
                defaultValue={initialEvent?.name || ''}
                {...register('name', {
                    required: 'Title is required',
                    minLength: { value: 3, message: 'Minimum 3 characters' },
                    maxLength: { value: 50, message: 'Maximum 50 characters' },
                })}
            />
            {errors.name && <p className={classes.error}>{errors.name.message}</p>}
        </div>
    );
};

export default EventNameInput;
