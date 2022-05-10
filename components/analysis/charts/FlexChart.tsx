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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
); // registration for pie chart

const exampleOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
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

    const labels = chartDataArray.map((cd) => cd.label);
    const data = chartDataArray.map((cd) => cd.value);
    const backgroundColor = chartDataArray.map((cd) => `#${cd.backgroundColor}`);
    const borderColor = chartDataArray.map((cd) => 'rgba(255, 255, 255)'); // defaut border color

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

    const barChartData = {
        labels,
        datasets: [{ label: chartLabel, data, backgroundColor }],
    };

    return (
        <section className="basis-1/2 mt-2 max-w-[29rem] flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h3 className="text-3xl capitalize">{chartTitle}</h3>
                <AppSelect
                    label="Chart Type"
                    value={flexChartType}
                    onChange={(val: string) => setFlexChartType(val as FlexChartType)}
                    options={FlexChartTypeList}
                    id={`app-select-${chartTitle}`}
                    labelId={`app-select-${chartTitle}-label`}
                />
            </div>
            <div className="container">
                {flexChartType === FlexChartType.PIE && <Pie data={pieOrDoughnutData} />}
                {flexChartType === FlexChartType.DOUGHNUT && <Doughnut data={pieOrDoughnutData} />}
                {flexChartType === FlexChartType.POLAR_AREA && (
                    <PolarArea data={pieOrDoughnutData} />
                )}
                {flexChartType === FlexChartType.BAR && (
                    <Bar options={exampleOptions} data={barChartData} />
                )}
            </div>
        </section>
    );
};

export default FlexChart;
