import React, { useMemo, useState } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
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
            <div className="mb-6 flex flex-wrap gap-[6rem] items-center">
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
            </div>
            <TrendMessage totalTasksTrend={totalTasksTrend} totalHoursTrend={totalHoursTrend} />
        </AnalysisSectionContainer>
    );
};

export default TrendAnalysis;
