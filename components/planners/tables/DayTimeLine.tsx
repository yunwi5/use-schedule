import React from 'react';
import { generateDayTimeLine } from '../../../utilities/date-utils/timeline-util';

interface Props {
    cellHeight: number;
}

const DayTimeLine: React.FC<Props> = ({ cellHeight }) => {
    const timeLines: string[] = generateDayTimeLine();
    return (
        <div className={`w-full h-full text-slate-500/90 border-r-2 border-r-slate-300 text-lg`}>
            {timeLines.map((timeLine, idx) => {
                const topOffset = idx * cellHeight + 'rem';
                return (
                    <div
                        key={idx}
                        className={`absolute w-full border-b-2 border-slate-300`}
                        style={{ top: topOffset, height: `${cellHeight}rem` }}
                    >
                        <time
                            className={`py-2 px-1 block w-[2.5rem] h-full border-r-2 border-slate-300 pr-1`}
                        >
                            {timeLine}
                        </time>
                    </div>
                );
            })}
        </div>
    );
};

export default DayTimeLine;
