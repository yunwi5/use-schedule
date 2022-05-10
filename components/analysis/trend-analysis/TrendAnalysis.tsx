import React, { useMemo, useState } from 'react';
import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { RecentPeriod } from '../../../models/analyzer-models/helper-models';
import TrendChart from '../charts/TrendChart';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';

interface Props {
    analyzer: AbstractAnalyzer;
}

const TrendAnalysis: React.FC<Props> = ({ analyzer }) => {
    const [countTrendPeriods, setCountTrendPeriods] = useState<RecentPeriod>(RecentPeriod.FIVE);
    const [countFilterStatus, setCountFilterStatus] = useState<string>('');

    const [hoursTrendPeriods, setHoursTrendPeriods] = useState<RecentPeriod>(RecentPeriod.FIVE);
    const [hoursFilterStatus, setHoursFilterStatus] = useState<string>('');

    const totalTasksTrend = useMemo(
        () => analyzer.generateRecentPeriodCountData(countTrendPeriods, countFilterStatus),
        [analyzer, countTrendPeriods, countFilterStatus],
    );
    const totalHoursTrend = useMemo(
        () => analyzer.generateRecentPeriodDurationData(hoursTrendPeriods, hoursFilterStatus),
        [analyzer, hoursTrendPeriods, hoursFilterStatus],
    );

    return (
        <AnalysisSectionContainer title={'Trend Data Analysis'}>
            <div className="flex flex-wrap gap-[6rem] items-center">
                <TrendChart
                    chartTitle={'Number of tasks'}
                    chartLabel="Total Tasks"
                    chartDataArray={totalTasksTrend}
                    numPeriods={countTrendPeriods}
                    onChangeNumPeriods={setCountTrendPeriods}
                    filterStatus={countFilterStatus}
                    onChangeFilterStatus={setCountFilterStatus}
                />
                <TrendChart
                    chartTitle={'Total hours'}
                    chartLabel="Total Hours"
                    chartDataArray={totalHoursTrend}
                    numPeriods={hoursTrendPeriods}
                    onChangeNumPeriods={setHoursTrendPeriods}
                    filterStatus={hoursFilterStatus}
                    onChangeFilterStatus={setHoursFilterStatus}
                />
            </div>
        </AnalysisSectionContainer>
    );
};

export default TrendAnalysis;
