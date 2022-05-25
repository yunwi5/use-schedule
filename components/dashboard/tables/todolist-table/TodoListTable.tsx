import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/pro-duotone-svg-icons';

import { getTodoListItems } from '../../../../lib/todos/todo-list-api';
import { Todo } from '../../../../models/todo-models/Todo';
import { TodoList } from '../../../../models/todo-models/TodoList';
import { ITodoListInfo } from '../../../../models/todo-models/TodoListInfo';
import { useAppSelector } from '../../../../store/redux';
import { getTodoListLink } from '../../../../utilities/link-utils';
import LoadingSpinner from '../../../ui/design-elements/LoadingSpinner';
import TableCard from '../../cards/TableCard';
import TodoListRow from './TodoListRow';

const generateTodoInformation = async (todoLists: TodoList[]) => {
    // retrieve link!
    const todoListItemsPromises = todoLists.map((list) => getTodoListItems(list.id));
    const todoListsWithItems = await Promise.all(todoListItemsPromises);

    const todoListInfoArray: ITodoListInfo[] = todoListsWithItems.map((list, idx) => {
        const { todos } = list;
        const { id, name } = todoLists[idx];
        const completedCount: number = todos.reduce(
            (accCount: number, curr: Todo) => (curr.isCompleted ? accCount + 1 : accCount),
            0,
        );
        return {
            id,
            name,
            todoCount: todos.length,
            completedCount,
        };
    });
    return todoListInfoArray;
};

const thClass = 'font-semibold hover:bg-indigo-200 py-2';

const TodoListTable: React.FC = () => {
    const todoLists = useAppSelector((state) => state.todoList.lists);
    const [todoInfoArray, setTodoInfoArray] = useState<ITodoListInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        generateTodoInformation(todoLists).then((todoInfoArr) => {
            setTodoInfoArray(todoInfoArr);
            setIsLoading(false);
        });
    }, [todoLists]);

    const routingHandler = (listId: string) => {
        const listLink = getTodoListLink(listId);
        router.push(listLink);
    };

    return (
        <TableCard className={`w-full lg:w-[50%] overflow-hidden !border-0`}>
            <table className={`w-full flex flex-col`}>
                <thead>
                    <tr
                        className={`flex justify-between text-base lg:text-lg bg-indigo-100 text-slate-600/90`}
                    >
                        <th className={`basis-6/12 ${thClass}`}>
                            <FontAwesomeIcon
                                icon={faClipboardCheck}
                                className={`icon-medium text-xl mr-2 text-indigo-600`}
                            />
                            Todo Lists
                        </th>
                        <th className={`basis-3/12 ${thClass}`}>Todos</th>
                        <th className={`basis-3/12 ${thClass}`}>Completed</th>
                    </tr>
                </thead>
                <tbody className={`max-h-[20rem] overflow-x-auto overflow-y-scroll hide-scrollbar`}>
                    {todoInfoArray.map((todoList, idx) => (
                        <TodoListRow
                            key={todoList.id}
                            todoList={todoList}
                            onNavigate={() => routingHandler(todoList.id)}
                        />
                    ))}
                </tbody>
            </table>
            {isLoading && todoInfoArray.length === 0 && (
                <div className="flex-center">
                    <LoadingSpinner />
                </div>
            )}
        </TableCard>
    );
};

export default TodoListTable;
