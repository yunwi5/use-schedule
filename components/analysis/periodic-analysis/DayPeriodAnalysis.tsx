import { useMemo } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption } from '../../../models/analyzer-models/helper-models';
import { getDayPeriodBorderColor } from '../../../utilities/gen-utils/color-util';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import ChartSectionContainer from '../containers/ChartSectionContainer';
import { FlexChart } from '../charts';

interface Props {
    analyzer: AbstractAnalyzer;
}

const DayPeriodAnalysis: React.FC<Props> = ({ analyzer }) => {
    const currentChartDataArray = useMemo(() => analyzer.generateDayPeriodData(), [analyzer]);
    const previousChartDataArray = useMemo(
        () => analyzer.generateDayPeriodData(AnalysisOption.PREVIOUS),
        [analyzer],
    );

    return (
        <ChartSectionContainer>
            <FlexChart
                chartTitle={'AM/PM Distribution'}
                chartLabel="AM/PM"
                chartDataArray={currentChartDataArray}
            />
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                labelColorCallback={getDayPeriodBorderColor}
            />
        </ChartSectionContainer>
    );
};

export default DayPeriodAnalysis;
