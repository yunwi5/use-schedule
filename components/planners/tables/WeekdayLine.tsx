import React, { useState } from 'react';
import { getWeekDay } from '../../../models/date-models/WeekDay';
import { AbstractTask } from '../../../models/task-models/AbstractTask';
import { mod } from '../../../utilities/gen-utils/calc-util';
import TaskCardSmall from '../../tasks/TaskCardSmall';
import DynamicStatusPalleteProvider from '../../ui/colors/DynamicStatusPalleteProvider';

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
    const dayMember = getWeekDay(date).substring(0, 3); // e.g. Monday
    const dayNumber = date.getDate(); // e.g. 26th

    const timeLineFreqMap = getInitialTimeLineFreqMap();

    return (
        <div className={`w-[calc(100%/7)]`}>
            <div
                className={`h-[5rem] py-1 flex flex-col justify-center items-center border-b-2 border-b-slate-300`}
            >
                <h3 className={`capitalize text-3xl font-normal text-slate-500/90`}>{dayMember}</h3>
                <p className={`text-slate-600 font-semibold`}>{dayNumber}</p>
            </div>
            <ul className={`relative px-1 pt-1`}>
                {tasks.map((task, idx) => {
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
    );
};

export default WeekdayLine;
