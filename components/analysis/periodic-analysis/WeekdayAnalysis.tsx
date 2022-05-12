import { useMemo, useState } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption, FlexChartType } from '../../../models/analyzer-models/helper-models';
import { getWeekDayBorderColor } from '../../../utilities/gen-utils/color-util';
import FlexChart from '../charts/FlexChart';
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
            {showComparison && (
                <ComparisonChart
                    chartTitle={'WeekDay comparison'}
                    firstDataSet={{ label: `Last ${timeFrame}`, data: previousChartDataArray }}
                    secondDataSet={{ label: `This ${timeFrame}`, data: currentChartDataArray }}
                />
            )}
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                preposition={'on'}
                labelColorCallback={getWeekDayBorderColor}
                onShowComparison={() => setShowComparison((prevState) => !prevState)}
                showComparison={showComparison}
            />
        </ChartSectionContainer>
    );
};

export default WeekdayAnalysis;
