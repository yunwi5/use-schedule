import React from 'react';
import { WeekdayListMondayToSunday } from '../../../models/date-models/WeekDay';
import { WeeklyPlanner } from '../../../models/planner-models/WeeklyPlanner';
import { TemplatePlanner } from '../../../models/template-models/TemplatePlanner';
import { addDays } from '../../../utilities/date-utils/date-control';
import { generateDayTimeLine } from '../../../utilities/date-utils/timeline-util';
import DayTimeLine from './DayTimeLine';
import WeekdayLabel from './WeekdayLabel';
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
        <section className={`relative mt-3 flex flex-col overflow-hidden`}>
            <div className={`pl-[2.55rem] border-b-2 border-slate-300 flex w-full`}>
                {WeekdayListMondayToSunday.map((day, idx) => (
                    <WeekdayLabel key={idx} date={addDays(beginningPeriod, idx)} />
                ))}
            </div>
            <div className={`pl-1 relative w-full h-[90vh] overflow-y-scroll overflow-x-hidden`}>
                <div className={`overflow-y-hidden`} style={{ minHeight: `${cellHeight * 24}rem` }}>
                    <div className={`pl-[2.55rem] flex w-full`}>
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
                    <DayTimeLine cellHeight={cellHeight} />
                </div>
            </div>
        </section>
    );
};

export default WeekTable;
