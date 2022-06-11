import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMemoPad } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';

import { IEvent } from '../../../../../models/Event';
import classes from '../EventForm.module.scss';

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

interface Props {
    register: UseFormRegister<any>;
    initialEvent?: IEvent;
}

const EventDescriptionInput: React.FC<Props> = ({ initialEvent, register }) => {
    return (
        <div className={`${classes.section}`}>
            <label htmlFor="description">
                <FontAwesomeIcon icon={faMemoPad} className={labelIconClass} />
                Description
            </label>
            <textarea
                id="description"
                cols={30}
                rows={3}
                defaultValue={initialEvent?.description || ''}
                {...register('description')}
            />
        </div>
    );
};

export default EventDescriptionInput;
