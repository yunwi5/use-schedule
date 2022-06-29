import React from 'react';
import { ChartData } from '../../../models/analyzer-models/helper-models';
import { round } from '../../../utilities/gen-utils/calc-util';
import SummaryCard from '../cards/SummaryCard';
import SummaryHeading from '../cards/SummaryHeading';
import MiniChart, { MiniChartType } from '../charts/MiniChart';
import { useDashboardContext } from '../../../store/context/dashboard-context';

const info = (
    <>
        <span className={`font-semibold text-lg`}>AM/PM Summary</span> <br /> shows the
        distribution of events/tasks between AM and PM for a selected week.
    </>
);

const DayPeriodSummary = () => {
    const { analyzer } = useDashboardContext();
    if (!analyzer) return <div />;

    const chartDataArray: ChartData[] = analyzer.generateDayPeriodData();

    // should prevent zero division bug
    const totalCount =
        chartDataArray.reduce((accValue, curr) => accValue + curr.value, 0) || 1;

    return (
        <SummaryCard>
            <SummaryHeading info={info}>AM/PM Comparison</SummaryHeading>
            <div className="flex gap-3 items-center justify-around">
                <div className="py-3 pl-1">
                    {chartDataArray.map((data) => (
                        <div key={data.label} className="flex items-center gap-1">
                            <span className="scale-110 text-slate-500 font-semibold">
                                {round((data.value / totalCount) * 100, 1)}%
                            </span>
                            {'  '}
                            on{' '}
                            <span style={{ color: `#${data.borderColor}` }}>{data.label}</span>
                        </div>
                    ))}
                </div>
                <MiniChart
                    dataset={{ label: 'AM/PM', data: chartDataArray }}
                    chartType={MiniChartType.PIE}
                />
            </div>
        </SummaryCard>
    );
};

export default DayPeriodSummary;
