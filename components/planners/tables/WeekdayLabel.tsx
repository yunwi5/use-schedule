import React from 'react';
import { getWeekDay } from '../../../models/date-models/WeekDay';

const WeekdayLabel: React.FC<{ date: Date }> = ({ date }) => {
    const dayMember = getWeekDay(date).substring(0, 3); // e.g. Monday
    const dayNumber = date.getDate(); // e.g. 26th
    return (
        <div
            className={`h-[5rem] py-1 flex flex-col justify-center items-center border-b-2 border-b-slate-300`}
        >
            <h3 className={`capitalize text-3xl font-normal text-slate-500/90`}>{dayMember}</h3>
            <p className={`text-slate-600 font-semibold`}>{dayNumber}</p>
        </div>
    );
};

export default WeekdayLabel;
