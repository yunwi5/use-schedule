import React, { useMemo } from "react";

import { Calendar } from "../../../models/calendar-models/Calendar";
import { WeekDay, WeekDayListFromMonday } from "../../../models/date-models/WeekDay";
import classes from "./CalendarTable.module.scss";
import DayCell from "./DayCell";

interface Props {
    calendar: Calendar;
    onInvalidateItems(): void;
}

function getShortWeekDayList() {
    const weekdayList = WeekDayListFromMonday.filter((day) => day !== WeekDay.ANY);
    const shortWeekDays = weekdayList.map((day) => day.slice(0, 3).toUpperCase());
    return shortWeekDays;
}

const CalendarTable: React.FC<Props> = ({ calendar, onInvalidateItems }) => {
    const weekDayList = useMemo(() => getShortWeekDayList(), []);
    // console.log(weekDayList);

    const calendarDates = calendar.generateCalendarDays();
    // const calendarDateItems = calendarDates.map((date) => ({ date: date, day: date.getDate() }));
    // console.log("current calendar dates:");
    // console.table(calendarDateItems);

    return (
        <section className={classes.grid}>
            {weekDayList.map((day) => (
                <div key={day} className={`${classes.cell} ${classes["day-label"]}`}>
                    {day}
                </div>
            ))}
            {calendarDates.map((date, idx) => (
                <DayCell
                    key={idx}
                    date={date}
                    items={calendar.getItems(date)}
                    onInvalidateItems={onInvalidateItems}
                    beginningPeriod={calendar.beginningPeriod}
                />
            ))}
        </section>
    );
};

export default CalendarTable;
