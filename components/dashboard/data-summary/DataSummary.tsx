import React from 'react';
import MiniCalendar from '../MiniCalendar';
import CompletionSummary from './CompletionSummary';
import DayPeriodSummary from './DayPeriodSummary';
import WeekdaySummary from './WeekdaySummary';

const DataSummary: React.FC = () => {
    return (
        <div className="xl:max-h-[15rem] flex flex-col lg:flex-row flex-wrap xl:flex-nowrap gap-3">
            <CompletionSummary />
            <WeekdaySummary />
            <DayPeriodSummary />
            <MiniCalendar />
        </div>
    );
};

export default DataSummary;
