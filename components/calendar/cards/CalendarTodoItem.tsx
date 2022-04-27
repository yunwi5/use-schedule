import React, { useState } from "react";

import useTodoQuery from "../../../hooks/useTodoQuery";
import { Todo } from "../../../models/todo-models/Todo";
import { useAppSelector } from "../../../store/redux";
import { getShortNameWithRest } from "../../../utilities/gen-utils/string-util";
import TodoDetail from "../../todos/todo-detail/TodoDetail";
import CalendarItemCard from "./CalendarItemCard";

interface Props {
    todo: Todo;
    onInvalidate: () => void;
}

const CalendarTodoItem: React.FC<Props> = ({ todo, onInvalidate }) => {
    const [showDetail, setShowDetail] = useState(false);

    const lists = useAppSelector((state) => state.todoList.lists);
    const parentList = lists.find((list) => list.id === todo.listId);

    const { patchTodo, deleteTodo } = useTodoQuery(onInvalidate, parentList);

    return (
        <>
            {showDetail && (
                <TodoDetail
                    todo={todo}
                    listName={parentList ? parentList.name : ""}
                    onClose={setShowDetail.bind(null, false)}
                    onMutateTodo={patchTodo}
                    onDeleteTodo={deleteTodo}
                />
            )}
            <CalendarItemCard
                bgClass={`bg-blue-100`}
                textClass={`text-blue-700`}
                hoverBgClass={`hover:bg-blue-500`}
                hoverTextClass={`hover:text-blue-50`}
                isCompleted={todo.isCompleted}
                dueDate={todo.dateTime}
                dateTime={todo.dateTime || null}
                onClick={setShowDetail.bind(null, true)}
            >
                {getShortNameWithRest(todo.name, 10, 2)}
            </CalendarItemCard>
        </>
    );
};

export default CalendarTodoItem;
