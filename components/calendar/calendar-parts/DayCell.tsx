import React, { useMemo } from "react";

import { CalendarItem } from "../../../models/calendar-models/CalendarItem";
import { compareByDateTime } from "../../../utilities/sort-utils/sort-util";
import { isInstanceOfTask, PlannerTask } from "../../../models/task-models/Task";
import { isInstanceOfTodo, Todo } from "../../../models/todo-models/Todo";
import CalendarTaskItem from "../cards/CalendarTaskItem";
import CalendarTodoItem from "../cards/CalendarTodoItem";
import { useAppSelector } from "../../../store/redux";
import {
    filterItemsByImportance,
    filterItemsByItemType,
    filterItemsByStatus,
} from "../../../utilities/filter-utils/calendar-item-filter";
import classes from "./CalendarTable.module.scss";
import { isInstanceOfEvent, Event } from "../../../models/Event";
import CalendarEventItem from "../cards/CalendarEventItem";

function isCurrentDate(date: Date) {
    const today = new Date();
    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    );
}

function isNonCurrentMonth(beginningPeriod: Date, date: Date) {
    return beginningPeriod.getMonth() !== date.getMonth();
}

interface Props {
    date: Date;
    items: CalendarItem[];
    onInvalidateItems(): void;
    beginningPeriod: Date;
}

const DayCell: React.FC<Props> = (props) => {
    const { date, items, beginningPeriod, onInvalidateItems } = props;

    const nonCurrentMonth = isNonCurrentMonth(beginningPeriod, date);

    const { statusFilter, importanceFilter, itemTypeFilter } = useAppSelector(
        (state) => state.calendar,
    );

    // For each cell, calendar items should be sorted by time in ascending order for user display.
    const sortedItems: CalendarItem[] = useMemo(
        () => items.sort((itemA, itemB) => compareByDateTime(itemA, itemB)),
        [items],
    );

    const filteredItems = useMemo(() => {
        const statusFiltered = filterItemsByStatus(sortedItems, statusFilter);
        const importanceFiltered = filterItemsByImportance(statusFiltered, importanceFilter);
        const typeFiltered = filterItemsByItemType(importanceFiltered, itemTypeFilter);
        return typeFiltered;
    }, [sortedItems, statusFilter, importanceFilter, itemTypeFilter]);

    // console.table(statusFilteredItems);

    return (
        <div
            className={`${classes.cell} ${classes["day-item"]} ${
                isCurrentDate(date) ? classes["current-day-item"] : ""
            } ${nonCurrentMonth ? classes["non-current-month-item"] : ""}`}
        >
            <span className={classes["day-number"]}>{date.getDate()}</span>

            {filteredItems.map((item) => {
                if (isInstanceOfTodo(item)) {
                    return (
                        <CalendarTodoItem
                            key={item.id}
                            todo={item as Todo}
                            onInvalidate={onInvalidateItems}
                        />
                    );
                } else if (isInstanceOfTask(item)) {
                    return (
                        <CalendarTaskItem
                            key={item.id}
                            beginningPeriod={beginningPeriod}
                            task={item as PlannerTask}
                            onInvalidate={onInvalidateItems}
                        />
                    );
                } else if (isInstanceOfEvent(item)) {
                    return (
                        <CalendarEventItem
                            key={item.id}
                            beginningPeriod={beginningPeriod}
                            event={item as Event}
                            onInvalidate={onInvalidateItems}
                        />
                    );
                }
            })}
        </div>
    );
};

export default DayCell;
