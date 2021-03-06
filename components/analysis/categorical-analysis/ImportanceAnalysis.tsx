import { useMemo, useState } from 'react';

import {
    AnalysisOption,
    ChartData,
    FlexChartType,
} from '../../../models/analyzer-models/helper-models';
import { getImportanceBorderColor } from '../../../utilities/gen-utils/color-util';
import FlexChart from '../charts/FlexChart';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import ComparisonChart from '../charts/ComparisonChart';
import { ChartSectionContainer } from '../containers';
import { useAnalysisContext } from '../../../store/context/analysis-context';

const ImportanceAnalysis: React.FC = () => {
    const { analyzer, timeFrame } = useAnalysisContext();
    const [showComparison, setShowComparison] = useState(false);

    const currentChartDataArray: ChartData[] = useMemo(
        () => analyzer?.generateImportanceData() || [],
        [analyzer],
    );
    const previousChartDataArray: ChartData[] = useMemo(
        () => analyzer?.generateImportanceData(AnalysisOption.PREVIOUS) || [],
        [analyzer],
    );

    return (
        <ChartSectionContainer showComparison={showComparison}>
            <FlexChart
                chartTitle={'importance distribution'}
                chartLabel="Task importance"
                chartDataArray={currentChartDataArray}
                initialChartType={FlexChartType.DOUGHNUT}
            />
            {showComparison && (
                <ComparisonChart
                    chartTitle={'Importance comparison'}
                    firstDataSet={{ label: `Last ${timeFrame}`, data: previousChartDataArray }}
                    secondDataSet={{ label: `This ${timeFrame}`, data: currentChartDataArray }}
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
