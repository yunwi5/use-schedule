import React from "react";

import { PlannerTask, Task } from "../../models/task-models/Task";
import { Todo } from "../../models/todo-models/Todo";
import { getCurrentMonthBeginning } from "../../utilities/time-utils/date-get";
import { processTodos } from "../../utilities/todos-utils/todo-util";
import CalendarTaskItem from "./cards/CalendarTaskItem";
import CalendarTodoItem from "./cards/CalendarTodoItem";

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

const CalendarContainer: React.FC<Props> = (props) => {
    const { todos: unprocessedTodos, tasks, onInvalidateTasks, onInvalidateTodos } = props;

    const todos = processTodos(unprocessedTodos);
    const plannerTasks = processTasks(tasks);
    const beginningPeriod = getCurrentMonthBeginning();

    return (
        <main className='py-16 px-20'>
            Tasks
            <ul className='flex flex-col gap-1 max-w-[7.8rem]'>
                {plannerTasks.map((task) => (
                    <CalendarTaskItem
                        key={task.id}
                        task={task}
                        beginningPeriod={beginningPeriod}
                        onInvalidate={onInvalidateTasks}
                    />
                ))}
            </ul>
            Todos
            <ul className='flex flex-col gap-1 max-w-[7.8rem]'>
                {todos.map((todo) => (
                    <CalendarTodoItem key={todo.id} todo={todo} onInvalidate={onInvalidateTodos} />
                ))}
            </ul>
        </main>
    );
};

export default CalendarContainer;
