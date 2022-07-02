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
import { Pie, Doughnut, Bar } from 'react-chartjs-2';
import { DataSet } from '../../../models/analyzer-models/helper-models';
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

export enum MiniChartType {
    BAR = 'Bar',
    PIE = 'Pie',
    DOUGHNUT = 'Doughnut',
}

const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        // Removing legend
        legend: {
            display: false,
        },
        // Removing title on the top
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            ticks: {
                display: false,
            },
            // Remove x-axis grid
            grid: {
                display: false,
                // Remove x-axis bottom border
                drawBorder: false,
            },
        },
        y: {
            // Remove y-axis label
            ticks: {
                display: false,
            },
            // Remove y-axis grid
            grid: {
                display: false,
                // Remove y-axis left border
                drawBorder: false,
            },
        },
    },
};

const barOptions = {
    responsive: true,
    // maintainAspectRatio: true,
    plugins: {
        // Removing legend
        legend: {
            display: false,
        },
        // Removing title on the top
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            ticks: {
                display: false,
            },
            // Remove x-axis grid
            grid: {
                display: false,
                // Remove x-axis bottom border
                drawBorder: false,
            },
        },
        y: {
            // Remove y-axis label
            ticks: {
                display: false,
            },
            // Remove y-axis grid
            grid: {
                display: false,
                // Remove y-axis left border
                drawBorder: false,
            },
        },
    },
};

interface Props {
    dataset: DataSet;
    chartType: MiniChartType;
}

const MiniChart: React.FC<Props> = ({ dataset, chartType }) => {
    const { labels, data, backgroundColor } = generateChartDataset(dataset.data);

    const pieOrDoughnutData = {
        labels,
        datasets: [
            {
                label: dataset.label,
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
                label: dataset.label,
                data,
                backgroundColor,
                borderColor: 'rgb(255, 255, 255)',
                borderWidth: 1,
                barThickness: 11,
                maxBarThickness: 11,
                // barPercentage: 0.17,
            },
        ],
    };

    const pieAndDoughnutConfig = {
        width: 150,
        height: 200,
        options,
        data: pieOrDoughnutData,
    };

    return (
        <div>
            {chartType === MiniChartType.PIE && <Pie {...pieAndDoughnutConfig} />}
            {chartType === MiniChartType.DOUGHNUT && <Doughnut {...pieAndDoughnutConfig} />}
            {chartType === MiniChartType.BAR && (
                <Bar width={200} height={150} options={barOptions} data={barData} />
            )}
        </div>
    );
};

export default MiniChart;
