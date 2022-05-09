import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarCircleExclamation,
    faChartPie,
    faCircleInfo,
} from "@fortawesome/pro-duotone-svg-icons";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";

import { Size, Theme } from "../../../models/design-models";
import Button from "../../ui/buttons/Button";
import ImportModal from "../planner-modal/ImportModal";
import classes from "./IntroPanel.module.scss";

interface Props {
    title: string;
    message: string;
    beginningPeriod: Date;
    onMutate?: () => void;
}

const IntroPanel: React.FC<Props> = (props) => {
    const { title, message, beginningPeriod, onMutate } = props;
    const [showPanel, setShowPanel] = useState(true);
    const [showImportModal, setShowImportModal] = useState(false);

    const showPanelHandler = (show: boolean) => {
        setShowPanel(show);
    };

    const importModalHandler = (show: boolean) => {
        setShowImportModal(show);
    };

    return (
        <Fragment>
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
                    <h2>{title}</h2>
                    <p>{message}</p>

                    <FontAwesomeIcon
                        icon={faXmark}
                        className={classes.exit}
                        onClick={showPanelHandler.bind(null, false)}
                    />

                    <div className={classes.actions}>
                        <Button
                            className={`mr-4 flex items-center ${classes.btn}`}
                            theme={Theme.SECONDARY}
                            size={Size.MEDIUM}
                        >
                            <FontAwesomeIcon
                                className="mr-2 max-w-[1.3rem]"
                                icon={faChartPie as any}
                            />{" "}
                            See Statistics
                        </Button>
                        <Button
                            className={`mr-4 flex items-center ${classes.btn}`}
                            theme={Theme.TERTIARY}
                            onClick={importModalHandler.bind(null, true)}
                        >
                            <FontAwesomeIcon
                                className="mr-2 max-w-[1.3rem]"
                                icon={faCalendarCircleExclamation}
                            />
                            Import Template
                        </Button>
                    </div>
                </div>
            )}
            {showImportModal && onMutate && (
                <ImportModal
                    onClose={importModalHandler.bind(null, false)}
                    beginningPeriod={beginningPeriod}
                    onMutate={onMutate}
                />
            )}
        </Fragment>
    );
};

export default IntroPanel;
