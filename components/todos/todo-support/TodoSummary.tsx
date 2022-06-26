import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faXmark } from '@fortawesome/pro-duotone-svg-icons';

import { Todo } from '../../../models/todo-models/Todo';
import { isSameDate, isSameWeek } from '../../../utilities/date-utils/date-check';
import classes from './TodoSummary.module.scss';
import { useAppSelector } from '../../../store/redux';
import { isTodoOverdue } from '../../../utilities/todos-utils/todo-util';

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
        () =>
            todos.reduce((accCount, todo) => (todo.isCompleted ? accCount + 1 : accCount), 0),
        [todos],
    );
    const importantTodosCount = useMemo(
        () =>
            todos.reduce((accCount, todo) => (todo.isImportant ? accCount + 1 : accCount), 0),
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
                return isSameWeek(today, todo.dateTime || null) ? accCount + 1 : accCount;
            }, 0),
        [todos, today],
    );

    const overdueCount = useMemo(
        () =>
            todos.reduce((accCount: number, todo) => {
                return isTodoOverdue(todo) ? accCount + 1 : accCount;
            }, 0),
        [todos],
    );

    const theme = useAppSelector((state) => state.todoList.currentActiveTheme);

    const countClass = `font-semibold ${theme ? 'text-cyan-50' : 'text-blue-500'}`;
    const overdueClass = 'font-semibold !text-rose-400';
    const textClass = `text-lg ${theme ? 'text-gray-200' : 'text-slate-700'}`;

    return (
        <>
            {!showSummary && (
                <div
                    className={`absolute -top-[2.8rem] -right-[1.1rem] md:right-0 md:top-2 md:translate-x-[3.5rem] z-5`}
                >
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        className={`${classes.show} ${theme ? classes['icon-light'] : ''}`}
                        onClick={showSummaryHandler.bind(null, true)}
                    />
                </div>
            )}
            {showSummary && (
                <div
                    className={`max-h-none sm:max-h-[11rem] transition-all !duration-150 relative xl:max-h-fit xl:absolute xl:translate-x-[110%] xl:right-0 px-3 py-3 flex flex-col justify-center gap-2 rounded-md bg-sky-50 border-2 ${
                        theme ? 'bg-gray-700/25 border-slate-50' : 'border-sky-300'
                    }`}
                >
                    <h3 className={`text-xl ${theme ? 'text-cyan-50' : 'text-blue-500'}`}>
                        Summary
                    </h3>
                    {/* Change to responsive grid layout that has two columns on the large screen and one column on the small screen */}
                    <ul className={`flex flex-col gap-2 ${textClass} ${classes.grid}`}>
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
                            <span className={countClass}>{todayTodosCount}</span> todos due
                            today
                        </li>
                        <li>
                            <span className={countClass}>{weekTodosCount}</span> todos due this
                            week
                        </li>
                        <li>
                            <span className={overdueClass}>{overdueCount} </span>
                            todos overdue
                        </li>
                    </ul>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={`${classes.exit} ${theme ? classes['icon-light'] : ''}`}
                        onClick={showSummaryHandler.bind(null, false)}
                    />
                </div>
            )}
        </>
    );
};

export default TodoSummary;
