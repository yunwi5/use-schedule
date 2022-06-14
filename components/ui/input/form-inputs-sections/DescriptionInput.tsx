import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMemoPad } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';

import classes from './FormInput.module.scss';

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

interface Props {
    register: UseFormRegister<any>;
    initialItem?: { description: string };
    className?: string;
}

const EventDescriptionInput: React.FC<Props> = ({ initialItem, register, className }) => {
    return (
        <div className={`${classes.section} ${className}`}>
            <label htmlFor="description">
                <FontAwesomeIcon icon={faMemoPad} className={labelIconClass} />
                Description
            </label>
            <textarea
                id="description"
                cols={30}
                rows={3}
                defaultValue={initialItem?.description || ''}
                {...register('description')}
            />
        </div>
    );
};

export default EventDescriptionInput;
