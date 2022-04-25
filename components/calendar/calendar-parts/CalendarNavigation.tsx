import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterList } from "@fortawesome/pro-duotone-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-regular-svg-icons";

import { CalendarMode } from "../../../models/calendar-models/CalendarMode";
import { Size, Theme } from "../../../models/design-models";
import Button from "../../ui/Button";
import { useAppSelector } from "../../../store/redux";
import { useDispatch } from "react-redux";
import { calendarActions } from "../../../store/redux/calendar-slice";

interface Props {
    onNavigate: (direction: number) => void;
    onNavigateCurrentMonth: () => void;
    currentPeriod: string;
}

const CalendarNavigation: React.FC<Props> = (props) => {
    const { onNavigate, onNavigateCurrentMonth, currentPeriod } = props;

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
        <nav className="flex justify-between items-center ml-[-5px]">
            <div className="flex flex-row gap-4 items-center text-slate-800 text-xl">
                <div className="flex gap-1 items-center">
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        onClick={onNavigate.bind(null, -1)}
                        className="w-[2rem] h-[2rem] inline-block rounded-full text-3xl border-2 border-transparent hover:border-slate-500 hover:bg-slate-500 hover:text-slate-50  max-w-[2rem] cursor-pointer"
                    />
                    <span>{currentPeriod}</span>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        onClick={onNavigate.bind(null, 1)}
                        className="w-[2rem] h-[2rem] inline-block rounded-full text-3xl border-2 border-transparent hover:border-slate-500 hover:bg-slate-500 hover:text-slate-50  max-w-[2rem] cursor-pointer"
                    />
                </div>
                <div>
                    <Button
                        onClick={onNavigateCurrentMonth}
                        className={`max-h-[2.5rem] !py-1 flex justify-center items-center`}
                    >
                        Today
                    </Button>
                </div>
            </div>
            <div className="text-lg flex">
                {/* Not implemented yet */}
                <button
                    className={`py-1 px-3 min-w-[2rem] border-2 border-slate-500 rounded-sm hover:bg-slate-500 hover:text-slate-50 ${
                        isTableMode ? "bg-slate-500 text-slate-50" : ""
                    }`}
                    onClick={calendarModeHandler.bind(null, CalendarMode.TABLE)}
                >
                    Month
                </button>
                <button
                    className={`py-1 px-3 min-w-[2rem] border-2 border-slate-500 rounded-sm hover:bg-slate-500 hover:text-slate-50 ${
                        !isTableMode ? "bg-slate-500 text-slate-50" : ""
                    }`}
                    onClick={calendarModeHandler.bind(null, CalendarMode.AGENDA)}
                >
                    Agenda
                </button>
                <Button
                    className={`ml-3 max-h-[2.5rem] flex justify-center items-center !min-w-[.8rem] !bg-blue-400`}
                    theme={Theme.TERTIARY}
                    size={Size.SMALL}
                    onClick={actionHandler}
                >
                    <FontAwesomeIcon
                        icon={faFilterList}
                        className={"inline-block max-w-[1.8rem] mr-2"}
                    />
                    <span className={`hidden md:inline`}>Action</span>
                </Button>
            </div>
        </nav>
    );
};

export default CalendarNavigation;
