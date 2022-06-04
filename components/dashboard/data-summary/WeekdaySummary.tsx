import React from 'react';

import SummaryCard from '../cards/SummaryCard';
import SummaryHeading from '../cards/SummaryHeading';
import MiniChart, { MiniChartType } from '../charts/MiniChart';
import { useDashboardContext } from '../../../store/context/dashboard-context';
import { ChartData } from '../../../models/analyzer-models/helper-models';

const info = (
    <>
        <span className={`font-semibold text-lg`}>Weekday summary</span> <br />
        shows the distribution of events/tasks from Monday to Friday for a selected week.
    </>
);

const WeekdaySummary: React.FC = () => {
    const { analyzer } = useDashboardContext();
    if (!analyzer) return <div />;

    const weekdayDataArray: ChartData[] = analyzer.generateWeekDayData();

    const totalCount = weekdayDataArray.reduce(
        (accValue, currValue) => accValue + currValue.value,
        0,
    );

    return (
        <SummaryCard>
            <SummaryHeading info={info}>Weekday Comparison</SummaryHeading>
            <div className="flex gap-3 items-center justify-around">
                <div className="py-1 pl-2">
                    <h2 className="relative text-4xl text-slate-500 font-semibold">
                        {totalCount}
                        <span className="text-base text-slate-400">&nbsp;total</span>
                    </h2>
                    <p className="text-slate-400 font-semibold text-sm">events/tasks</p>
                </div>
                <MiniChart
                    dataset={{ label: 'Weekday', data: weekdayDataArray }}
                    chartType={MiniChartType.BAR}
                />
            </div>
        </SummaryCard>
    );
};

export default WeekdaySummary;
