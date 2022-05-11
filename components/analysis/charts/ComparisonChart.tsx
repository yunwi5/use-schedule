import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

import { Bar, Radar } from 'react-chartjs-2';
import { DataSet } from '../../../models/analyzer-models/helper-models';
import { generateChartDataset } from '../../../utilities/chart-utils';
import AppSelect from '../../ui/input/AppSelect';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
);

interface Props {
    chartTitle: string;
    firstDataSet: DataSet;
    secondDataSet: DataSet;
    thirdDataSet?: DataSet;
    disableRadar?: boolean;
}

export enum ComparisonChartType {
    BAR = 'Bar',
    RADAR = 'Radar',
}

const ComparisonChartTypeList = [ComparisonChartType.BAR, ComparisonChartType.RADAR];

const barOptions = {
    responsive: true,
    // maintainAspectRatio: false, // experimental
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

const radarOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
    },
};

const FIRST_BACKGROUND = 'rgba(249, 168, 212, .7)'; // pink-300
const FIRST_BORDER = 'rgb(236, 72, 153)'; // pink-500

const SECOND_BACKGROUND = 'rgba(125, 211, 252, .7)'; // sky-300
const SECOND_BORDER = 'rgb(14, 165, 233)'; // sky-500

const ComparisonChart: React.FC<Props> = (props) => {
    const { chartTitle, firstDataSet, secondDataSet, disableRadar } = props;
    const [chartType, setChartType] = useState<ComparisonChartType>(ComparisonChartType.BAR);

    const firstColumn = generateChartDataset(firstDataSet.data);
    const secondColumn = generateChartDataset(secondDataSet.data);

    // set default background and border colors with rgba.
    const data = {
        labels: firstColumn.labels,
        datasets: [
            {
                label: firstDataSet.label,
                data: firstColumn.data,
                backgroundColor: FIRST_BACKGROUND,
                borderColor: FIRST_BORDER,
                borderWidth: 1,
            },
            {
                label: secondDataSet.label,
                data: secondColumn.data,
                backgroundColor: SECOND_BACKGROUND,
                borderColor: SECOND_BORDER,
                borderWidth: 1,
            },
        ],
    };

    const chartTypeHandler = (newType: string) => {
        if (newType === ComparisonChartType.RADAR && disableRadar) return;
        setChartType(newType as ComparisonChartType);
    };
    const chartTypeOptions = !disableRadar ? ComparisonChartTypeList : [ComparisonChartType.BAR];

    return (
        <section className={`basis-1/2 mt-2 max-w-[29rem] flex flex-col gap-3`}>
            <div className="flex justify-between items-start">
                <h3 className="-translate-y-1 text-3xl capitalize">{chartTitle}</h3>
                <AppSelect
                    label="Chart Type"
                    value={chartType}
                    onChange={chartTypeHandler}
                    options={chartTypeOptions}
                    id={`app-select-${chartTitle}`}
                    labelId={`app-select-${chartTitle}-label`}
                />
            </div>
            <div
                className={`container  ${
                    chartType === ComparisonChartType.RADAR ? '-mt-[4.1rem] -mb-[5rem]' : ''
                }`}
            >
                {chartType === ComparisonChartType.BAR && (
                    <Bar options={barOptions} data={data} height="55vh" width="80vw" />
                )}
                {chartType === ComparisonChartType.RADAR && (
                    <Radar options={radarOptions} data={data} height="50vh" width="80vw" />
                )}
            </div>
        </section>
    );
};

export default ComparisonChart;
