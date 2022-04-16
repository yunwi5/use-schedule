import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faXmark } from "@fortawesome/pro-duotone-svg-icons";

import { Todo } from "../../../models/todo-models/Todo";
import { isSameDate, isSameWeek } from "../../../utilities/time-utils/date-classify";
import classes from "./TodoSummary.module.scss";

interface Props {
    todos: Todo[];
}

const TodoSummary: React.FC<Props> = ({ todos }) => {
    const [showSummary, setShowSummary] = useState(true);

    const showSummaryHandler = (show: boolean) => {
        setShowSummary(show);
    };

    const totalTodos = useMemo(() => todos.length, [todos]);
    const completedTodosCount = useMemo(
        () => todos.reduce((accCount, todo) => (todo.isCompleted ? accCount + 1 : accCount), 0),
        [todos],
    );
    const importantTodosCount = useMemo(
        () => todos.reduce((accCount, todo) => (todo.isImportant ? accCount + 1 : accCount), 0),
        [todos],
    );

    const today = useMemo(() => new Date(), []);
    const todayTodosCount = useMemo(
        () =>
            todos.reduce(
                (accCount: number, todo) =>
                    isSameDate(today, todo.dateTime || null) ? accCount + 1 : accCount,
                0,
            ),
        [todos, today],
    );
    const weekTodosCount = useMemo(
        () =>
            todos.reduce((accCount: number, todo) => {
                const res = isSameWeek(today, todo.dateTime || null) ? accCount + 1 : accCount;
                console.log(`${today.toDateString()}, ${todo.dateTime?.toDateString()}, ${res}`);
                return res;
            }, 0),
        [todos, today],
    );

    const countClass = "font-semibold text-blue-500";

    return (
        <>
            {!showSummary && (
                <div className={`absolute right-0 top-2 translate-x-[3.5rem] z-5`}>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        className={classes.show}
                        onClick={showSummaryHandler.bind(null, true)}
                    />
                </div>
            )}
            {showSummary && (
                <div className='relative xl:absolute xl:translate-x-[110%] xl:right-0 px-2 py-3 flex flex-col gap-2 rounded-md bg-sky-50 border-2 border-sky-300'>
                    <h3 className='text-xl text-blue-500'>Summary</h3>
                    <ul className='flex flex-col gap-2 text-lg text-slate-700'>
                        <li>
                            <span className={countClass}>{totalTodos}</span> todos in total
                        </li>
                        <li>
                            <span className={countClass}>{completedTodosCount}</span> todos
                            completed
                        </li>
                        <li>
                            <span className={countClass}>{importantTodosCount}</span> todos
                            important
                        </li>
                        <li>
                            <span className={countClass}>{todayTodosCount}</span> todos due today
                        </li>
                        <li>
                            <span className={countClass}>{weekTodosCount}</span> todos due this week
                        </li>
                    </ul>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={classes.exit}
                        onClick={showSummaryHandler.bind(null, false)}
                    />
                </div>
            )}
        </>
    );
};

export default TodoSummary;
