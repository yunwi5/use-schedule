import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

import { PlannerTask, Task } from '../../models/task-models/Task';
import { applyTaskFilter } from '../../utilities/tasks-utils/filter-util';
import { useAppSelector } from '../../store/redux';
import TaskCardNew from './TaskCardNew';

interface Props {
    onMutate: () => void;
    onShrink: (shrink: boolean) => void;
    taskList: Task[];
}

const TaskList: React.FC<Props> = (props) => {
    const { onMutate, taskList, onShrink } = props;
    const { searchWord, filterTarget, mainFilter, subFilter } = useAppSelector(
        (state) => state.filter,
    );

    const isFolded = useSelector((state: RootStateOrAny) => state.fold.isFolded);

    const [filteredTaskList, setFilteredTaskList] = useState<Task[]>(taskList);

    useEffect(() => {
        const searchedList = taskList.filter((task) =>
            task.name.toLowerCase().includes(searchWord.toLowerCase()),
        );
        const newFiltered = applyTaskFilter(searchedList, filterTarget, mainFilter, subFilter);
        setFilteredTaskList(newFiltered);
    }, [searchWord, filterTarget, mainFilter, subFilter, taskList]);

    useEffect(() => {
        onShrink(isFolded);
    }, [onShrink, isFolded]);

    return (
        <ul className="flex flex-col gap-4 lg:pl-[5rem] xl:pl-[8rem] pr-2 lg:pr-6">
            {filteredTaskList.map((task) => (
                <TaskCardNew
                    key={task.id}
                    task={task as PlannerTask}
                    onInvalidate={onMutate}
                    className={'!bg-slate-50'}
                />
            ))}
        </ul>
    );
};

export default TaskList;
