import React, { useEffect, useState } from 'react';
import useAppLinks from '../../../../hooks/useAppLinks';
import { useAppSelector } from '../../../../store/redux';
import TableCard from '../../cards/TableCard';

interface AppLink {
    name: string;
    link: string;
}
const generateTodoInformation = async (todosLink: AppLink[]) => {
    return [];
};

interface ITodoInfo {
    id: string;
    name: string;
    todoCount: number;
    completedCount: number;
}

const TodoListTable: React.FC = () => {
    const { todoLinks } = useAppLinks();
    const todoLists = useAppSelector((state) => state.todoList.lists);
    const [todoInfoArray, setTodoInfoArray] = useState<ITodoInfo[]>([]);

    useEffect(() => {
        generateTodoInformation(todoLinks).then((todoInfoArr) => setTodoInfoArray(todoInfoArr));
    }, [todoLinks]);

    return (
        <TableCard className={`w-full lg:w-[50%] overflow-hidden !border-0`}>
            <table className={`w-full flex flex-col`}>
                <thead>
                    <th className={``}>Todo Lists</th>
                </thead>
                <tbody></tbody>
            </table>
        </TableCard>
    );
};

export default TodoListTable;
