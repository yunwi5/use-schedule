import { useMemo, useState } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption, ChartData } from '../../../models/analyzer-models/helper-models';
import { getCategoryBorderColor } from '../../../utilities/gen-utils/color-util';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import { FlexChart } from '../charts';
import ComparisonChart from '../charts/ComparisonChart';
import { ChartSectionContainer, FlexChartContainer } from '../containers';

interface Props {
    analyzer: AbstractAnalyzer;
    timeFrame: string;
}

const CategoryAnalysis: React.FC<Props> = ({ analyzer, timeFrame }) => {
    const [showComparison, setShowComparison] = useState(false);

    const currentChartDataArray: ChartData[] = useMemo(
        () => analyzer.generateCategoryData(),
        [analyzer],
    );
    const previousChartDataArray: ChartData[] = useMemo(
        () => analyzer.generateCategoryData(AnalysisOption.PREVIOUS),
        [analyzer],
    );

    return (
        <ChartSectionContainer showComparison={showComparison}>
            <FlexChartContainer>
                <FlexChart
                    chartTitle={'category distribution'}
                    chartLabel={'Task category'}
                    chartDataArray={currentChartDataArray}
                />
            </FlexChartContainer>
            {showComparison && (
                <ComparisonChart
                    chartTitle={'Category comparison'}
                    firstDataSet={{ label: `This ${timeFrame}`, data: currentChartDataArray }}
                    secondDataSet={{ label: `Last ${timeFrame}`, data: previousChartDataArray }}
                />
            )}
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                labelColorCallback={getCategoryBorderColor}
                showComparison={showComparison}
                onShowComparison={() => setShowComparison((ps) => !ps)}
            />
        </ChartSectionContainer>
    );
};

export default CategoryAnalysis;
