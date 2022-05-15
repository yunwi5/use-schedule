import { faCalendarArrowDown, faFileCsv } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { CalendarItemType, getItemIcon } from '../../models/calendar-models/CalendarItemType';
import { Theme } from '../../models/design-models';
import { IEvent } from '../../models/Event';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { downloadFile } from '../../utilities/export-utils';
import { createIcsEvents } from '../../utilities/export-utils/ics-export';
import ActiveButton from '../ui/buttons/ActiveButton';
import Button from '../ui/buttons/Button';
import ExitIcon from '../ui/icons/ExitIcon';
import WrapperModal from '../ui/modal/modal-variation/WrapperModal';

enum ExportFileType {
    ICS = 'Ics',
    CSV = 'Csv',
}
const ExportFileTypeList = [ExportFileType.CSV, ExportFileType.ICS];
const exportFileTypeIcons = [
    <FontAwesomeIcon key={1} icon={faFileCsv} className="icon-medium mr-2" />,
    <FontAwesomeIcon key={2} icon={faCalendarArrowDown} className="icon-medium mr-2" />,
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

const ExportItemTypeList = [CalendarItemType.TASK, CalendarItemType.EVENT];

function getExportIcsFileName(exportItems: CalendarItemType[]) {
    return exportItems.map((item) => `${item.toLowerCase()}s`).join('-and-') + '.ics';
}

interface Props {
    onClose: () => void;
    tasks: AbstractTask[];
    events: IEvent[];
}

const ExportModal: React.FC<Props> = ({ onClose, tasks, events }) => {
    const [exportFileType, setExportFileType] = useState<ExportFileType>(ExportFileType.ICS);
    const [exportItems, setExportItems] = useState<CalendarItemType[]>([CalendarItemType.EVENT]);
    const [exportItemError, setExportItemError] = useState<string | null>(null);
    const [exportPeriod, setExportPeriod] = useState<ExportPeriod>(ExportPeriod.ALL);

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

    const exportHandler = async () => {
        if (exportItems.length === 0) {
            setExportItemError('You need to choose at least one item type!');
            return;
        }
        const icsResult = createIcsEvents(events);
        // window.open('data:text/calendar;charset=utf8,' + escape(icsResult));
        downloadFile(getExportIcsFileName(exportItems), icsResult);
    };

    return (
        <WrapperModal onClose={onClose} className="flex flex-col min-h-[29rem]">
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

                <div className="mt-auto flex justify-center">
                    <Button
                        className="!min-w-[8rem]"
                        theme={Theme.TERTIARY}
                        onClick={exportHandler}
                    >
                        Download
                    </Button>
                </div>
                <iframe id="my_iframe" style={{ display: 'none' }}></iframe>
            </div>
        </WrapperModal>
    );
};

export default ExportModal;
