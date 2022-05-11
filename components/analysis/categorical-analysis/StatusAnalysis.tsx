import { useMemo } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption, ChartData } from '../../../models/analyzer-models/helper-models';
import { getStatusBorderColor } from '../../../utilities/gen-utils/color-util';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import { FlexChart } from '../charts';
import AnalysisSectionWrapper from '../containers/ChartSectionContainer';

interface Props {
    analyzer: AbstractAnalyzer;
}

const StatusAnalysis: React.FC<Props> = ({ analyzer }) => {
    const currentStatusChartData: ChartData[] = useMemo(
        () => analyzer.generateStatusData(),
        [analyzer],
    );
    const previousStatusChartData: ChartData[] = useMemo(
        () => analyzer.generateStatusData(AnalysisOption.PREVIOUS),
        [analyzer],
    );

    return (
        <AnalysisSectionWrapper title={'Status Analysis'}>
            <FlexChart
                chartTitle={'Status Distribution'}
                chartLabel={'Task Status'}
                chartDataArray={currentStatusChartData}
            />
            <AnalysisMessage
                currentChartDataArray={currentStatusChartData}
                previousChartDataArray={previousStatusChartData}
                labelColorCallback={getStatusBorderColor}
            />
        </AnalysisSectionWrapper>
    );
};

export default StatusAnalysis;
