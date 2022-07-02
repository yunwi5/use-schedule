import React, { useCallback, useEffect, useState } from 'react';

import useDateTime, { ResetPeriod } from '../../hooks/useDateTime';
import { PlannerTask } from '../../models/task-models/Task';
import { Todo } from '../../models/todo-models/Todo';
import { Calendar } from '../../models/calendar-models/Calendar';
import { CalendarItem } from '../../models/calendar-models/CalendarItem';
import { getCurrentMonthBeginning } from '../../utilities/date-utils/date-get';
import { IEvent } from '../../models/Event';
import CalendarContainer from './calendar-parts/CalendarContainer';
import CalendarControl from './calendar-control/CalendarControl';
import PageHeading from '../ui/typography/PageHeading';
import BackgroundImage from '../ui/design-elements/BackgroundImage';

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
    tasks: PlannerTask[];
    events: IEvent[];
    onInvalidateAll(): void;
}

const CalendarMain: React.FC<Props> = (props) => {
    const { todos, tasks, events, onInvalidateAll } = props;

    const currentMonthBeginning = getCurrentMonthBeginning();
    const [calendar, setCalendar] = useState<Calendar>(new Calendar(currentMonthBeginning));

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
        const calendarItems: CalendarItem[] = [...tasks, ...todos, ...events];
        const newCalendar: Calendar = populateCalendar(beginningPeriod, calendarItems);
        setCalendar(newCalendar);
    }, [beginningPeriod, todos, tasks, events]);

    return (
        <div>
            <BackgroundImage
                src="/bg-images/bg-desktop.jpg"
                alt="Calendar background"
                opacity={0.4}
            />
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
                    <CalendarControl
                        onInvalidate={onInvalidateAll}
                        beginningPeriod={beginningPeriod}
                    />
                </div>
            </main>
        </div>
    );
};

export default CalendarMain;
