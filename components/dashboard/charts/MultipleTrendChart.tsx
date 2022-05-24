import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import {
    RecentPeriod,
    RecentPeriodList,
    TrendDataSet,
} from '../../../models/analyzer-models/helper-models';
import AppSelect from '../../ui/input/AppSelect';
import { StatusList } from '../../../models/task-models/Status';
import { useAppSelector } from '../../../store/redux';
import { getPeriodName } from '../../../utilities/gen-utils/label-util';
import { generateChartDataset } from '../../../utilities/chart-utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
);

export const options = {
    responsive: true,
    plugins: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        legend: {
            position: 'top' as const, // control data labels position
        },
    },
};

interface Props {
    chartTitle: string;
    datasetArray: TrendDataSet[];
    numPeriods: RecentPeriod;
    onChangeNumPeriods: React.Dispatch<React.SetStateAction<RecentPeriod>>;
    filterStatus?: string;
    onChangeFilterStatus?: React.Dispatch<React.SetStateAction<string>>;
}

const DEFAULT_BACKGROUND = 'rgba(224, 242, 254, .7)';
const DEFAULT_BORDER = 'rgb(14, 165, 233)';

const MultipleTrendChart: React.FC<Props> = (props) => {
    const {
        chartTitle,
        datasetArray,
        numPeriods,
        onChangeNumPeriods,
        filterStatus,
        onChangeFilterStatus,
    } = props;

    const plannerMode = useAppSelector((state) => state.planner.plannerMode);
    const periodName = getPeriodName(plannerMode);

    const { labels, data: dataArray } = generateChartDataset(datasetArray[0].data, false);

    const datasets = datasetArray.map((dataset) => {
        const { data: dataArray } = generateChartDataset(dataset.data, false);
        return {
            label: dataset.label,
            data: dataArray,
            fill: true,
            backgroundColor: dataset.backgroundColor || DEFAULT_BACKGROUND,
            borderColor: dataset.borderColor || DEFAULT_BORDER,
            borderWidth: 1.5,
        };
    });

    const data = {
        labels,
        datasets,
    };

    const filterStatusList = ['All', ...StatusList];

    return (
        <div className="pt-1">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl capitalize">{chartTitle}</h3>
                <div className="pr-4 ml-auto flex gap-2">
                    {/* May not need status filter */}
                    {filterStatus && onChangeFilterStatus && (
                        <AppSelect
                            label="Status"
                            value={filterStatus}
                            onChange={(val: string) => onChangeFilterStatus(val)}
                            options={filterStatusList}
                            id={`app-select-${chartTitle}`}
                            labelId={`app-select-${chartTitle}-label`}
                        />
                    )}
                    <AppSelect
                        label="Periods"
                        value={numPeriods}
                        options={RecentPeriodList}
                        optionLabels={useMemo(
                            () => RecentPeriodList.map((p) => `${p} ${periodName}s`),
                            [periodName],
                        )}
                        onChange={(val: string) => onChangeNumPeriods(parseInt(val))}
                    />
                </div>
            </div>
            <div className="container">
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default MultipleTrendChart;
