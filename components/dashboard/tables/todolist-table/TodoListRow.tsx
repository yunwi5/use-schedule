import React from 'react';
import { ITodoListInfo } from '../../../../models/todo-models/TodoListInfo';
import { round } from '../../../../utilities/gen-utils/calc-util';

interface Props {
    todoList: ITodoListInfo;
    onNavigate(): void;
}

function getCompletedPercentage(completedCount: number, totalCount: number) {
    // if total count is 0, then substitue to 1 so that it gives 0 instead of NaN.
    return round((completedCount / (totalCount || 1)) * 100, 1);
}

const TodoListRow: React.FC<Props> = ({ todoList, onNavigate }) => {
    const completedPercentage = getCompletedPercentage(todoList.completedCount, todoList.todoCount);
    const allCompleted = completedPercentage === 100;
    return (
        <tr
            onClick={onNavigate}
            className={`py-1 flex text-base lg:text-lg bg-gray-50 transition-all hover:bg-slate-200 hover:scale-105 hover:shadow-md hover:-translate-y-1  cursor-pointer text-slate-600 ${
                allCompleted ? '!text-slate-600/80' : ''
            }`}
        >
            <td
                className={`basis-6/12 flex justify-center items-center whitespace-nowrap overflow-hidden ${
                    allCompleted ? 'line-through' : ''
                }`}
            >
                {todoList.name}
            </td>
            <td className={`basis-3/12 flex-center`}>
                <span className={`font-semibold text-slate-600/90`}>{todoList.todoCount}</span>
            </td>
            <td className={`basis-3/12 flex-center`}>
                <span className={`font-semibold text-slate-600/90`}>{todoList.completedCount}</span>
                &nbsp;(
                {completedPercentage}%)
            </td>
        </tr>
    );
};

export default TodoListRow;
