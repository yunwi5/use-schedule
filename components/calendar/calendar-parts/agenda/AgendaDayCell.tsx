import React, { useMemo, useState } from 'react';
import { useAppSelector } from '../../../../store/redux';

import { CalendarItem } from '../../../../models/calendar-models/CalendarItem';
import { IEvent, isInstanceOfEvent } from '../../../../models/Event';
import { isInstanceOfTask, PlannerTask } from '../../../../models/task-models/Task';
import { isInstanceOfTodo, Todo } from '../../../../models/todo-models/Todo';
import { getDayNameFromDate } from '../../../../utilities/date-utils/date-get';
import { getMonthName } from '../../../../utilities/date-utils/month-util';
import { filterCalendarItems } from '../../../../utilities/filter-utils/calendar-item-filter';
import { compareByDateTime } from '../../../../utilities/sort-utils/sort-util';
import ItemCreatePrompt from '../../calendar-control/item-create/ItemCreatePrompt';
import { AgendaEventItem, AgendaTaskItem, AgendaTodoItem } from '../../cards/agenda-cards';
import { isCurrentDate } from '../../../../utilities/date-utils/date-check';

import classes from './AgendaDayCell.module.scss';

interface Props {
    date: Date;
    items: CalendarItem[];
    onInvalidateItems(): void;
}

function getCalendarDateFormat(date: Date) {
    const dayName = getDayNameFromDate(date).substring(0, 3);
    const monthName = getMonthName(date, false); // month long name
    return `${dayName}, ${date.getDate()} ${monthName}`;
}

const AgendaDayCell: React.FC<Props> = ({ date, items, onInvalidateItems }) => {
    const [showItemCreatePrompt, setShowItemCreatePrompt] = useState(false);

    // dayName, date are included, but month and year do not need to be included here.
    const dateFormat = getCalendarDateFormat(date);

    const { statusFilter, importanceFilter, itemTypeFilter } = useAppSelector(
        (state) => state.calendar,
    );

    // For each cell, calendar items should be sorted by time in ascending order for user display.
    const sortedItems: CalendarItem[] = useMemo(
        () => items.sort((itemA, itemB) => compareByDateTime(itemA, itemB)),
        [items],
    );

    const filteredItems = useMemo(() => {
        return filterCalendarItems(
            sortedItems,
            statusFilter,
            importanceFilter,
            itemTypeFilter,
        );
    }, [sortedItems, statusFilter, importanceFilter, itemTypeFilter]);

    const showItemPromptHandler = (e: React.MouseEvent) => {
        // e.stopPropagation();
        if (
            !e.target ||
            !(e.target as any).className ||
            typeof (e.target as any).className !== 'string'
        )
            return;
        if (!(e.target as any).className.includes('item-create-indicator')) return;
        setShowItemCreatePrompt((prev) => !prev);
    };

    return (
        <article className={`flex flex-col`} id={date.toDateString()}>
            <div
                className={`flex h-9 border-b-2 pb-2 text-lg text-slate-500 border-slate-200 cursor-pointer ${classes['cell-header']}`}
            >
                <div className={`w-1 h-[100%] mr-1 bg-blue-300 ${classes.prefix}`} />
                <time
                    className="item-create-indicator relative transition-all"
                    onClick={showItemPromptHandler}
                >
                    <span className="item-create-indicator hover:font-semibold cursor-pointer">
                        {dateFormat}{' '}
                        {isCurrentDate(date) && (
                            <span className={`text-blue-500/75`}>(Today)</span>
                        )}
                    </span>
                    {showItemCreatePrompt && (
                        <ItemCreatePrompt
                            onClose={setShowItemCreatePrompt.bind(null, false)}
                            beginningPeriod={date}
                            onAdd={onInvalidateItems}
                            className={'top-1 translate-x-3'}
                        />
                    )}
                </time>
            </div>
            <ul className="mt-4 flex flex-col gap-5">
                {filteredItems.map((item) => {
                    if (isInstanceOfEvent(item)) {
                        return (
                            <AgendaEventItem
                                key={item.id}
                                item={item as IEvent}
                                onInvalidate={onInvalidateItems}
                            />
                        );
                    } else if (isInstanceOfTask(item)) {
                        return (
                            <AgendaTaskItem
                                key={item.id}
                                item={item as PlannerTask}
                                onInvalidate={onInvalidateItems}
                            />
                        );
                    } else if (isInstanceOfTodo(item)) {
                        return (
                            <AgendaTodoItem
                                key={item.id}
                                item={item as Todo}
                                onInvalidate={onInvalidateItems}
                            />
                        );
                    }
                })}
            </ul>
        </article>
    );
};

export default AgendaDayCell;
