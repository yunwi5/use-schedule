import React, { useCallback, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarArrowDown, faFileCsv } from '@fortawesome/pro-duotone-svg-icons';

import { CalendarItemType, getItemIcon } from '../../models/calendar-models/CalendarItemType';
import { Theme } from '../../models/design-models';
import { IEvent } from '../../models/Event';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { downloadFile } from '../../utilities/export-utils';
import { createIcsFile } from '../../utilities/export-utils/ics-export';
import ActiveButton from '../ui/buttons/ActiveButton';
import Button from '../ui/buttons/Button';
import ExitIcon from '../ui/icons/ExitIcon';
import WrapperModal from '../ui/modal/wrapper/WrapperModal';
import { filterItemsOnInterval } from '../../utilities/filter-utils/date-filter';
import { WeekIntervalInput, YearIntervalInput, MonthIntervalInput } from '../ui/intervals';
import useTaskQuery from '../../hooks/useTaskQuery';
import useEventQuery from '../../hooks/useEventQuery';
import InfoLink from '../ui/links/InfoLink';
import { getAboutLink } from '../../utilities/link-utils';
import { ImportExportSection } from '../../constants/about-sections';

enum ExportFileType {
    ICS = 'Ics',
    CSV = 'Csv',
}
// ONLY ICS file at the moment
const ExportFileTypeList = [ExportFileType.ICS];
const exportFileTypeIcons = [
    <FontAwesomeIcon key={2} icon={faCalendarArrowDown} className="icon-medium mr-2" />,
    // <FontAwesomeIcon key={1} icon={faFileCsv} className="icon-medium mr-2" />,
];

enum ExportPeriod {
    WEEK = 'Week',
    MONTH = 'Month',
    YEAR = 'Year',
    ALL = 'All',
}
const ExportPeriodList = [
    ExportPeriod.WEEK,
    ExportPeriod.MONTH,
    ExportPeriod.YEAR,
    ExportPeriod.ALL,
];

const ExportItemTypeList = [CalendarItemType.EVENT, CalendarItemType.TASK];

function getExportIcsFileName(exportItems: CalendarItemType[]) {
    return exportItems.map((item) => `${item.toLowerCase()}s`).join('-and-') + '.ics';
}

interface Props {
    onClose: () => void;
    beginningPeriod?: Date;
}

interface ExportInterval {
    startDate: Date | null;
    endDate: Date | null;
}

const ExportModal: React.FC<Props> = ({ onClose, beginningPeriod }) => {
    const { allTasks: tasks } = useTaskQuery();
    const { events } = useEventQuery();
    const { user } = useUser();
    const [exportFileType, setExportFileType] = useState<ExportFileType>(ExportFileType.ICS);
    const [exportItems, setExportItems] = useState<CalendarItemType[]>([
        CalendarItemType.EVENT,
    ]);
    const [exportItemError, setExportItemError] = useState<string | null>(null);
    const [exportPeriod, setExportPeriod] = useState<ExportPeriod>(ExportPeriod.ALL);
    const [error, setError] = useState<string | null>(null);

    const [exportInterval, setExportInterval] = useState<ExportInterval>({
        startDate: null,
        endDate: null,
    });

    const fileTypeHandler = (newFileType: ExportFileType) => {
        setExportFileType(newFileType);
    };

    const exportItemHandler = (targetItem: CalendarItemType) => {
        if (exportItems.includes(targetItem)) {
            setExportItems(exportItems.filter((item) => targetItem !== item));
        } else {
            setExportItems([...exportItems, targetItem]);
            setExportItemError(null);
        }
    };

    const exportPeriodHandler = useCallback((exportPeriod: ExportPeriod) => {
        setExportPeriod(exportPeriod);
    }, []);

    const exportIntervalHandler = useCallback((newInterval: ExportInterval) => {
        const { startDate, endDate } = newInterval;
        // No change, when the interval is invalid
        if (startDate && endDate && startDate.getTime() >= endDate.getTime()) {
            setError('Invalid interval. Start date should be earlier than end date.');
            return;
        }
        setError(null);
        setExportInterval(newInterval);
    }, []);

    const exportHandler = async () => {
        if (exportItems.length === 0) {
            setExportItemError('You need to choose at least one item type!');
            return;
        }
        const includeEvents = exportItems.includes(CalendarItemType.EVENT);
        const includeTasks = exportItems.includes(CalendarItemType.TASK);

        const { startDate, endDate } = exportInterval;
        let filteredEvents = events,
            filteredTasks = tasks;
        // Apply date filter only when filter interval exists.
        if (exportPeriod !== ExportPeriod.ALL && startDate && endDate) {
            filteredEvents = filterItemsOnInterval(events, startDate, endDate) as IEvent[];
            filteredTasks = filterItemsOnInterval(tasks, startDate, endDate) as AbstractTask[];
        }
        let icsResult = createIcsFile(
            includeEvents ? filteredEvents : null,
            includeTasks ? filteredTasks : null,
            user,
        );
        downloadFile(getExportIcsFileName(exportItems), icsResult);
    };

    return (
        <WrapperModal onClose={onClose} className="flex flex-col min-h-[29.1rem]">
            <div className="relative p-1 flex-1 flex flex-col gap-5 text-slate-600">
                <ExitIcon onClose={onClose} className="text-slate-400 hover:text-slate-600" />
                <h2 className="capitalize text-2xl pb-2 border-b-2 border-slate-200">
                    Export calendar items
                </h2>
                <div className="relative flex flex-col gap-3 text-xl">
                    <InfoLink
                        href={getAboutLink(ImportExportSection.link)}
                        className={`!absolute top-2 right-3`}
                    />
                    <h3>
                        File Type ICalendar{' '}
                        <span className={'text-base text-slate-500'}>(.ical or .ics)</span>
                    </h3>
                    <div className="flex gap-3">
                        {ExportFileTypeList.map((fileType, idx) => (
                            <ActiveButton
                                key={fileType}
                                isActive={exportFileType === fileType}
                                className="thinner-btn"
                                onClick={fileTypeHandler.bind(null, fileType)}
                            >
                                {exportFileTypeIcons[idx]}
                                {fileType}
                            </ActiveButton>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-3 text-xl">
                    <h3>Choose item type(s) to export</h3>
                    <div className="flex gap-3">
                        {ExportItemTypeList.map((itemType) => (
                            <ActiveButton
                                key={itemType}
                                isActive={exportItems.includes(itemType)}
                                className="thinner-btn"
                                onClick={exportItemHandler.bind(null, itemType)}
                            >
                                {getItemIcon(itemType)}
                                {itemType}
                            </ActiveButton>
                        ))}
                    </div>
                    {exportItemError && (
                        <p className="-mt-1 error-message">{exportItemError}</p>
                    )}
                </div>

                <div className="flex flex-col gap-3 text-xl">
                    <h3>Choose the period</h3>
                    <div className="flex gap-3">
                        {ExportPeriodList.map((period) => (
                            <ActiveButton
                                key={period}
                                isActive={exportPeriod === period}
                                className="thinner-btn"
                                onClick={exportPeriodHandler.bind(null, period)}
                            >
                                {period}
                            </ActiveButton>
                        ))}
                    </div>
                </div>

                {exportPeriod !== ExportPeriod.ALL && beginningPeriod && (
                    <div className="flex flex-col gap-4 text-xl">
                        <h3>Choose your preferred interval</h3>
                        {exportPeriod === ExportPeriod.WEEK && (
                            <WeekIntervalInput
                                beginningPeriod={beginningPeriod}
                                onChangeInterval={exportIntervalHandler}
                                error={error}
                            />
                        )}
                        {exportPeriod === ExportPeriod.MONTH && (
                            <MonthIntervalInput
                                beginningPeriod={beginningPeriod}
                                onChangeInterval={exportIntervalHandler}
                                error={error}
                            />
                        )}
                        {exportPeriod === ExportPeriod.YEAR && (
                            <YearIntervalInput
                                beginningPeriod={beginningPeriod}
                                onChangeInterval={exportIntervalHandler}
                                error={error}
                            />
                        )}
                    </div>
                )}

                <div className="mt-3 flex justify-center">
                    <Button
                        className="!min-w-[8rem]"
                        theme={Theme.TERTIARY}
                        onClick={exportHandler}
                        disabled={!!error}
                    >
                        Download
                    </Button>
                </div>
            </div>
        </WrapperModal>
    );
};

export default ExportModal;
