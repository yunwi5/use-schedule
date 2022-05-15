import React, { useState } from 'react';
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
import WrapperModal from '../ui/modal/modal-variation/WrapperModal';
import MonthIntervalInput from '../ui/intervals/MonthIntervalInput';
import YearIntervalInput from '../ui/intervals/YearIntervalInput';
import WeekIntervalInput from '../ui/intervals/WeekIntervalInput';

enum ExportFileType {
    ICS = 'Ics',
    CSV = 'Csv',
}
const ExportFileTypeList = [ExportFileType.ICS, ExportFileType.CSV];
const exportFileTypeIcons = [
    <FontAwesomeIcon key={2} icon={faCalendarArrowDown} className="icon-medium mr-2" />,
    <FontAwesomeIcon key={1} icon={faFileCsv} className="icon-medium mr-2" />,
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
    tasks: AbstractTask[];
    events: IEvent[];
    beginningPeriod?: Date;
}

interface ExportInterval {
    startDate: Date | null;
    endDate: Date | null;
}

const ExportModal: React.FC<Props> = ({ onClose, tasks, events, beginningPeriod }) => {
    const { user } = useUser();
    const [exportFileType, setExportFileType] = useState<ExportFileType>(ExportFileType.ICS);
    const [exportItems, setExportItems] = useState<CalendarItemType[]>([CalendarItemType.EVENT]);
    const [exportItemError, setExportItemError] = useState<string | null>(null);
    const [exportPeriod, setExportPeriod] = useState<ExportPeriod>(ExportPeriod.ALL);

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

    const exportPeriodHandler = (exportPeriod: ExportPeriod) => {
        setExportPeriod(exportPeriod);
    };

    const exportIntervalHandler = (newInterval: ExportInterval) => {
        setExportInterval(newInterval);
    };

    const exportHandler = async () => {
        if (exportItems.length === 0) {
            setExportItemError('You need to choose at least one item type!');
            return;
        }
        const includeEvents = exportItems.includes(CalendarItemType.EVENT);
        const includeTasks = exportItems.includes(CalendarItemType.TASK);
        let icsResult = createIcsFile(
            includeEvents ? events : null,
            includeTasks ? tasks : null,
            user,
        );
        // console.log('ics text:', icsResult);
        downloadFile(getExportIcsFileName(exportItems), icsResult);
    };

    return (
        <WrapperModal onClose={onClose} className="flex flex-col min-h-[29.1rem]">
            <div className="relative p-1 flex-1 flex flex-col gap-5 text-slate-600">
                <ExitIcon onClose={onClose} className="text-slate-400 hover:text-slate-600" />
                <h2 className="capitalize text-2xl pb-2 border-b-2 border-slate-200">
                    Export calendar items
                </h2>
                <div className="flex flex-col gap-3 text-xl">
                    <h3>Choose the export file type</h3>
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
                    <h3>Choose Item Type(s) to Export</h3>
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
                    {exportItemError && <p className="-mt-1 error-message">{exportItemError}</p>}
                </div>

                <div className="flex flex-col gap-3 text-xl">
                    <h3>Choose the Period</h3>
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
                            />
                        )}
                        {exportPeriod === ExportPeriod.MONTH && (
                            <MonthIntervalInput
                                beginningPeriod={beginningPeriod}
                                onChangeInterval={exportIntervalHandler}
                            />
                        )}
                        {exportPeriod === ExportPeriod.YEAR && (
                            <YearIntervalInput
                                beginningPeriod={beginningPeriod}
                                onChangeInterval={exportIntervalHandler}
                            />
                        )}
                    </div>
                )}

                <div className="mt-3 flex justify-center">
                    <Button
                        className="!min-w-[8rem]"
                        theme={Theme.TERTIARY}
                        onClick={exportHandler}
                    >
                        Download
                    </Button>
                </div>
            </div>
        </WrapperModal>
    );
};

export default ExportModal;
