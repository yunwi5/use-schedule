import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlarmClock } from '@fortawesome/pro-duotone-svg-icons';

import { eventStyles } from './common-styles';
import { IEvent } from '../../../../../models/Event';
import { getEventDateTimeFormat } from '../../../../../utilities/date-utils/date-format';

interface Props {
    event: IEvent;
}

const EventDateTime: React.FC<Props> = ({ event: { dateTime } }) => {
    return (
        <div className="flex flex-col">
            <span className={`${eventStyles.labelClass}`}>
                <FontAwesomeIcon icon={faAlarmClock} className={eventStyles.labelIconClass} />
                Date Time
            </span>
            <time>{getEventDateTimeFormat(dateTime)}</time>
        </div>
    );
};

export default EventDateTime;
