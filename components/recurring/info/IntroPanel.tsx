import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import { faCircleInfo } from '@fortawesome/pro-duotone-svg-icons';

import { useAppSelector } from '../../../store/redux';
import classes from './IntroPanel.module.scss';

interface Props {
    title?: string;
    message?: string | JSX.Element;
}

const IntroPanel: React.FC<Props> = () => {
    const [showPanel, setShowPanel] = useState(true);
    // detail is always shown on tablet, laptop screen
    // detail can be shown optionally on the mobile by clicking on the panel.
    const [showDetail, setShowDetail] = useState(false);
    const itemType = useAppSelector((state) => state.recurring.mode.toLowerCase());

    const showPanelHandler = (show: boolean) => () => setShowPanel(show); // currying fn

    return (
        <>
            {!showPanel && (
                <div className={classes.emptyContainer}>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        className={classes.show}
                        onClick={showPanelHandler(true)}
                    />
                </div>
            )}
            {showPanel && (
                <div
                    className={`${classes.panel} ${showDetail ? classes.detail : ''}`}
                    onClick={() => setShowDetail((ps) => !ps)}
                >
                    <h2 className={'capitalize'}>Recurring {itemType}s</h2>
                    <p>
                        <span>
                            You can organize your repetitive {itemType}s that occur in regular
                            intervals in one place. The {itemType}s will be duplicated and added to
                            your calendar & planner up to{' '}
                            <strong className="text-slate-600/90 underline underline-offset-2">
                                1 YEAR FORWARD
                            </strong>
                            . The {itemType}s will be further added when the next date of the
                            interval is within 1 year.
                        </span>
                    </p>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={classes.exit}
                        onClick={showPanelHandler(false)}
                    />
                </div>
            )}
        </>
    );
};

export default IntroPanel;
