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

import {
    ChartData,
    FlexChartType,
    FlexChartTypeList,
} from '../../../models/analyzer-models/helper-models';
import { generateChartDataset } from '../../../utilities/chart-utils';
import AppSelect from '../../ui/input/AppSelect';

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

interface Props {
    chartTitle: string | JSX.Element;
    chartLabel: string;
    chartDataArray: ChartData[];
    initialChartType?: FlexChartType;
    additionalSelect?: JSX.Element;
}

const FlexChart: React.FC<Props> = (props) => {
    const { chartTitle, chartLabel, chartDataArray, initialChartType, additionalSelect } =
        props;
    const [flexChartType, setFlexChartType] = useState<FlexChartType>(
        initialChartType || FlexChartType.PIE,
    ); // Pie chart by default

    const { labels, data, backgroundColor, borderColor } =
        generateChartDataset(chartDataArray);

    const pieOrDoughnutData = {
        labels,
        datasets: [
            {
                label: chartLabel,
                data,
                backgroundColor,
                borderColor: 'rgb(255, 255, 255)',
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels,
        datasets: [
            {
                label: chartLabel,
                data,
                backgroundColor: backgroundColor?.map((bg) => `${bg}bd`), // control opacity only for bar chart
                borderColor,
                borderWidth: 1,
            },
        ],
    };

    const chartTypeSelect = (
        <AppSelect
            label="Chart Type"
            value={flexChartType}
            onChange={(val: string) => setFlexChartType(val as FlexChartType)}
            options={FlexChartTypeList}
            id={`app-select-${chartTitle}`}
            labelId={`app-select-${chartTitle}-label`}
        />
    );

    return (
        <section className={`w-full lg:w-[49%] pr-5 flex flex-col gap-3`}>
            <div className={'flex flex-col sm:flex-row gap-4 justify-between items-start'}>
                <h3 className="-translate-y-1 text-2xl md:text-3xl capitalize">
                    {chartTitle}
                </h3>
                <div className={`flex gap-2`}>
                    {/* additionalSelect is undefind most of the cases, so it would not display in that case. */}
                    {additionalSelect}
                    {chartTypeSelect}
                </div>
            </div>
            <div
                className={`${
                    flexChartType === FlexChartType.BAR
                        ? ''
                        : '-mt-[3rem] -mb-[2rem] xs:-mb-[3rem]'
                }`}
            >
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
                    <Bar options={barOptions} data={barData} />
                )}
            </div>
        </section>
    );
};

export default FlexChart;
