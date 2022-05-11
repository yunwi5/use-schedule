import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie, Doughnut, PolarArea, Bar } from 'react-chartjs-2';

import { ChartData } from '../../../models/analyzer-models/helper-models';
import AppSelect from '../../ui/input/AppSelect';
import { generateChartDataset } from '../../../utilities/chart-utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
); // registration

const barOptions = {
    responsive: true,
    // maintainAspectRatio: false, // experimental
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

const pieOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
    },
};

enum FlexChartType {
    BAR = 'Bar',
    PIE = 'Pie',
    DOUGHNUT = 'Doughnut',
    POLAR_AREA = 'Polar Area',
}

const FlexChartTypeList = [
    FlexChartType.BAR,
    FlexChartType.DOUGHNUT,
    FlexChartType.PIE,
    FlexChartType.POLAR_AREA,
];

interface Props {
    chartTitle: string;
    chartLabel: string;
    chartDataArray: ChartData[];
}

const FlexChart: React.FC<Props> = ({ chartTitle, chartLabel, chartDataArray }) => {
    const [flexChartType, setFlexChartType] = useState<FlexChartType>(FlexChartType.PIE); // Pie chart by default

    const { labels, data, backgroundColor, borderColor } = generateChartDataset(chartDataArray);

    const pieOrDoughnutData = {
        labels,
        datasets: [
            {
                label: chartLabel,
                data,
                backgroundColor,
                borderColor,
                borderWidth: 1,
            },
        ],
    };

    // const barChartData = {
    //     labels,
    //     datasets: [{ label: chartLabel, data, backgroundColor }],
    // };

    return (
        <section
            className={`basis-1/2 mt-2 max-w-[29rem] flex flex-col gap-3 ${
                flexChartType === FlexChartType.BAR ? 'mb-[6rem]' : ''
            }`}
        >
            <div className="flex justify-between items-start">
                <h3 className="-translate-y-1 text-3xl capitalize">{chartTitle}</h3>
                <AppSelect
                    label="Chart Type"
                    value={flexChartType}
                    onChange={(val: string) => setFlexChartType(val as FlexChartType)}
                    options={FlexChartTypeList}
                    id={`app-select-${chartTitle}`}
                    labelId={`app-select-${chartTitle}-label`}
                />
            </div>
            <div className={`container ${flexChartType === FlexChartType.BAR ? '' : '-mt-[3rem]'}`}>
                {flexChartType === FlexChartType.PIE && (
                    <Pie options={pieOptions} data={pieOrDoughnutData} />
                )}
                {flexChartType === FlexChartType.DOUGHNUT && (
                    <Doughnut options={pieOptions} data={pieOrDoughnutData} />
                )}
                {flexChartType === FlexChartType.POLAR_AREA && (
                    <PolarArea options={pieOptions} data={pieOrDoughnutData} />
                )}
                {flexChartType === FlexChartType.BAR && (
                    // Increase height with vh setting
                    <Bar options={barOptions} height="55vh" width="80vw" data={pieOrDoughnutData} />
                )}
            </div>
        </section>
    );
};

export default FlexChart;
