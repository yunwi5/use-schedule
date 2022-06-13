import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlarmClock, IconDefinition } from '@fortawesome/pro-duotone-svg-icons';

import { eventStyles } from './common-styles';
import { getFullDateFormat } from '../../../../../utilities/date-utils/date-format';

interface Props {
    date: Date;
    label: string;
    icon?: IconDefinition;
}

const EventDate: React.FC<Props> = ({ date, label, icon }) => {
    return (
        <div className="flex flex-col">
            <span className={`${eventStyles.labelClass}`}>
                <FontAwesomeIcon
                    icon={icon ?? faAlarmClock}
                    className={eventStyles.labelIconClass}
                />
                {label}
            </span>
            <time>{getFullDateFormat(date)}</time>
        </div>
    );
};

export default EventDate;
