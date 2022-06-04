import React, { useEffect, useState } from 'react';
import { AbstractTask } from '../../../models/task-models/AbstractTask';
import { useWTableContext } from '../../../store/context/weekday-table-context';
import { useAppSelector } from '../../../store/redux';
import { addHours } from '../../../utilities/date-utils/date-control';
import { getInitialTimeLineFreqMap } from '../../../utilities/gen-utils/time-util';
import { applyTaskFilter } from '../../../utilities/tasks-utils/filter-util';
import TaskCardSmall from '../../tasks/TaskCardSmall';
import DynamicStatusPalleteProvider from '../../ui/colors/DynamicStatusPalleteProvider';
import TaskAdd from '../planner-crud/TaskAdd';

interface Props {
    date: Date;
    tasks: AbstractTask[];
    onMutate: () => void;
}

const WeekdayLine: React.FC<Props> = ({ date, tasks, onMutate }) => {
    const { searchWord, filterTarget, mainFilter, subFilter } = useAppSelector(
        (state) => state.filter,
    );
    const { getTopOffset, getTaskHeight, getTotalTableHeight } = useWTableContext();
    const [filteredTaskList, setFilteredTaskList] = useState<AbstractTask[]>(tasks);
    const [isAdding, setIsAdding] = useState(false);

    const taskAddHandler = (e: any) => {
        const eventId = e.target?.dataset?.id || '';
        if (eventId === 'weekday-line') {
            setIsAdding((ps) => !ps);
        }
    };

    const taskMutateHandler = () => {
        setIsAdding(false);
        onMutate();
    };

    useEffect(() => {
        const searchedList = tasks.filter((task) =>
            task.name.toLowerCase().includes(searchWord.toLowerCase()),
        );
        const newFiltered = applyTaskFilter(
            searchedList,
            filterTarget,
            mainFilter,
            subFilter,
        ) as AbstractTask[];
        setFilteredTaskList(newFiltered);
    }, [searchWord, filterTarget, mainFilter, subFilter, tasks]);

    const timeLineFreqMap = getInitialTimeLineFreqMap();

    return (
        <>
            <div
                className={`wd-line z-10 w-[calc(100%/7)] cursor-pointer hover:bg-slate-200/50`}
                style={{ height: getTotalTableHeight() }}
                data-id="weekday-line"
                onClick={taskAddHandler}
            >
                {/* <WeekdayLabel date={date} /> */}
                <ul className={`relative px-1 pt-1`}>
                    {filteredTaskList.map((task, idx) => {
                        const hours = task.dateTime.getHours();

                        const topOffset = getTopOffset(
                            task.dateTime.getHours(),
                            task.dateTime.getMinutes(),
                        );
                        const adjustedHeight = getTaskHeight(task);

                        let heightOffset = timeLineFreqMap[hours] * 2 + 'rem';
                        if (task.dateTime.getMinutes() < 30) timeLineFreqMap[hours] += 1;

                        return (
                            <TaskCardSmall
                                key={task.id}
                                task={task}
                                onMutate={onMutate}
                                style={{
                                    top: topOffset,
                                    height: adjustedHeight,
                                    transform: `translate(-50%, ${heightOffset})`,
                                    zIndex:
                                        task.dateTime.getHours() + task.dateTime.getMinutes() / 10,
                                }}
                            />
                        );
                    })}
                </ul>
                <DynamicStatusPalleteProvider />
            </div>
            {isAdding && (
                <TaskAdd
                    onClose={() => setIsAdding(false)}
                    beginningPeriod={addHours(date, 12)}
                    onAddTask={taskMutateHandler}
                />
            )}
        </>
    );
};

export default WeekdayLine;
