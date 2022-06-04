import React, { useEffect, useState } from 'react';
import { AbstractTask } from '../../../models/task-models/AbstractTask';
import { useAppSelector } from '../../../store/redux';
import { mod } from '../../../utilities/gen-utils/calc-util';
import { applyTaskFilter } from '../../../utilities/tasks-utils/filter-util';
import TaskCardSmall from '../../tasks/TaskCardSmall';
import DynamicStatusPalleteProvider from '../../ui/colors/DynamicStatusPalleteProvider';
import TaskAdd from '../planner-crud/TaskAdd';

interface Props {
    date: Date;
    tasks: AbstractTask[];
    cellHeight: number;
    onMutate: () => void;
}

interface TimeLineFreqMap {
    [hour: number]: number;
}

function getInitialTimeLineFreqMap() {
    const freqMap: TimeLineFreqMap = {};
    for (let i = 0; i < 24; i++) {
        freqMap[i] = 0;
    }
    return freqMap;
}

const WeekdayLine: React.FC<Props> = ({ date, tasks, onMutate, cellHeight }) => {
    const { searchWord, filterTarget, mainFilter, subFilter } = useAppSelector(
        (state) => state.filter,
    );
    const [filteredTaskList, setFilteredTaskList] = useState<AbstractTask[]>(tasks);
    const [isAdding, setIsAdding] = useState(false);

    const taskAddHandler = () => {
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
                className={`wd-line z-20 min-h-[240rem] w-[calc(100%/7)] cursor-pointer hover:bg-slate-200/50`}
                onClick={() => setIsAdding(true)}
            >
                {/* <WeekdayLabel date={date} /> */}
                <ul className={`relative px-1 pt-1`}>
                    {filteredTaskList.map((task, idx) => {
                        const hours = task.dateTime.getHours();
                        const heightOffset = timeLineFreqMap[hours] * 2 + 'rem';

                        // extra top offset for the one with top 0rem
                        const topOffsetIndex = (mod(hours - 1, 24) || 0.05) * cellHeight;
                        const topOffset = topOffsetIndex + 'rem';

                        const durationHours = task.duration / 60;
                        const height = Math.max(durationHours, 1) * cellHeight - 0.35 + 'rem';

                        timeLineFreqMap[hours] += 1;

                        return (
                            <TaskCardSmall
                                key={task.id}
                                task={task}
                                onMutate={onMutate}
                                style={{
                                    top: topOffset,
                                    height,
                                    transform: `translate(-50%, ${heightOffset})`,
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
                    beginningPeriod={date}
                    onAddTask={taskAddHandler}
                />
            )}
        </>
    );
};

export default WeekdayLine;
