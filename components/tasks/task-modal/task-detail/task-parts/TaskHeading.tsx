import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBallotCheck } from '@fortawesome/pro-duotone-svg-icons';

const EventHeading: React.FC<{ task: { name: string } }> = ({ task: { name } }) => {
    return (
        <h2
            className={`text-3xl pb-2 border-b-2 border-blue-400/50 whitespace-nowrap overflow-hidden`}
        >
            <FontAwesomeIcon
                icon={faBallotCheck}
                className="inline-block max-w-[1.8rem] text-blue-600/90 max-h-[1.8rem] mr-1"
            />
            {name}
        </h2>
    );
};

export default EventHeading;
