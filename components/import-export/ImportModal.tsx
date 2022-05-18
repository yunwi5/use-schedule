import React, { useCallback, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import { CalendarItemType, getItemIcon } from '../../models/calendar-models/CalendarItemType';
import { Theme } from '../../models/design-models';
import ActiveButton from '../ui/buttons/ActiveButton';
import Button from '../ui/buttons/Button';
import ExitIcon from '../ui/icons/ExitIcon';
import WrapperModal from '../ui/modal/modal-variation/WrapperModal';
import SectionWrapper from './SectionWrapper';
import AppFileInput from '../ui/input/AppFileInput';
import AppSelect from '../ui/input/AppSelect';
import { Category, CategoryList } from '../../models/task-models/Category';
import {
    convertEventJSONArraytoAppEventArray,
    convertEventJSONArraytoAppTaskArray,
    parseIcal,
} from '../../utilities/import-utils/ical-import';
import { EventJSON } from 'ical-js-parser';
import { postEvents } from '../../lib/events/event-apis';
import { postTasks } from '../../lib/planners/tasks-api';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import useNotification from '../../hooks/useNotification';
import { NotifStatus } from '../ui/Notification';
import { useAppSelector } from '../../store/redux';

interface Props {
    onClose(): void;
    onInvalidate?: () => void;
}

const ImportItemTypeList = [CalendarItemType.EVENT, CalendarItemType.TASK];

const ImportModal: React.FC<Props> = (props) => {
    const { onInvalidate, onClose } = props;
    const userId = useUser().user?.sub;
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);

    const [importItemType, setImportItemType] = useState<CalendarItemType>(CalendarItemType.TASK);
    const [importItemCategory, setImportItemCategory] = useState<Category>(Category.OTHERS);
    const [eventJSONArray, setEventJSONArray] = useState<EventJSON[]>([]);
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
            console.log(error);
            return;
        }
        setEventJSONArray(events);
    };

    const itemTypeHandler = (itemType: CalendarItemType) => () => setImportItemType(itemType);

    const uploadHandler = async () => {
        if (!userId) {
            console.log('UserId was nout found.');
            return;
        }
        let isSuccess,
            message = '';
        setNotification(NotifStatus.PENDING);
        if (importItemType === CalendarItemType.EVENT) {
            let importedEvents = convertEventJSONArraytoAppEventArray(eventJSONArray, userId);
            const { isSuccess: s, message: m } = await postEvents(importedEvents);
            isSuccess = s;
            message = m;
        } else if (importItemType === CalendarItemType.TASK) {
            let importedTasks = convertEventJSONArraytoAppTaskArray(
                eventJSONArray,
                userId,
                importItemCategory,
            );
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
                <h2 className="capitalize text-2xl pb-2 border-b-2 border-slate-200">
                    Import calendar items
                </h2>
                <SectionWrapper>
                    <h3>Attach your file (Ical or Csv)</h3>
                    <div className="flex flex-col gap-3">
                        <AppFileInput onChange={fileInputHandler} />
                        <p className="text-base">
                            We currently receive ICalendar (.ics) file or Csv (.csv) file as an
                            external file to transfer tasks or events from other applications.
                        </p>
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
                                onChange={(val: string) => setImportItemCategory(val as Category)}
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
