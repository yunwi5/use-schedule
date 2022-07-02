import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarCircleExclamation,
    faChartPie,
    faCircleInfo,
    faFileExport,
    faFileImport,
} from '@fortawesome/pro-duotone-svg-icons';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';

import { useAppSelector } from '../../../store/redux';
import { Size, Theme } from '../../../models/design-models';
import TemplateImportModal from '../planner-modal/ImportModal';
import Button from '../../ui/buttons/Button';
import { getDataAnalysisLink } from '../../../utilities/analysis-utils';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import ImportModal from '../../import-export/ImportModal';
import { CalendarItemType } from '../../../models/calendar-models/CalendarItemType';
import ExportModal from '../../import-export/ExportModal';
import classes from './IntroPanel.module.scss';

interface Props {
    title: string;
    message: string;
    beginningPeriod: Date;
    onMutate?: () => void;
}

const IntroPanel: React.FC<Props> = (props) => {
    const { title, message, beginningPeriod, onMutate } = props;
    const [showPanel, setShowPanel] = useState(true);
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    // handling external file input (ics or csv)
    const [showImportModal, setShowImportModal] = useState(false);
    // handling external file output (ics or csv)
    const [showExportModal, setShowExportModal] = useState(false);

    const plannerMode = useAppSelector((state) => state.planner.plannerMode);
    const statisticsLink = getDataAnalysisLink(plannerMode, beginningPeriod);

    const showPanelHandler = (show: boolean) => () => setShowPanel(show); // currying fn
    const templateModalHandler = (show: boolean) => () => setShowTemplateModal(show); // currying fn
    const importModalHandler = (show: boolean) => () => setShowImportModal(show); // currying fn
    const exportModalHandler = (show: boolean) => () => setShowExportModal(show); // currying fn

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
                    <div className={classes['heading-container']}>
                        <h2>{title}</h2>
                    </div>
                    <p className={''}>{message}</p>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={classes.exit}
                        onClick={showPanelHandler(false)}
                    />

                    <div className={classes.actions}>
                        <Link href={statisticsLink}>
                            <a className={`mr-4 !max-w-none`}>
                                <Button
                                    theme={Theme.SECONDARY}
                                    size={Size.MEDIUM}
                                    className={
                                        'w-full !max-w-none flex items-center px-[0.7rem]'
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="mr-2 max-w-[1.3rem]"
                                        icon={faChartPie as any}
                                    />{' '}
                                    Data Analysis
                                </Button>
                            </a>
                        </Link>
                        {showTemplateImport && (
                            <Button
                                className={`mr-4 flex items-center !max-w-none px-[0.7rem]`}
                                theme={Theme.TERTIARY}
                                onClick={templateModalHandler(true)}
                            >
                                <FontAwesomeIcon
                                    className="mr-2 max-w-[1.3rem]"
                                    icon={faCalendarCircleExclamation}
                                />
                                Template Tables
                            </Button>
                        )}
                        <Button
                            className={`mr-4 !max-w-none flex items-center px-[0.7rem] !bg-transparent !text-sky-600/80 !border-sky-600/80 hover:!bg-sky-500 hover:!text-sky-50`}
                            onClick={importModalHandler(true)}
                        >
                            <FontAwesomeIcon
                                icon={faFileImport}
                                className="icon-medium mr-2"
                            />{' '}
                            Import
                        </Button>
                        <Button
                            className={`mr-4 flex items-center px-[0.7rem] !max-w-none !bg-transparent !text-blue-600/80 !border-blue-600/80 hover:!bg-blue-500 hover:!text-blue-50`}
                            onClick={exportModalHandler(true)}
                        >
                            <FontAwesomeIcon
                                icon={faFileExport}
                                className="icon-medium mr-2"
                            />{' '}
                            Export
                        </Button>
                    </div>
                </div>
            )}
            {showTemplateModal && onMutate && (
                <TemplateImportModal
                    onClose={templateModalHandler(false)}
                    beginningPeriod={beginningPeriod}
                    onMutate={onMutate}
                />
            )}
            {showImportModal && (
                <ImportModal
                    defaultItemType={CalendarItemType.TASK}
                    onClose={importModalHandler(false)}
                    onInvalidate={onMutate}
                />
            )}
            {showExportModal && (
                <ExportModal
                    onClose={exportModalHandler(false)}
                    beginningPeriod={beginningPeriod}
                />
            )}
        </Fragment>
    );
};

export default IntroPanel;
