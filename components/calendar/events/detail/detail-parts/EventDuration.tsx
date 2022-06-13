import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/pro-duotone-svg-icons';
import { eventStyles } from './common-styles';
import { IEvent } from '../../../../../models/Event';
import { getDurationFormat } from '../../../../../utilities/date-utils/date-format';

interface Props {
    event: IEvent;
}

const EventDuration: React.FC<Props> = ({ event: { duration } }) => {
    return (
        <div className="flex flex-col">
            <span className={`${eventStyles.labelClass}`}>
                <FontAwesomeIcon icon={faHourglass} className={eventStyles.labelIconClass} />
                Duration
            </span>
            <time>{getDurationFormat(duration)}</time>
        </div>
    );
};

export default EventDuration;
