import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';

import { IEvent } from '../../../../../models/Event';
import classes from '../EventForm.module.scss';

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

interface Props {
    register: UseFormRegister<any>;
    initialEvent?: IEvent;
}

const EventMeetingLink: React.FC<Props> = ({ register, initialEvent }) => {
    return (
        <div className={`${classes.section}`}>
            <label htmlFor="meeting-link" defaultValue="">
                <FontAwesomeIcon icon={faVideo} className={labelIconClass} />
                Meeting Link
            </label>
            <input
                type="text"
                id="meeting-link"
                defaultValue={initialEvent?.meetingLink}
                {...register('meetingLink')}
            />
        </div>
    );
};

export default EventMeetingLink;
