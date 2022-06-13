import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMemoPad } from '@fortawesome/pro-duotone-svg-icons';

import { eventStyles } from './common-styles';
import { IEvent } from '../../../../../models/Event';

const EventDescription: React.FC<{ event: IEvent }> = ({ event: { description } }) => {
    return (
        <div className="flex flex-col">
            <span className={`${eventStyles.labelClass}`}>
                <FontAwesomeIcon
                    icon={faMemoPad}
                    className={`max-w-[1.3rem] max-h-[1.3rem] mr-2`}
                />
                Description
            </span>
            <p>{description || '-'}</p>
        </div>
    );
};

export default EventDescription;
