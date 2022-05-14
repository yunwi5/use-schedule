import React, { useMemo, useState } from 'react';

import { CalendarItem } from '../../../../models/calendar-models/CalendarItem';
import { compareByDateTime } from '../../../../utilities/sort-utils/sort-util';
import { isInstanceOfTask, PlannerTask } from '../../../../models/task-models/Task';
import { isInstanceOfTodo, Todo } from '../../../../models/todo-models/Todo';
import { useAppSelector } from '../../../../store/redux';
import { filterCalendarItems } from '../../../../utilities/filter-utils/calendar-item-filter';
import { isInstanceOfEvent, IEvent } from '../../../../models/Event';

import { CalendarTaskItem, CalendarTodoItem, CalendarEventItem } from '../../cards/table-cards/';
import ItemCreatePrompt from '../../calendar-control/item-create/ItemCreatePrompt';
import classes from './CalendarTable.module.scss';
import { isCurrentDate } from '../../../../utilities/date-utils/date-check';

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
    const [showItemCreatePrompt, setShowItemCreatePrompt] = useState(false);

    const { statusFilter, importanceFilter, itemTypeFilter } = useAppSelector(
        (state) => state.calendar,
    );

    // For each cell, calendar items should be sorted by time in ascending order for user display.
    const sortedItems: CalendarItem[] = useMemo(
        () => items.sort((itemA, itemB) => compareByDateTime(itemA, itemB)),
        [items],
    );

    const filteredItems = useMemo(() => {
        return filterCalendarItems(sortedItems, statusFilter, importanceFilter, itemTypeFilter);
    }, [sortedItems, statusFilter, importanceFilter, itemTypeFilter]);

    const showItemPromptHandler = (e: React.MouseEvent) => {
        // e.stopPropagation();
        if (
            !e.target ||
            !(e.target as any).className ||
            typeof (e.target as any).className !== 'string'
        )
            return;
        if (
            !(e.target as any).className.includes('day-cell') &&
            !(e.target as any).className.includes('day-number')
        )
            return;
        // Prevent propagation
        setShowItemCreatePrompt((prev) => !prev);
    };

    const nonCurrentMonth = isNonCurrentMonth(beginningPeriod, date);

    const showPromptOnLeft = date.getDay() >= 5 || date.getDay() === 0;

    return (
        <div className={`${classes['day-item-wrapper']} ${classes.cell}`}>
            <div
                className={`day-cell ${classes['day-item']} ${
                    isCurrentDate(date) ? classes['current-day-item'] : ''
                } ${nonCurrentMonth ? classes['non-current-month-item'] : ''}`}
                onClick={showItemPromptHandler}
            >
                <span className={`day-number ${classes['day-number']}`}>{date.getDate()}</span>

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
                                task={item as PlannerTask}
                                onInvalidate={onInvalidateItems}
                            />
                        );
                    } else if (isInstanceOfEvent(item)) {
                        return (
                            <CalendarEventItem
                                key={item.id}
                                event={item as IEvent}
                                onInvalidate={onInvalidateItems}
                            />
                        );
                    }
                })}
            </div>
            {showItemCreatePrompt && (
                <ItemCreatePrompt
                    onClose={setShowItemCreatePrompt.bind(null, false)}
                    beginningPeriod={date}
                    showLeft={showPromptOnLeft}
                    onAdd={onInvalidateItems}
                />
            )}
        </div>
    );
};

export default DayCell;
