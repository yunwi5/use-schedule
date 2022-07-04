import React, { useState } from 'react';

import { DateTodo } from '../../../models/todo-models/Todo';
import { getTodoImportance, getTodoStatus } from '../../../utilities/todos-utils/todo-util';

import {
    CalendarItemType,
    getItemIcon,
} from '../../../models/calendar-models/CalendarItemType';
import TodoDetail from '../todo-detail/TodoDetail';
import { useAppSelector } from '../../../store/redux';
import useTodoQuery from '../../../hooks/useTodoQuery';
import StatusTogglerButton from '../../ui/buttons/StatusTogglerButton';
import ItemCard from '../../ui/cards/ItemCard';

interface Props {
    todo: DateTodo;
    onInvalidate: () => void;
    expand?: boolean;
}

// New version of todo card that is responsive
// Used in TodaySchedule section to match the styles with Event and Task card.
const TodoCardXL: React.FC<Props> = ({ todo, onInvalidate, expand = true }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const lists = useAppSelector((state) => state.todoList.lists);
    const parentList = lists.find((list) => list.id === todo.listId);
    const { patchTodo, deleteTodo } = useTodoQuery(onInvalidate, parentList);

    const { name, duration, dateTime } = todo;
    const status = getTodoStatus(todo);

    const importance = getTodoImportance(todo);

    const completionHandler = () => {
        patchTodo(todo.id, { isCompleted: !todo.isCompleted });
    };

    const todoDetailProps = {
        todo,
        listName: parentList ? parentList.name : '',
        onClose: () => {
            setShowDetail(false);
            setShowEdit(false);
        },
        onMutateTodo: patchTodo,
        onDeleteTodo: deleteTodo,
    };

    const statusToggler = <StatusTogglerButton status={status} onToggle={completionHandler} />;

    return (
        <>
            <ItemCard
                dateTime={dateTime}
                name={name}
                importance={importance}
                status={status}
                duration={duration || 0}
                icon={getItemIcon(CalendarItemType.TODO, 'text-indigo-600/90')}
                statusToggler={statusToggler}
                expand={expand}
                parentList={parentList?.name}
                onShowDetail={() => setShowDetail(true)}
                onShowEdit={() => setShowEdit(true)}
            />
            {showDetail && <TodoDetail {...todoDetailProps} />}
            {showEdit && <TodoDetail {...todoDetailProps} initialEditing={true} />}
        </>
    );
};

export default TodoCardXL;
