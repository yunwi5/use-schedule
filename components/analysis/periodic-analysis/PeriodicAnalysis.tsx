import React from 'react';
import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { FlexChart } from '../charts';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';

interface Props {
    analyzer: AbstractAnalyzer;
}

const PeriodicAnalysis: React.FC<Props> = ({ analyzer }) => {
    const weekdayChartDataArray = analyzer.generateWeekDayData();
    const dayPeriodChartDataArray = analyzer.generateDayPeriodData();

    return (
        <AnalysisSectionContainer title={'Periodic Data Analysis'}>
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
        </AnalysisSectionContainer>
    );
};

export default PeriodicAnalysis;
