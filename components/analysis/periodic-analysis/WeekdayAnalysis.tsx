import { useMemo } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption } from '../../../models/analyzer-models/helper-models';
import { getWeekDayBorderColor } from '../../../utilities/gen-utils/color-util';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import ChartSectionContainer from '../containers/ChartSectionContainer';
import { FlexChart } from '../charts';

interface Props {
    analyzer: AbstractAnalyzer;
}

const WeekdayAnalysis: React.FC<Props> = ({ analyzer }) => {
    const currentChartDataArray = useMemo(() => analyzer.generateWeekDayData(), [analyzer]);
    const previousChartDataArray = useMemo(
        () => analyzer.generateWeekDayData(AnalysisOption.PREVIOUS),
        [analyzer],
    );

    return (
        <ChartSectionContainer>
            <FlexChart
                chartTitle={'Weekday Distribution'}
                chartLabel="WeekDay"
                chartDataArray={currentChartDataArray}
            />
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                labelColorCallback={getWeekDayBorderColor}
            />
        </ChartSectionContainer>
    );
};

export default WeekdayAnalysis;
