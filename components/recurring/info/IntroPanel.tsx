import React, { useState } from 'react';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import { faCircleInfo } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './IntroPanel.module.scss';

interface Props {
    title: string;
    message: string | JSX.Element;
}

const IntroPanel: React.FC<Props> = ({ title, message }) => {
    const [showPanel, setShowPanel] = useState(true);

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
                <div className={classes.panel}>
                    <h2>{title}</h2>
                    <p>{message}</p>
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
