import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek } from '@fortawesome/pro-duotone-svg-icons';

const EventHeading: React.FC<{ event: { name: string } }> = ({ event: { name } }) => {
    return (
        <h2
            className={`text-3xl pb-2 border-b-2 border-sky-400/50 whitespace-nowrap overflow-hidden`}
        >
            <FontAwesomeIcon
                icon={faCalendarWeek}
                className="inline-block max-w-[1.8rem] max-h-[1.8rem] mr-1"
            />
            {name}
        </h2>
    );
};

export default EventHeading;
