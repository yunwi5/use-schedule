import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/pro-duotone-svg-icons';

import { eventStyles } from './common-styles';

interface Props {
    label: string;
    value: string | JSX.Element;
    icon: IconDefinition;
}

const EventDescription: React.FC<Props> = ({ label, value, icon }) => {
    return (
        <div className="flex flex-col">
            <span className={`${eventStyles.labelClass}`}>
                <FontAwesomeIcon icon={icon} className={`icon-medium mr-2`} />
                {label}
            </span>
            <p>{value || '-'}</p>
        </div>
    );
};

export default EventDescription;
