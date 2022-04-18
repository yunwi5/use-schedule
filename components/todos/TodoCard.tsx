import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/pro-solid-svg-icons";
import { faStar as faStarLight } from "@fortawesome/pro-light-svg-icons";
import { faCalendarCheck, faHourglass } from "@fortawesome/pro-duotone-svg-icons";

import { Todo, TodoProps } from "../../models/todo-models/Todo";
import { isOverdue } from "../../utilities/time-utils/date-check";
import { getDurationFormat, getFullDateFormat } from "../../utilities/time-utils/date-format";
import CheckToggler from "../ui/icons/CheckToggler";
import TodoDetail from "./todo-detail/TodoDetail";
import { useAppSelector } from "../../store/redux";

interface Props {
    todo: Todo;
    listName: string;
    onMutateTodo: (id: string, todoProps: TodoProps) => void;
    onDeleteTodo: (id: string) => Promise<{
        isSuccess: boolean;
        message: string;
    }>;
}

const TodoCard: React.FC<Props> = (props) => {
    // call Invalidate if steps count have to be updated.
    const { todo, listName, onMutateTodo, onDeleteTodo } = props;
    const [showDetail, setShowDetail] = useState(false);
    const [isImportant, setIsImportant] = useState(todo.isImportant);
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

    const handleImportant = () => {
        setIsImportant((prevState) => {
            const newState = !prevState;
            onMutateTodo(todo.id, { isImportant: newState });
            return newState;
        });
    };

    const handleCompleted = () => {
        setIsCompleted((prevState) => {
            const newState = !prevState;
            onMutateTodo(todo.id, { isCompleted: newState });
            return newState;
        });
    };

    const showBottomInfo: boolean = !!(todo.dateTime || todo.duration);
    const showDuration: boolean = !!(todo.duration && todo.duration > 0);

    const todoOverdue = !todo.isCompleted && !!todo.dateTime && isOverdue(todo.dateTime);

    const theme = useAppSelector((state) => state.todoList.currentActiveTheme);

    return (
        <>
            {showDetail && (
                <TodoDetail
                    listName={listName}
                    onClose={() => setShowDetail(false)}
                    todo={todo}
                    onMutateTodo={onMutateTodo}
                    onDeleteTodo={onDeleteTodo}
                />
            )}
            <article
                className={`px-3 py-2 min-h-[71.2px] bg-white text-slate-700 flex justify-between items-center text-lg transition-all rounded-sm border-2 border-slate-200 shadow-md hover:shadow-lg hover:bg-slate-50 hover:-translate-y-2 ${
                    theme ? "opacity-75 hover:opacity-100" : ""
                }`}
            >
                <CheckToggler onToggle={handleCompleted} isCompleted={isCompleted} />
                <div
                    onClick={() => setShowDetail(true)}
                    className={`ml-5 md:ml-8 flex-1 flex flex-col justify-center gap-1 cursor-pointer `}
                >
                    <h3 className={`${isCompleted ? "line-through opacity-70" : ""}`}>
                        {todo.name}
                    </h3>
                    {showBottomInfo && (
                        <p className={`flex gap-3 text-sm ${todoOverdue ? "text-rose-400" : ""}`}>
                            {todo.dateTime && (
                                <span>
                                    <FontAwesomeIcon
                                        icon={faCalendarCheck}
                                        className="mr-[3px] max-w-[.9rem] inline-block"
                                    />
                                    &nbsp;
                                    {getFullDateFormat(todo.dateTime)}
                                </span>
                            )}
                            <span>
                                {showDuration && (
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faHourglass}
                                            className="mr-[3px] max-w-[.9rem] inline-block"
                                        />
                                        {getDurationFormat(todo.duration || 1)}
                                    </span>
                                )}
                            </span>
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-center text-[2rem] cursor-pointer">
                    <FontAwesomeIcon
                        onClick={handleImportant}
                        icon={isImportant ? faStarSolid : faStarLight}
                        className="max-w-[2rem] max-h-[2rem] text-yellow-400 text-[1.5rem]"
                    />
                </div>
            </article>
        </>
    );
};

export default TodoCard;
