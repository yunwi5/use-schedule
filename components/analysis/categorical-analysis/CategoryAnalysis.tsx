import { useMemo } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption, ChartData } from '../../../models/analyzer-models/helper-models';
import { getCategoryBorderColor } from '../../../utilities/gen-utils/color-util';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import { FlexChart } from '../charts';
import AnalysisSectionWrapper from '../containers/ChartSectionContainer';

interface Props {
    analyzer: AbstractAnalyzer;
}

const CategoryAnalysis: React.FC<Props> = ({ analyzer }) => {
    const currentChartDataArray: ChartData[] = useMemo(
        () => analyzer.generateCategoryData(),
        [analyzer],
    );
    const previousChartDataArray: ChartData[] = useMemo(
        () => analyzer.generateCategoryData(AnalysisOption.PREVIOUS),
        [analyzer],
    );

    return (
        <AnalysisSectionWrapper title="Category Analysis">
            <FlexChart
                chartTitle={'category distribution'}
                chartLabel={'Task category'}
                chartDataArray={currentChartDataArray}
            />
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                labelColorCallback={getCategoryBorderColor}
            />
        </AnalysisSectionWrapper>
    );
};

export default CategoryAnalysis;
