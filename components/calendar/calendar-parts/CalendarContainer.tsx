import React from "react";
import { Calendar } from "../../../models/calendar-models/Calendar";
import { CalendarMode } from "../../../models/calendar-models/CalendarMode";
import { useAppSelector } from "../../../store/redux";
import CalendarAgenda from "./agenda/CalendarAgenda";
import CalendarNavigation from "./CalendarNavigation";
import CalendarTable from "./table/CalendarTable";

interface Props {
    calendar: Calendar;
    onChangeMonth: (direction: number) => void;
    onNavigateCurrentMonth: () => void;
    onInvalidateItems: () => void;
}

const CalendarContainer: React.FC<Props> = (props) => {
    const { calendar, onChangeMonth, onNavigateCurrentMonth, onInvalidateItems } = props;

    const calendarMode = useAppSelector((state) => state.calendar.calendarMode);
    const isTableMode = calendarMode === CalendarMode.TABLE;

    return (
        <section className="flex-1 pr-4 flex flex-col gap-3">
            <CalendarNavigation
                onNavigate={onChangeMonth}
                onNavigateCurrentMonth={onNavigateCurrentMonth}
                currentPeriod={calendar.getMonthYear(true)}
            />
            {/* Display table or agenda */}
            {isTableMode ? (
                <CalendarTable calendar={calendar} onInvalidateItems={onInvalidateItems} />
            ) : (
                <CalendarAgenda calendar={calendar} onInvalidateItems={onInvalidateItems} />
            )}
        </section>
    );
};

export default CalendarContainer;
