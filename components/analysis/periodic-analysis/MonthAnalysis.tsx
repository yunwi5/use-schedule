import React, { useMemo, useState } from 'react';
import { YearlyAnalyzer } from '../../../models/analyzer-models/YearlyAnalyzer';
import { AnalysisOption, FlexChartType } from '../../../models/analyzer-models/helper-models';
import {
    getMonthBorderColor,
    getWeekDayBorderColor,
} from '../../../utilities/gen-utils/color-util';
import FlexChart from '../charts/FlexChart';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import ComparisonChart from '../charts/ComparisonChart';
import { FlexChartContainer, ChartSectionContainer } from '../containers';

interface Props {
    analyzer: YearlyAnalyzer;
}

const MonthAnalysis: React.FC<Props> = ({ analyzer }) => {
    const [showComparison, setShowComparison] = useState(false);

    const [previousChartDataArray, currentChartDataArray] = useMemo(
        () => [analyzer.generateMonthData(AnalysisOption.PREVIOUS), analyzer.generateMonthData()],
        [analyzer],
    );

    return (
        <ChartSectionContainer showComparison={showComparison}>
            <FlexChartContainer>
                <FlexChart
                    chartTitle={'Month Distribution'}
                    chartLabel="Month"
                    chartDataArray={currentChartDataArray}
                />
            </FlexChartContainer>
            {showComparison && (
                <ComparisonChart
                    chartTitle={'Month comparison'}
                    firstDataSet={{ label: `Last year`, data: previousChartDataArray }}
                    secondDataSet={{ label: `This year`, data: currentChartDataArray }}
                />
            )}
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                preposition={'in'}
                labelColorCallback={getMonthBorderColor}
                onShowComparison={() => setShowComparison((prevState) => !prevState)}
                showComparison={showComparison}
            />
        </ChartSectionContainer>
    );
};

export default MonthAnalysis;
