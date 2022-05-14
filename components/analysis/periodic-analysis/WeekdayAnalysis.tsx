import { useMemo, useState } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption, FlexChartType } from '../../../models/analyzer-models/helper-models';
import { getWeekDayBorderColor } from '../../../utilities/gen-utils/color-util';
import FlexChart from '../charts/FlexChart';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import ComparisonChart from '../charts/ComparisonChart';
import { FlexChartContainer, ChartSectionContainer } from '../containers';
import { useAnalysisContext } from '../../../store/context/analysis-context';

const WeekdayAnalysis: React.FC = () => {
    const { analyzer, timeFrame } = useAnalysisContext();
    const [showComparison, setShowComparison] = useState(false);

    const currentChartDataArray = useMemo(() => analyzer?.generateWeekDayData() || [], [analyzer]);
    const previousChartDataArray = useMemo(
        () => analyzer?.generateWeekDayData(AnalysisOption.PREVIOUS) || [],
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
                labelColorCallback={getWeekDayBorderColor}
                onShowComparison={() => setShowComparison((prevState) => !prevState)}
                preposition={'on'}
                showComparison={showComparison}
            />
        </ChartSectionContainer>
    );
};

export default WeekdayAnalysis;
