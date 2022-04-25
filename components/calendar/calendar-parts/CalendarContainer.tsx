import React from "react";
import { Calendar } from "../../../models/calendar-models/Calendar";
import CalendarNavigation from "./CalendarNavigation";
import CalendarTable from "./CalendarTable";

interface Props {
    calendar: Calendar;
    onChangeMonth: (direction: number) => void;
    onNavigateCurrentMonth: () => void;
    onInvalidateItems: () => void;
}

const CalendarContainer: React.FC<Props> = (props) => {
    const { calendar, onChangeMonth, onNavigateCurrentMonth, onInvalidateItems } = props;

    return (
        <section className="flex-1 flex flex-col gap-3">
            <CalendarNavigation
                onNavigate={onChangeMonth}
                onNavigateCurrentMonth={onNavigateCurrentMonth}
                currentPeriod={calendar.getMonthYear(true)}
            />
            <CalendarTable calendar={calendar} onInvalidateItems={onInvalidateItems} />
        </section>
    );
};

export default CalendarContainer;
