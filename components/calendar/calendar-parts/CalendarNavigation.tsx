import { faAngleLeft, faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../../ui/Button";

interface Props {
    onNavigate: (direction: number) => void;
    onNavigateCurrentMonth: () => void;
    currentPeriod: string;
}

export enum CalendarMode {
    TABLE = "table",
    AGENDA = "agenda",
}

const CalendarNavigation: React.FC<Props> = (props) => {
    const { onNavigate, onNavigateCurrentMonth, currentPeriod } = props;
    const [activeMode, setActiveMode] = useState(CalendarMode.TABLE);

    const isTableMode = activeMode === CalendarMode.TABLE;

    const calendarModeHandler = (newMode: CalendarMode) => {
        setActiveMode(newMode);
    };

    return (
        <nav className="flex justify-between items-center ml-[-5px]">
            <div className="flex flex-row gap-4 items-center text-slate-800 text-xl">
                <div className="flex gap-1 items-center">
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        onClick={onNavigate.bind(null, -1)}
                        className="w-[2rem] h-[2rem] rounded-full text-3xl border-2 border-transparent hover:border-slate-500 hover:bg-slate-500 hover:text-slate-50  max-w-[2rem] cursor-pointer"
                    />
                    <span>{currentPeriod}</span>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        onClick={onNavigate.bind(null, 1)}
                        className="w-[2rem] h-[2rem] rounded-full text-3xl border-2 border-transparent hover:border-slate-500 hover:bg-slate-500 hover:text-slate-50  max-w-[2rem] cursor-pointer"
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
            <div className="text-lg">
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
            </div>
        </nav>
    );
};

export default CalendarNavigation;
