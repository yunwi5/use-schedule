import React, { useMemo, useState } from 'react';
import {
    AnalysisMode,
    ChartData,
    RecentPeriod,
    TrendDataSet,
} from '../../../models/analyzer-models/helper-models';
import { Pallete200, Pallete500 } from '../../../utilities/gen-utils/color-util';
import TableCard from '../cards/TableCard';
import MultipleTrendChart from '../charts/MultipleTrendChart';
import { useDashboardContext } from '../dashboard-context';

const TrendComparison: React.FC = () => {
    const { analyzer } = useDashboardContext();
    const [numPeriods, setNumPeriods] = useState<RecentPeriod>(RecentPeriod.FIVE);

    const allItemTrendData: ChartData[] = useMemo(
        () => analyzer?.generateRecentPeriodCountData(numPeriods) || [],
        [numPeriods, analyzer],
    );
    const allItemDataset: TrendDataSet = {
        label: 'All',
        data: allItemTrendData,
        backgroundColor: `#${Pallete200.SLATE}33`,
        borderColor: `#${Pallete500.SLATE}`,
    };

    const eventTrendData = useMemo(
        () =>
            analyzer?.generateRecentPeriodCountData(numPeriods, undefined, AnalysisMode.EVENTS) ||
            [],
        [numPeriods, analyzer],
    );
    const eventItemDataset: TrendDataSet = {
        label: 'Event',
        data: eventTrendData,
        backgroundColor: `#${Pallete200.SKY}55`,
        borderColor: `#${Pallete500.SKY}`,
    };

    const taskTrendData = useMemo(
        () =>
            analyzer?.generateRecentPeriodCountData(numPeriods, undefined, AnalysisMode.TASKS) ||
            [],
        [numPeriods, analyzer],
    );
    const taskItemDataset: TrendDataSet = {
        label: 'Task',
        data: taskTrendData,
        backgroundColor: `#${Pallete200.BLUE}55`,
        borderColor: `#${Pallete500.BLUE}`,
    };

    const datasetArray: TrendDataSet[] = [allItemDataset, eventItemDataset, taskItemDataset];

    return (
        <TableCard className={`lg:w-[50%] p-2`}>
            <MultipleTrendChart
                chartTitle={`Recent Trend`}
                numPeriods={numPeriods}
                onChangeNumPeriods={setNumPeriods}
                datasetArray={datasetArray}
            />
        </TableCard>
    );
};

export default TrendComparison;
