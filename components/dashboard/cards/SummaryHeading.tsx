import React from 'react';
import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    infoText?: string;
}

const SummaryHeading: React.FC<Props> = ({ children }) => {
    return (
        <h3 className="text-lg text-slate-600 font-semibold">
            {children}{' '}
            <FontAwesomeIcon
                icon={faCircleInfo}
                className="icon-medium text-slate-400 hover:text-blue-500/90 cursor-pointer"
            />
        </h3>
    );
};

export default SummaryHeading;
