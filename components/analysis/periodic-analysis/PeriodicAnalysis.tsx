import React from 'react';
import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { FlexChart } from '../charts';

interface Props {
    analyzer: AbstractAnalyzer;
}

const PeriodicAnalysis: React.FC<Props> = ({ analyzer }) => {
    const weekdayChartDataArray = analyzer.generateWeekDayData();
    const dayPeriodChartDataArray = analyzer.generateDayPeriodData();

    return (
        <section>
            <h2 className="mb-3 text-4xl capitalize">Periodic Data Analysis</h2>
            <div className="flex flex-wrap gap-[6rem] items-center">
                <FlexChart
                    chartTitle={'Weekday Distribution'}
                    chartLabel="WeekDay"
                    chartDataArray={weekdayChartDataArray}
                />
                <FlexChart
                    chartTitle={'AM/PM Distribution'}
                    chartLabel="AM/PM"
                    chartDataArray={dayPeriodChartDataArray}
                />
            </div>
        </section>
    );
};

export default PeriodicAnalysis;
