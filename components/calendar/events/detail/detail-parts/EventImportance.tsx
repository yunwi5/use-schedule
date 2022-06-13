import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarExclamation } from '@fortawesome/pro-duotone-svg-icons';

import { eventStyles } from './common-styles';
import { IEvent } from '../../../../../models/Event';

interface Props {
    event: IEvent;
}

const EventImportance: React.FC<Props> = ({ event: { importance } }) => {
    return (
        <div className="flex flex-col">
            <span className={`${eventStyles.labelClass}`}>
                <FontAwesomeIcon icon={faStarExclamation} className={eventStyles.labelIconClass} />
                Importance
            </span>
            <time>{importance}</time>
        </div>
    );
};

export default EventImportance;
