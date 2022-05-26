import React, { useState } from 'react';
import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './SummaryHeading.module.scss';

interface Props {
    info?: JSX.Element | string;
}

const SummaryHeading: React.FC<Props> = ({ info, children }) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <h3 className="flex gap-1 items-center text-lg text-slate-600 font-semibold">
            {children}{' '}
            <div className={classes.info} onClick={() => setShowInfo((ps) => !ps)}>
                <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="icon-medium translate-y-[1.5px] text-slate-400 hover:text-blue-500/90 cursor-pointer"
                />
                {info && (
                    <div
                        className={`${
                            showInfo ? '!block' : ''
                        } min-w-[15rem] z-50 px-2 py-2 font-normal text-base rounded-md text-gray-50 bg-blue-500/90 ${
                            classes['info-text']
                        }`}
                    >
                        <p>{info}</p>
                    </div>
                )}
            </div>
        </h3>
    );
};

export default SummaryHeading;
