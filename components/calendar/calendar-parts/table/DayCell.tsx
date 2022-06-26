import React, { useMemo, useState } from 'react';

import { CalendarItem } from '../../../../models/calendar-models/CalendarItem';
import { compareByDateTime } from '../../../../utilities/sort-utils/sort-util';
import { isInstanceOfTask, PlannerTask } from '../../../../models/task-models/Task';
import { isInstanceOfTodo, Todo } from '../../../../models/todo-models/Todo';
import { useAppSelector } from '../../../../store/redux';
import { filterCalendarItems } from '../../../../utilities/filter-utils/calendar-item-filter';
import { isInstanceOfEvent, IEvent } from '../../../../models/Event';

import {
    CalendarTaskItem,
    CalendarTodoItem,
    CalendarEventItem,
} from '../../cards/table-cards/';
import classes from './CalendarTable.module.scss';
import { isCurrentDate, isCurrentMonth } from '../../../../utilities/date-utils/date-check';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import ItemCreateBar from '../../calendar-control/item-create/ItemCreateBar';

interface Position {
    x: number;
    y: number;
    maxY: number;
}

interface Props {
    date: Date;
    items: CalendarItem[];
    onInvalidateItems(): void;
    beginningPeriod: Date;
    layoutId: string;
    selectedId: string | null;
    position: Position;
    onSelect: React.Dispatch<React.SetStateAction<string | null>>;
}

const DayCell: React.FC<Props> = (props) => {
    const {
        date,
        items,
        position,
        beginningPeriod,
        onInvalidateItems,
        layoutId,
        onSelect,
        selectedId,
    } = props;
    const { statusFilter, importanceFilter, itemTypeFilter } = useAppSelector(
        (state) => state.calendar,
    );

    const selectHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isSelected) return;
        if ((e.target as any).dataset.name === 'select') onSelect(layoutId);
    };

    const filteredItems = useMemo(() => {
        const sortedItems = items.sort((itemA, itemB) => compareByDateTime(itemA, itemB));
        return filterCalendarItems(
            sortedItems,
            statusFilter,
            importanceFilter,
            itemTypeFilter,
        );
    }, [items, statusFilter, importanceFilter, itemTypeFilter]);

    const nonCurrentMonth = !isCurrentMonth(beginningPeriod, date);

    const isSelected = selectedId === layoutId;
    const positionClass = getPositionClass(position);

    return (
        <div
            className={`${classes['day-item-wrapper']} ${classes.cell} ${
                isSelected && `${classes['selected-cell']} ${positionClass}`
            }`}
            onClick={selectHandler}
        >
            <div
                data-name="select"
                className={`${classes['day-item']} ${
                    isCurrentDate(date) ? classes['current-day-item'] : ''
                } ${nonCurrentMonth ? classes['non-current-month-item'] : ''}`}
            >
                <span data-name="select" className={`${classes['day-number']}`}>
                    {date.getDate()}
                </span>

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
            {isSelected && (
                <>
                    <div
                        onClick={onSelect.bind(null, null)}
                        className="absolute top-1 right-1 flex-center w-6 h-6 rounded-full z-100 transition-all bg-blue-200/80 text-blue-700 hover:bg-blue-600/90 hover:text-blue-50"
                    >
                        <FontAwesomeIcon icon={faXmark} className="icon-medium " />
                    </div>
                    <ItemCreateBar onAdd={onInvalidateItems} beginningPeriod={date} />
                </>
            )}
        </div>
    );
};

function getPositionClass(position: Position) {
    const leftEnd = position.x === 0;
    const rightEnd = position.x === 6;
    const topEnd = position.y === 0;
    const bottomEnd = position.y === position.maxY;

    if (leftEnd && topEnd) return classes['selected-cell-top-leftend'];
    if (rightEnd && topEnd) return classes['selected-cell-top-rightend'];
    if (leftEnd && bottomEnd) return classes['selected-cell-bottom-leftend'];
    if (rightEnd && bottomEnd) return classes['selected-cell-bottom-rightend'];

    if (topEnd) return classes['selected-cell-topend'];
    if (bottomEnd) return classes['selected-cell-bottomend'];

    if (rightEnd) return classes['selected-cell-rightend'];
    if (leftEnd) return classes['selected-cell-leftend'];
    return '';
}

export default DayCell;
