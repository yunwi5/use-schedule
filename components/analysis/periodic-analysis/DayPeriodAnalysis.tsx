import { useMemo, useState } from 'react';

import { AnalysisOption } from '../../../models/analyzer-models/helper-models';
import { getDayPeriodBorderColor } from '../../../utilities/gen-utils/color-util';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import ChartSectionContainer from '../containers/ChartSectionContainer';
import { FlexChart } from '../charts';
import ComparisonChart from '../charts/ComparisonChart';
import FlexChartContainer from '../containers/FlexChartContainer';
import { useAnalysisContext } from '../../../store/context/analysis-context';

const DayPeriodAnalysis: React.FC = () => {
    const { analyzer, timeFrame } = useAnalysisContext();
    const [showComparison, setShowComparison] = useState(false);

    const currentChartDataArray = useMemo(
        () => analyzer?.generateDayPeriodData() || [],
        [analyzer],
    );
    const previousChartDataArray = useMemo(
        () => analyzer?.generateDayPeriodData(AnalysisOption.PREVIOUS) || [],
        [analyzer],
    );

    return (
        <ChartSectionContainer showComparison={showComparison}>
            <FlexChartContainer>
                <FlexChart
                    chartTitle={'AM/PM Distribution'}
                    chartLabel="AM/PM"
                    chartDataArray={currentChartDataArray}
                />
            </FlexChartContainer>
            {showComparison && (
                <ComparisonChart
                    chartTitle={'AM/PM comparison'}
                    firstDataSet={{ label: `Last ${timeFrame}`, data: previousChartDataArray }}
                    secondDataSet={{ label: `This ${timeFrame}`, data: currentChartDataArray }}
                    disableRadar={true}
                />
            )}
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                preposition={'in'}
                labelColorCallback={getDayPeriodBorderColor}
                showComparison={showComparison}
                onShowComparison={() => setShowComparison((ps) => !ps)}
            />
        </ChartSectionContainer>
    );
};

export default DayPeriodAnalysis;
