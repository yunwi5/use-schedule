import React from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption, ChartData } from '../../../models/analyzer-models/helper-models';
import { getImportanceBorderColor } from '../../../utilities/gen-utils/color-util';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import { FlexChart } from '../charts';
import AnalysisSectionWrapper from '../containers/ChartSectionContainer';

interface Props {
    analyzer: AbstractAnalyzer;
}

const ImportanceAnalysis: React.FC<Props> = ({ analyzer }) => {
    const currentChartDataArray: ChartData[] = analyzer.generateImportanceData();
    const previousChartDataArray: ChartData[] = analyzer.generateImportanceData(
        AnalysisOption.PREVIOUS,
    );

    return (
        <AnalysisSectionWrapper title="Importance Analysis">
            <FlexChart
                chartTitle={'importance distribution'}
                chartLabel="Task importance"
                chartDataArray={currentChartDataArray}
            />
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                labelColorCallback={getImportanceBorderColor}
            />
        </AnalysisSectionWrapper>
    );
};

export default ImportanceAnalysis;
