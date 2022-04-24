import React, { useCallback, useEffect, useMemo, useState } from "react";

import { isInstanceOfTask, PlannerTask, Task } from "../../models/task-models/Task";
import { isInstanceOfTodo, Todo } from "../../models/todo-models/Todo";
import { getCurrentMonthBeginning } from "../../utilities/time-utils/date-get";
import { processTodos } from "../../utilities/todos-utils/todo-util";
import { Calendar } from "../../models/calendar-models/Calendar";
import CalendarTaskItem from "./cards/CalendarTaskItem";
import CalendarTodoItem from "./cards/CalendarTodoItem";
import CalendarContainer from "./calendar-parts/CalendarContainer";
import useDateTime, { ResetPeriod } from "../../hooks/useDateTime";
import { CalendarItem } from "../../models/calendar-models/CalendarItem";
import CalendarControl from "./calendar-control/CalendarControl";

interface Props {
    todos: Todo[];
    tasks: Task[];
    onInvalidateTasks: () => void;
    onInvalidateTodos: () => void;
}

function processTasks(tasks: Task[]): PlannerTask[] {
    const plannerTaskList: PlannerTask[] = [];
    for (const task of tasks) {
        const convertedTask = new PlannerTask(task);
        plannerTaskList.push(convertedTask);
    }
    return plannerTaskList;
}

function populateCalendar(beginningPeriod: Date, calendarItems: CalendarItem[]): Calendar {
    const newCalendar = new Calendar(beginningPeriod);
    for (const item of calendarItems) {
        newCalendar.addItem(item); // add item only when the item dateTime lies within the calendar range
    }
    return newCalendar;
}

const CalendarMain: React.FC<Props> = (props) => {
    const { todos: unprocessedTodos, tasks, onInvalidateTasks, onInvalidateTodos } = props;

    const currentMonthBeginning = getCurrentMonthBeginning();
    const [calendar, setCalendar] = useState<Calendar>(new Calendar(currentMonthBeginning));

    const todos = useMemo(() => processTodos(unprocessedTodos), [unprocessedTodos]);
    const plannerTasks = useMemo(() => processTasks(tasks), [tasks]);

    const {
        currentTimeStamp: beginningPeriod,
        setCurrentTimeStamp,
        addMonths: addLocalMonths,
    } = useDateTime(currentMonthBeginning, ResetPeriod.MONTH);

    useEffect(() => {
        const calendarItems: CalendarItem[] = [...plannerTasks, ...todos];
        const newCalendar = populateCalendar(beginningPeriod, calendarItems);
        setCalendar(newCalendar);
    }, [beginningPeriod, todos, plannerTasks]);

    if (calendar) {
        console.log(
            `calendarStart: ${calendar.calendarStart.toDateString()}, calendarEnd: ${calendar.calendarEnd.toDateString()}`,
        );
    }

    const monthNaviagtionHandler = useCallback(
        (direction: number) => {
            if (direction !== 1 && direction !== -1)
                throw new Error("Direction parameter is wrong!");
            addLocalMonths(direction);
        },
        [addLocalMonths],
    );

    // Needs testing to check if the calendar navigates to current month date correctly
    const navigateCurrentMonthHandler = () => {
        setCurrentTimeStamp(currentMonthBeginning);
    };

    const invalidateItems = () => {
        onInvalidateTasks();
        onInvalidateTodos();
    };

    return (
        <main className="py-6 px-4 text-slate-600">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-normal mb-4">My Calendar</h1>
            <div className="container">
                {/* Container for calendar layout and calendar sidebar */}
                <CalendarContainer
                    calendar={calendar}
                    onChangeMonth={monthNaviagtionHandler}
                    onNavigateCurrentMonth={navigateCurrentMonthHandler}
                    onInvalidateItems={invalidateItems}
                />
                {/* Unfinished component */}
                {/* <CalendarControl onInvalidate={invalidateItems} /> */}
            </div>
        </main>
    );
};

export default CalendarMain;
