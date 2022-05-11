import { useMemo, useState } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption } from '../../../models/analyzer-models/helper-models';
import { getWeekDayBorderColor } from '../../../utilities/gen-utils/color-util';
import FlexChart, { FlexChartType } from '../charts/FlexChart';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import ComparisonChart from '../charts/ComparisonChart';
import { FlexChartContainer, ChartSectionContainer } from '../containers';

interface Props {
    analyzer: AbstractAnalyzer;
    timeFrame: string;
}

const WeekdayAnalysis: React.FC<Props> = ({ analyzer, timeFrame }) => {
    const [showComparison, setShowComparison] = useState(false);

    const currentChartDataArray = useMemo(() => analyzer.generateWeekDayData(), [analyzer]);
    const previousChartDataArray = useMemo(
        () => analyzer.generateWeekDayData(AnalysisOption.PREVIOUS),
        [analyzer],
    );

    const toggleShowComparison = () => setShowComparison((prevState) => !prevState);

    return (
        <ChartSectionContainer showComparison={showComparison}>
            <FlexChartContainer>
                <FlexChart
                    chartTitle={'Weekday Distribution'}
                    chartLabel="WeekDay"
                    chartDataArray={currentChartDataArray}
                    initialChartType={FlexChartType.BAR}
                />
            </FlexChartContainer>
            {/* Can add ComparisonChart for comparing current, previous and accumulated weekday data */}
            {showComparison && (
                <ComparisonChart
                    chartTitle={'WeekDay comparison'}
                    firstDataSet={{ label: `This ${timeFrame}`, data: currentChartDataArray }}
                    secondDataSet={{ label: `Last ${timeFrame}`, data: previousChartDataArray }}
                />
            )}
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                labelColorCallback={getWeekDayBorderColor}
                onShowComparison={toggleShowComparison}
                showComparison={showComparison}
            />
        </ChartSectionContainer>
    );
};

export default WeekdayAnalysis;
