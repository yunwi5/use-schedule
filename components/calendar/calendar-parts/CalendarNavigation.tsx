import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilterList } from '@fortawesome/pro-duotone-svg-icons';

import { CalendarMode } from '../../../models/calendar-models/CalendarMode';
import { Size, Theme } from '../../../models/design-models';
import { useAppSelector } from '../../../store/redux';
import { useDispatch } from 'react-redux';
import { calendarActions } from '../../../store/redux/calendar-slice';
import Button from '../../ui/buttons/Button';
import DropDownToggler from '../../ui/icons/DropDownToggler';
import useWindowInnerWidth from '../../../hooks/useWindowInnerWidth';
import PeriodNavigator from '../../ui/navigation/PeriodNavigator';

interface Props {
    onNavigate: (direction: number) => void;
    onNavigateCurrentMonth: () => void;
    currentPeriod: string;
}

const CalendarNavigation: React.FC<Props> = (props) => {
    const { onNavigate, onNavigateCurrentMonth, currentPeriod } = props;

    // Show dropdown navigation for mobile screen (< 640px)
    const [showDropDown, setShowDropDown] = useState(true);
    useWindowInnerWidth({ breakPoint: 640, breakPointCallback: () => setShowDropDown(true) });

    const { calendarMode } = useAppSelector((state) => state.calendar);
    const isTableMode = calendarMode === CalendarMode.TABLE;

    const dispatch = useDispatch();

    const calendarModeHandler = useCallback(
        (newMode: CalendarMode) => {
            dispatch(calendarActions.setCalendarMode(newMode));
        },
        [dispatch],
    );

    const actionHandler = useCallback(() => {
        dispatch(calendarActions.toggleSidebar());
    }, [dispatch]);

    return (
        <nav className="flex justify-between gap-3 flex-col px-1 sm:px-0 sm:gap-0 sm:flex-row sm:items-center ml-[-5px]">
            <div className="flex justify-between sm:justify-start gap-[2px] lg:gap-4 items-center text-slate-800 text-xl">
                <PeriodNavigator onNavigate={onNavigate}>{currentPeriod}</PeriodNavigator>
                <a className="ml-auto" href={`#${new Date().toDateString()}`}>
                    <Button
                        onClick={onNavigateCurrentMonth}
                        className={`max-h-[2.5rem] !py-1 flex justify-center items-center`}
                    >
                        Today
                    </Button>
                </a>
                <DropDownToggler
                    onToggle={() => setShowDropDown((prev) => !prev)}
                    showDropDown={showDropDown}
                    className={`sm:hidden !text-3xl !ml-3`}
                />
            </div>
            {showDropDown && (
                <div className="pl-2 sm:pl-0 pr-7 sm:pr-0 py-3 sm:py-0 text-lg flex justify-between sm:justify-start bg-slate-100 sm:bg-transparent border-t-2 border-slate-300 sm:border-t-0">
                    {/* Not implemented yet */}
                    <button
                        className={`py-1 px-3 min-w-[5.55rem] border-2 border-slate-500 rounded-sm hover:bg-slate-500 hover:text-slate-50 ${
                            isTableMode ? 'bg-slate-500 text-slate-50' : ''
                        }`}
                        onClick={calendarModeHandler.bind(null, CalendarMode.TABLE)}
                    >
                        Table
                    </button>
                    <button
                        className={`py-1 px-3 min-w-[5.55rem] mr-auto border-2 border-slate-500 rounded-sm hover:bg-slate-500 hover:text-slate-50 ${
                            !isTableMode ? 'bg-slate-500 text-slate-50' : ''
                        }`}
                        onClick={calendarModeHandler.bind(null, CalendarMode.AGENDA)}
                    >
                        Agenda
                    </button>
                    <Button
                        className={`ml-3 max-h-[2.5rem] flex justify-center items-center !text-md !sm:text-lg !min-w-[.8rem] !bg-blue-400`}
                        theme={Theme.TERTIARY}
                        size={Size.SMALL}
                        onClick={actionHandler}
                    >
                        <FontAwesomeIcon
                            icon={faFilterList}
                            className={'inline-block max-w-[1.35rem] mr-2'}
                        />
                        <span>Action</span>
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default CalendarNavigation;
