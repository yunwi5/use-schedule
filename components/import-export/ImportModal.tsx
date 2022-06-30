import React, { useCallback, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import useNotification from '../../hooks/useNotification';
import { useAppSelector } from '../../store/redux';
import { CalendarItemType, getItemIcon } from '../../models/calendar-models/CalendarItemType';
import { Theme } from '../../models/design-models';
import ActiveButton from '../ui/buttons/ActiveButton';
import Button from '../ui/buttons/Button';
import ExitIcon from '../ui/icons/ExitIcon';
import WrapperModal from '../ui/modal/wrapper/WrapperModal';
import SectionWrapper from './SectionWrapper';
import AppFileInput from '../ui/input/AppFileInput';
import AppSelect from '../ui/input/AppSelect';
import { Category, CategoryList } from '../../models/task-models/Category';
import {
    convertEventJSONArraytoAppEventArray,
    convertEventJSONArraytoAppTaskArray,
} from '../../utilities/import-utils/ical-import';
import { EventJSON } from 'ical-js-parser';
import { postEvents } from '../../lib/events/event-apis';
import { postTasks } from '../../lib/planners/tasks-api';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { NotifStatus } from '../ui/Notification';
import { parseIcal } from '../../utilities/import-utils/ical-parse';
import InfoLink from '../ui/links/InfoLink';
import { getAboutLink } from '../../utilities/link-utils';
import { ImportExportSection } from '../../constants/about-sections';
import LearnMoreLink from '../ui/typography/LearnMoreLink';

interface Props {
    onClose(): void;
    onInvalidate?: () => void;
    defaultItemType?: CalendarItemType;
}

interface InputFile {
    name: string;
    eventJSONArray: EventJSON[];
}

const ImportItemTypeList = [CalendarItemType.EVENT, CalendarItemType.TASK];

const ImportModal: React.FC<Props> = (props) => {
    const { onInvalidate, onClose, defaultItemType } = props;
    const userId = useUser().user?.sub;
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);

    const [inputFile, setInputFile] = useState<InputFile>();
    const [importItemType, setImportItemType] = useState<CalendarItemType>(
        defaultItemType || CalendarItemType.EVENT,
    );
    // additional select option if the user chooses TASK as their import item type
    const [importItemCategory, setImportItemCategory] = useState<Category>(Category.OTHERS);
    // Notification to user Pending, Success or Error
    const { setNotification } = useNotification();

    const fileInputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if (!file) {
            console.log('File was nout found.');
            return;
        }
        const text = await file.text();
        const { error, events } = parseIcal(text);
        if (error) {
            console.error('Error occured while parsign ical!');
            console.error(error);
            return;
        }
        setInputFile({ name: file.name, eventJSONArray: events });
    };

    const itemTypeHandler = (itemType: CalendarItemType) => () => setImportItemType(itemType);

    const uploadHandler = async () => {
        if (!userId || !inputFile) {
            console.log('User or input file not found.');
            return;
        }
        let isSuccess,
            message = '';
        setNotification(NotifStatus.PENDING);
        if (importItemType === CalendarItemType.EVENT) {
            let importedEvents = convertEventJSONArraytoAppEventArray(
                inputFile.eventJSONArray,
                userId,
            );
            console.log(`${importedEvents.length} events produced.`);
            const { isSuccess: s, message: m } = await postEvents(importedEvents);
            isSuccess = s;
            message = m;
        } else if (importItemType === CalendarItemType.TASK) {
            let importedTasks = convertEventJSONArraytoAppTaskArray(
                inputFile.eventJSONArray,
                userId,
                importItemCategory,
            );
            console.log(`${importedTasks.length} tasks produced.`);
            const { isSuccess: s, message: m } = await postTasks(
                importedTasks,
                plannerMode || PlannerMode.WEEKLY,
            );
            isSuccess = s;
            message = m;
        }

        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, message);
            onInvalidate && onInvalidate();
            onClose();
        } else {
            setNotification(NotifStatus.ERROR, message);
        }
    };

    return (
        <WrapperModal onClose={onClose} className="flex flex-col min-h-[29.1rem]">
            <div className="relative p-1 flex-1 flex flex-col gap-5 text-slate-600">
                <ExitIcon onClose={onClose} className="text-slate-400 hover:text-slate-600" />
                <h2 className="flex items-center capitalize text-2xl pb-2 border-b-2 border-slate-200">
                    Import calendar items
                </h2>
                <SectionWrapper>
                    <h3>
                        Attach your ICalendar file{' '}
                        <span className={'text-base text-slate-500'}>(.ical or .ics)</span>
                    </h3>
                    <div className="flex flex-col gap-3 text-base">
                        <AppFileInput
                            onChange={fileInputHandler}
                            className={'!min-w-[15rem]'}
                        />
                        {inputFile && (
                            <p>
                                Received{' '}
                                <strong className={'text-slate-600'}>{inputFile.name}</strong>
                            </p>
                        )}
                        <p>
                            We receive ICalendar files as external files to transfer tasks or
                            events from other applications such as Google Calendar.
                        </p>
                        <div className={'-mt-1'}>
                            <LearnMoreLink href={getAboutLink(ImportExportSection.link)}>
                                Learn More
                            </LearnMoreLink>
                        </div>
                    </div>
                </SectionWrapper>
                <SectionWrapper>
                    <h3>Import As</h3>
                    <div className="flex gap-3">
                        {ImportItemTypeList.map((itemType) => (
                            <ActiveButton
                                key={itemType}
                                isActive={itemType === importItemType}
                                className="thinner-btn !min-w-[7rem] !shadow-md"
                                onClick={itemTypeHandler(itemType)}
                            >
                                {getItemIcon(itemType)}
                                {itemType}
                            </ActiveButton>
                        ))}
                    </div>
                </SectionWrapper>
                {importItemType === CalendarItemType.TASK && (
                    <SectionWrapper>
                        <h3>Select a category for these tasks</h3>
                        <div className="flex">
                            <AppSelect
                                label={'Category'}
                                value={importItemCategory}
                                className="flex-1 !max-w-[14.8rem] shadow-md"
                                options={CategoryList}
                                onChange={(val: string) =>
                                    setImportItemCategory(val as Category)
                                }
                                id={'category-select'}
                                labelId={'category-select-label'}
                            />
                        </div>
                    </SectionWrapper>
                )}
                <div className="mt-3 flex justify-center">
                    <Button
                        className="!min-w-[8rem]"
                        theme={Theme.TERTIARY}
                        onClick={uploadHandler}
                    >
                        Upload
                    </Button>
                </div>
            </div>
        </WrapperModal>
    );
};

export default ImportModal;
