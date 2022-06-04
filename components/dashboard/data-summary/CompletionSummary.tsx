import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ChartData } from '../../../models/analyzer-models/helper-models';
import { Status, StatusList } from '../../../models/task-models/Status';
import { round } from '../../../utilities/gen-utils/calc-util';
import { Pallete200 } from '../../../utilities/gen-utils/color-util';
import SummaryCard from '../cards/SummaryCard';
import SummaryHeading from '../cards/SummaryHeading';
import MiniChart, { MiniChartType } from '../charts/MiniChart';
import { useDashboardContext } from '../../../store/context/dashboard-context';

function generateBinaryCompletionData(statusChartArray: ChartData[]) {
    const completionChartData = statusChartArray.find(
        (chartData) => chartData.label === Status.COMPLETED,
    ) || { value: 0, label: 'Completed', backgroundColor: Pallete200.BLUE };

    const nonCompletionChartData: ChartData = statusChartArray.reduce(
        (acc, curr) => {
            // Excluding completed data
            if (curr.label === Status.COMPLETED) return acc;
            return {
                ...acc,
                value: acc.value + curr.value,
            };
        },
        {
            label: 'Uncompleted',
            value: 0,
            backgroundColor: Pallete200.GRAY,
        },
    );

    return {
        completionChartData,
        nonCompletionChartData,
    };
}

const infoText = (
    <>
        <span className={`font-semibold text-lg`}>Completion summary</span> shows the proportions of
        events/tasks you have done for the currently selected week.
    </>
);

const CompletionSummary: React.FC = () => {
    const { analyzer } = useDashboardContext();
    if (!analyzer) return <div />;

    const statusChartArray: ChartData[] = analyzer.generateStatusData();
    const { completionChartData, nonCompletionChartData } =
        generateBinaryCompletionData(statusChartArray);

    const completedProportion = round(
        (completionChartData.value / (completionChartData.value + nonCompletionChartData.value)) *
            100,
        1,
    );

    const dataArray = [completionChartData, nonCompletionChartData];

    return (
        <SummaryCard>
            <SummaryHeading info={infoText}>Weekly Completion&nbsp;</SummaryHeading>
            <div className="flex gap-3 items-center justify-around">
                <div className="py-1 pl-3">
                    <h2 className="text-4xl text-slate-500 font-semibold">
                        {completedProportion}&nbsp;%
                    </h2>
                    <p className="text-slate-400 font-semibold text-sm">Completed</p>
                </div>
                <MiniChart
                    dataset={{ label: 'Completion', data: dataArray }}
                    chartType={MiniChartType.DOUGHNUT}
                />
            </div>
        </SummaryCard>
    );
};

export default CompletionSummary;
