import React from 'react';
import { generateDayTimeLine } from '../../../utilities/date-utils/timeline-util';

interface Props {
    cellHeight: number;
}

const DayTimeLine: React.FC<Props> = ({ cellHeight }) => {
    const timeLines: string[] = generateDayTimeLine();
    return (
        <ul
            className={`mt-[5rem] flex flex-col text-slate-500/90 border-r-2 border-r-slate-300 text-lg`}
        >
            {timeLines.map((time, idx) => (
                <li key={idx} className={`py-2 px-1`} style={{ height: `${cellHeight}rem` }}>
                    {time}
                </li>
            ))}
        </ul>
    );
};

export default DayTimeLine;
