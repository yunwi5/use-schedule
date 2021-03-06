import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faXmark } from '@fortawesome/pro-duotone-svg-icons';

import classes from './TodoIntroPanel.module.scss';

const TodoIntroPanel: React.FC = () => {
    const [showPanel, setShowPanel] = useState(true);

    const showPanelHandler = useCallback((show: boolean) => {
        setShowPanel(show);
    }, []);

    return (
        <>
            {!showPanel && (
                <div className={classes.emptyContainer}>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        className={classes.show}
                        onClick={showPanelHandler.bind(null, true)}
                    />
                </div>
            )}
            {showPanel && (
                <div className={classes.panel}>
                    <h2>Your Custom Todo List</h2>
                    <p>
                        Make your own list and todos, then complete them one by one. You can
                        also specify due date which will be shown on the calendar.
                    </p>

                    <FontAwesomeIcon
                        icon={faXmark}
                        className={classes.exit}
                        onClick={showPanelHandler.bind(null, false)}
                    />
                </div>
            )}
        </>
    );
};

export default TodoIntroPanel;
