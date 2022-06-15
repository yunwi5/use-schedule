import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';

import { IEvent } from '../../../../../models/Event';
import classes from '../EventForm.module.scss';

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

interface Props {
    register: UseFormRegister<any>;
    initialEvent?: IEvent;
}

const EventLocationInput: React.FC<Props> = ({ register, initialEvent }) => {
    return (
        <div className={`${classes.section}`}>
            <label htmlFor="location">
                <FontAwesomeIcon icon={faLocationDot} className={labelIconClass} />
                Location
            </label>
            <input
                placeholder="Enter the location i.e. Melbourne, Australia"
                type="text"
                id="location"
                defaultValue={initialEvent?.location || ''}
                {...register('location')}
            />
        </div>
    );
};

export default EventLocationInput;
