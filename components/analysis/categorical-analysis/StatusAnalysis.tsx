import { useMemo, useState } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import {
    AnalysisOption,
    ChartData,
    FlexChartType,
} from '../../../models/analyzer-models/helper-models';
import { getStatusBorderColor } from '../../../utilities/gen-utils/color-util';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import ComparisonChart from '../charts/ComparisonChart';
import FlexChart from '../charts/FlexChart';
import { ChartSectionContainer, FlexChartContainer } from '../containers';

interface Props {
    analyzer: AbstractAnalyzer;
    timeFrame: string;
}

const StatusAnalysis: React.FC<Props> = ({ analyzer, timeFrame }) => {
    const [showComparison, setShowComparison] = useState(false);

    const currentStatusChartData: ChartData[] = useMemo(
        () => analyzer.generateStatusData(),
        [analyzer],
    );
    const previousStatusChartData: ChartData[] = useMemo(
        () => analyzer.generateStatusData(AnalysisOption.PREVIOUS),
        [analyzer],
    );

    return (
        <ChartSectionContainer showComparison={showComparison}>
            <FlexChartContainer>
                <FlexChart
                    chartTitle={'Status Distribution'}
                    chartLabel={'Task Status'}
                    chartDataArray={currentStatusChartData}
                    initialChartType={FlexChartType.BAR}
                />
            </FlexChartContainer>
            {showComparison && (
                <ComparisonChart
                    chartTitle={'Status comparison'}
                    firstDataSet={{ label: `Last ${timeFrame}`, data: previousStatusChartData }}
                    secondDataSet={{ label: `This ${timeFrame}`, data: currentStatusChartData }}
                />
            )}
            <AnalysisMessage
                currentChartDataArray={currentStatusChartData}
                previousChartDataArray={previousStatusChartData}
                labelColorCallback={getStatusBorderColor}
                showComparison={showComparison}
                onShowComparison={() => setShowComparison((ps) => !ps)}
            />
        </ChartSectionContainer>
    );
};

export default StatusAnalysis;
