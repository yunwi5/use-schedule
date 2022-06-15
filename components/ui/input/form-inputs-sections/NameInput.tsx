import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, IconDefinition } from '@fortawesome/pro-duotone-svg-icons';
import { FieldError, UseFormRegister } from 'react-hook-form';

import classes from './FormInput.module.scss';

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

interface Props {
    register: UseFormRegister<any>;
    errors: { [key: string]: FieldError | undefined };
    initialItem?: { name: string };
    icon?: IconDefinition;
    className?: string;
}

const EventNameInput: React.FC<Props> = (props) => {
    const { register, initialItem, errors, className, icon } = props;
    return (
        <div
            className={`${classes.section} ${
                errors.name ? classes['invalid-section'] : ''
            } ${className}`}
        >
            <label htmlFor="name">
                <FontAwesomeIcon icon={icon ?? faCalendarWeek} className={labelIconClass} /> Title
            </label>
            <input
                type="text"
                id="name"
                placeholder={'Enter the title of this schedule'}
                defaultValue={initialItem?.name || ''}
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
