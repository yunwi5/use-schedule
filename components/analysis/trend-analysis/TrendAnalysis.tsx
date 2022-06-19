import React, { useMemo, useState } from 'react';

import { RecentPeriod } from '../../../models/analyzer-models/helper-models';
import { useAnalysisContext } from '../../../store/context/analysis-context';
import TrendMessage from '../analysis-message/TrendMessage';
import TrendChart from '../charts/TrendChart';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';

const TrendAnalysis: React.FC = () => {
    const { analyzer, itemName } = useAnalysisContext();
    const [countTrendPeriods, setCountTrendPeriods] = useState<RecentPeriod>(RecentPeriod.FIVE);
    const [countFilterStatus, setCountFilterStatus] = useState<string>('');

    const [hoursTrendPeriods, setHoursTrendPeriods] = useState<RecentPeriod>(RecentPeriod.FIVE);
    const [hoursFilterStatus, setHoursFilterStatus] = useState<string>('');

    const [totalTasksTrend, filteredTotalTasksTrend] = useMemo(
        () => [
            analyzer?.generateRecentPeriodCountData(countTrendPeriods) || [],
            analyzer?.generateRecentPeriodCountData(countTrendPeriods, countFilterStatus) || [],
        ],
        [analyzer, countTrendPeriods, countFilterStatus],
    );
    const [totalHoursTrend, filteredTotalHoursTrend] = useMemo(
        () => [
            analyzer?.generateRecentPeriodDurationData(hoursTrendPeriods) || [],
            analyzer?.generateRecentPeriodDurationData(hoursTrendPeriods, hoursFilterStatus) || [],
        ],
        [analyzer, hoursTrendPeriods, hoursFilterStatus],
    );

    return (
        <AnalysisSectionContainer title={'Trend Data Analysis'}>
            <div className="max-w-[98vw] sm:mb-6 flex flex-col lg:flex-row items-center lg:items-start justify-between flex-wrap gap-[2rem] lg:gap-1 w-full">
                <TrendChart
                    chartTitle={`Total ${itemName}s`}
                    chartLabel={`${itemName}s`}
                    chartDataArray={filteredTotalTasksTrend}
                    numPeriods={countTrendPeriods}
                    onChangeNumPeriods={setCountTrendPeriods}
                    filterStatus={countFilterStatus}
                    onChangeFilterStatus={setCountFilterStatus}
                />
                <TrendChart
                    chartTitle={'Total hours'}
                    chartLabel="Hours"
                    chartDataArray={filteredTotalHoursTrend}
                    numPeriods={hoursTrendPeriods}
                    onChangeNumPeriods={setHoursTrendPeriods}
                    filterStatus={hoursFilterStatus}
                    onChangeFilterStatus={setHoursFilterStatus}
                />
                <TrendMessage totalTasksTrend={totalTasksTrend} totalHoursTrend={totalHoursTrend} />
            </div>
        </AnalysisSectionContainer>
    );
};

export default TrendAnalysis;
