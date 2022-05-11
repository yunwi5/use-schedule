import React, { useCallback, useEffect, useMemo, useState } from 'react';

import useDateTime, { ResetPeriod } from '../../hooks/useDateTime';
import { PlannerTask, Task } from '../../models/task-models/Task';
import { Todo } from '../../models/todo-models/Todo';
import { Calendar } from '../../models/calendar-models/Calendar';
import { CalendarItem } from '../../models/calendar-models/CalendarItem';
import { getCurrentMonthBeginning } from '../../utilities/date-utils/date-get';
import { processTodos } from '../../utilities/todos-utils/todo-util';
import { useAppSelector } from '../../store/redux';
import { adjustOverdueTask, processTasks } from '../../utilities/tasks-utils/task-util';
import { Event } from '../../models/Event';
import { adjustIfOverdueEvent } from '../../utilities/event-utils/event-util';
import CalendarContainer from './calendar-parts/CalendarContainer';
import CalendarControl from './calendar-control/CalendarControl';
import PageHeading from '../ui/typography/PageHeading';

function processEvents(events: Event[]) {
    const eventsList: Event[] = events.map((ev) => {
        ev.dateTime = new Date(ev.dateTime);
        adjustIfOverdueEvent(ev);
        return ev;
    });
    return eventsList;
}

function populateCalendar(beginningPeriod: Date, calendarItems: CalendarItem[]): Calendar {
    const newCalendar = new Calendar(beginningPeriod);
    for (const item of calendarItems) {
        // add item only when the item dateTime lies within the calendar range
        newCalendar.addItem(item);
    }
    return newCalendar;
}

interface Props {
    todos: Todo[];
    tasks: Task[];
    events: Event[];
    onInvalidateAll(): void;
}

const CalendarMain: React.FC<Props> = (props) => {
    const { todos: unprocessedTodos, tasks, events: unprocessedEvents, onInvalidateAll } = props;

    const currentMonthBeginning = getCurrentMonthBeginning();
    const [calendar, setCalendar] = useState<Calendar>(new Calendar(currentMonthBeginning));

    const todos = useMemo(() => processTodos(unprocessedTodos), [unprocessedTodos]);
    const events = useMemo(() => processEvents(unprocessedEvents), [unprocessedEvents]);
    const plannerTasks = useMemo(() => processTasks(tasks), [tasks]);

    const { showSidebar } = useAppSelector((state) => state.calendar);

    const {
        currentTimeStamp: beginningPeriod,
        setCurrentTimeStamp,
        addMonths: addLocalMonths,
    } = useDateTime(currentMonthBeginning, ResetPeriod.MONTH);

    const monthNaviagtionHandler = useCallback(
        (direction: number) => {
            if (direction !== 1 && direction !== -1)
                throw new Error('Direction parameter is wrong!');
            addLocalMonths(direction);
        },
        [addLocalMonths],
    );

    // Needs testing to check if the calendar navigates to current month date correctly
    const navigateCurrentMonthHandler = () => setCurrentTimeStamp(currentMonthBeginning);

    useEffect(() => {
        const calendarItems: CalendarItem[] = [...plannerTasks, ...todos, ...events];
        const newCalendar: Calendar = populateCalendar(beginningPeriod, calendarItems);
        setCalendar(newCalendar);
    }, [beginningPeriod, todos, plannerTasks, events]);

    return (
        <main className="py-6 pl-1 md:pl-4 text-slate-600">
            <PageHeading title={'Calendar'} />
            <div className="flex w-[100%]">
                {/* Container for calendar layout and calendar sidebar */}
                <CalendarContainer
                    calendar={calendar}
                    onChangeMonth={monthNaviagtionHandler}
                    onNavigateCurrentMonth={navigateCurrentMonthHandler}
                    onInvalidateItems={onInvalidateAll}
                />
                {showSidebar && (
                    <CalendarControl
                        onInvalidate={onInvalidateAll}
                        beginningPeriod={beginningPeriod}
                    />
                )}
            </div>
            {/* <CalendarFooter /> */}
        </main>
    );
};

export default CalendarMain;
