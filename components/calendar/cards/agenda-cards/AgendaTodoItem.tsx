import React, { useState } from "react";

import useTodoQuery from "../../../../hooks/useTodoQuery";
import { Todo } from "../../../../models/todo-models/Todo";
import { Importance } from "../../../../models/task-models/Status";
import { CalendarItemType } from "../../../../models/calendar-models/CalendarItemType";
import { useAppSelector } from "../../../../store/redux";
import { getTodoStatus } from "../../../../utilities/todos-utils/todo-util";
import TodoDetail from "../../../todos/todo-detail/TodoDetail";
import AgendaItemCard from "./AgendaItemCard";

interface Props {
    item: Todo;
    onInvalidate: () => void;
}

const AgendaTodoItem: React.FC<Props> = ({ item, onInvalidate }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const lists = useAppSelector((state) => state.todoList.lists);
    const parentList = lists.find((list) => list.id === item.listId);

    const showDetailCurry = (show: boolean) => () => setShowDetail(show);
    const showEditCurry = (show: boolean) => () => setShowEdit(show);

    const { patchTodo, deleteTodo } = useTodoQuery(onInvalidate, parentList);

    return (
        <>
            <AgendaItemCard
                item={item}
                itemType={CalendarItemType.TODO}
                status={getTodoStatus(item)}
                importance={item.isImportant ? Importance.IMPORTANT : Importance.NICE_TO_HAVE}
                onShowDetail={showDetailCurry(true)}
                onShowEdit={showEditCurry(true)}
            />
            {showDetail && (
                <TodoDetail
                    todo={item}
                    listName={parentList ? parentList.name : ""}
                    onClose={showDetailCurry(false)}
                    onMutateTodo={patchTodo}
                    onDeleteTodo={deleteTodo}
                />
            )}
            {showEdit && (
                <TodoDetail
                    todo={item}
                    listName={parentList ? parentList.name : ""}
                    onClose={showEditCurry(false)}
                    onMutateTodo={patchTodo}
                    onDeleteTodo={deleteTodo}
                    initialEditing={true}
                />
            )}
        </>
    );
};

export default AgendaTodoItem;
