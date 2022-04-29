import { faAngleDown } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import React from "react";
import { Calendar } from "../../../../models/calendar-models/Calendar";
import { useAppDispatch, useAppSelector } from "../../../../store/redux";
import { calendarActions } from "../../../../store/redux/calendar-slice";
import AgendaDayCell from "./AgendaDayCell";

interface Props {
    calendar: Calendar;
    onInvalidateItems(): void;
}

const CalendarAgenda: React.FC<Props> = ({ calendar, onInvalidateItems }) => {
    const calendarDays: Date[] = calendar.generateCalendarDays();

    const showAgendaDropdown: boolean = useAppSelector(
        (state) => state.calendar.showAgendaDropdown,
    );
    const dispatch = useAppDispatch();

    const toggleCollapsed = () => dispatch(calendarActions.toggleAgendaCollapsed());

    return (
        <section className="flex flex-col gap-5 border-t-2 border-slate-400 py-4 md:px-3 text-lg">
            <div className="flex justify-end -mb-6">
                <Button onClick={toggleCollapsed}>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className={`inline-block mr-1 max-w-[1.5rem] text-xl hover:scale-125 ml-auto cursor-pointer transition-all ${
                            showAgendaDropdown ? "rotate-180" : ""
                        }`}
                    />{" "}
                    {showAgendaDropdown ? "Collapse All" : "Expand All"}
                </Button>
            </div>
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
