import { ChartData } from '../../models/analyzer-models/helper-models';

export function generateChartDataset(chartDataArray: ChartData[], generateColors: boolean = true) {
    const labels = chartDataArray.map((cd) => cd.label);
    const data = chartDataArray.map((cd) => cd.value);
    if (!generateColors) return { labels, data };

    const backgroundColor = chartDataArray.map((cd) => `#${cd.backgroundColor}`);
    const borderColor = chartDataArray.map((cd) =>
        cd.borderColor ? `#${cd.borderColor}` : 'rgba(255, 255, 255)',
    ); // defaut border color
    return { labels, data, backgroundColor, borderColor };
}
