import React from "react";
import { Calendar } from "../../../../models/calendar-models/Calendar";
import AgendaDayCell from "./AgendaDayCell";

interface Props {
    calendar: Calendar;
    onInvalidateItems(): void;
}

const CalendarAgenda: React.FC<Props> = ({ calendar, onInvalidateItems }) => {
    const calendarDays: Date[] = calendar.generateCalendarDays();

    return (
        <section className="flex flex-col gap-5 border-t-2 border-slate-400 py-4 md:px-3 text-lg">
            {calendarDays.map((day) => (
                <AgendaDayCell
                    key={day.getTime()}
                    date={day}
                    items={calendar.getItems(day)}
                    onInvalidateItems={onInvalidateItems}
                />
            ))}
        </section>
    );
};

export default CalendarAgenda;
