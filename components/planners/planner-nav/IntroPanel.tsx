import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarCircleExclamation,
    faChartPie,
    faCircleInfo,
} from '@fortawesome/pro-duotone-svg-icons';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';

import { useAppSelector } from '../../../store/redux';
import { Size, Theme } from '../../../models/design-models';
import ImportModal from '../planner-modal/ImportModal';
import Button from '../../ui/buttons/Button';
import Link from 'next/link';
import { getDataAnalysisLink } from '../../../utilities/analysis-utils';
import classes from './IntroPanel.module.scss';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';

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

    const plannerMode = useAppSelector((state) => state.planner.plannerMode);
    const statisticsLink = getDataAnalysisLink(plannerMode, beginningPeriod);

    const showPanelHandler = (show: boolean) => () => setShowPanel(show); // currying fn
    const importModalHandler = (show: boolean) => () => setShowImportModal(show); // currying fn

    const showTemplateImport = plannerMode === PlannerMode.WEEKLY;

    return (
        <Fragment>
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

                    <div className={classes.actions}>
                        <Link href={statisticsLink}>
                            <a>
                                <Button
                                    className={`mr-4 flex items-center ${classes.btn}`}
                                    theme={Theme.SECONDARY}
                                    size={Size.MEDIUM}
                                >
                                    <FontAwesomeIcon
                                        className="mr-2 max-w-[1.3rem]"
                                        icon={faChartPie as any}
                                    />{' '}
                                    Statistics
                                </Button>
                            </a>
                        </Link>
                        {showTemplateImport && (
                            <Button
                                className={`mr-4 flex items-center ${classes.btn}`}
                                theme={Theme.TERTIARY}
                                onClick={importModalHandler(true)}
                            >
                                <FontAwesomeIcon
                                    className="mr-2 max-w-[1.3rem]"
                                    icon={faCalendarCircleExclamation}
                                />
                                Time Table
                            </Button>
                        )}
                    </div>
                </div>
            )}
            {showImportModal && onMutate && (
                <ImportModal
                    onClose={importModalHandler(false)}
                    beginningPeriod={beginningPeriod}
                    onMutate={onMutate}
                />
            )}
        </Fragment>
    );
};

export default IntroPanel;
