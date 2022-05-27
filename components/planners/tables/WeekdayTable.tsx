import React from 'react';
import { WeekdayListMondayToSunday } from '../../../models/date-models/WeekDay';
import { WeeklyPlanner } from '../../../models/planner-models/WeeklyPlanner';
import { TemplatePlanner } from '../../../models/template-models/TemplatePlanner';
import { addDays } from '../../../utilities/date-utils/date-control';
import { generateDayTimeLine } from '../../../utilities/date-utils/timeline-util';
import DayTimeLine from './DayTimeLine';
import WeekdayLine from './WeekdayLine';

interface Props {
    beginningPeriod: Date;
    planner: WeeklyPlanner | TemplatePlanner;
    onMutate: () => void;
}

const WeekTable: React.FC<Props> = (props) => {
    const { beginningPeriod, planner, onMutate } = props;
    const timeLines: string[] = generateDayTimeLine();

    const cellHeight = 10; // same for all cells from 1am to 11pm

    return (
        <section className={`relative mt-3 pl-2 flex overflow-hidden`}>
            <DayTimeLine cellHeight={cellHeight} />
            <div className={`flex w-full`}>
                {WeekdayListMondayToSunday.map((day, idx) => {
                    const tasks = planner.getTasks(day);
                    const thisDate = addDays(beginningPeriod, idx);
                    return (
                        <WeekdayLine
                            key={idx}
                            cellHeight={cellHeight}
                            date={thisDate}
                            tasks={tasks}
                            onMutate={onMutate}
                        />
                    );
                })}
            </div>
            {timeLines.map((timeLine, idx) => {
                const topOffset = idx * cellHeight + 5 + 'rem';
                if (idx === 0) return <div key={idx} />;

                return (
                    <div
                        key={idx}
                        className={`absolute w-[100%] border-b-2 first:border-b-transparent border-b-slate-300`}
                        style={{ top: topOffset }}
                    ></div>
                );
            })}
        </section>
    );
};

export default WeekTable;
