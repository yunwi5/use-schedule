import { useMemo, useState } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import {
    AnalysisOption,
    ChartData,
    FlexChartType,
} from '../../../models/analyzer-models/helper-models';
import { getImportanceBorderColor } from '../../../utilities/gen-utils/color-util';
import FlexChart from '../charts/FlexChart';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import ComparisonChart from '../charts/ComparisonChart';
import { FlexChartContainer, ChartSectionContainer } from '../containers';

interface Props {
    analyzer: AbstractAnalyzer;
    timeFrame: string;
}

const ImportanceAnalysis: React.FC<Props> = ({ analyzer, timeFrame }) => {
    const [showComparison, setShowComparison] = useState(false);

    const currentChartDataArray: ChartData[] = useMemo(
        () => analyzer.generateImportanceData(),
        [analyzer],
    );
    const previousChartDataArray: ChartData[] = useMemo(
        () => analyzer.generateImportanceData(AnalysisOption.PREVIOUS),
        [analyzer],
    );

    return (
        <ChartSectionContainer showComparison={showComparison}>
            <FlexChartContainer>
                <FlexChart
                    chartTitle={'importance distribution'}
                    chartLabel="Task importance"
                    chartDataArray={currentChartDataArray}
                    initialChartType={FlexChartType.DOUGHNUT}
                />
            </FlexChartContainer>
            {showComparison && (
                <ComparisonChart
                    chartTitle={'Importance comparison'}
                    firstDataSet={{ label: `This ${timeFrame}`, data: currentChartDataArray }}
                    secondDataSet={{ label: `Last ${timeFrame}`, data: previousChartDataArray }}
                />
            )}
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                labelColorCallback={getImportanceBorderColor}
                showComparison={showComparison}
                onShowComparison={() => setShowComparison((ps) => !ps)}
            />
        </ChartSectionContainer>
    );
};

export default ImportanceAnalysis;
