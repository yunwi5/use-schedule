import { ChartData } from '../../models/analyzer-models/helper-models';
import { getRecentTrendBackgroundColor } from '../gen-utils/color-util';

export interface FrequencyMap {
    [key: string]: number;
}

export function getInitialFrequencyMap(list: string[]) {
    const initialMap: FrequencyMap = {};
    list.forEach((item) => (initialMap[item] = 0));
    return initialMap;
}

export function generateChartData(
    freqMap: FrequencyMap,
    bgColorFnCallback: (name: string) => string,
    borderColorFnCallback?: (name: string) => string,
): ChartData[] {
    const chartDataList: ChartData[] = Object.entries(freqMap).map(([cat, freq]) => {
        const data: ChartData = {
            label: cat,
            value: freq,
            backgroundColor: bgColorFnCallback(cat),
        };
        if (borderColorFnCallback) data.borderColor = borderColorFnCallback(cat);
        return data;
    });
    return chartDataList;
}

export function generateLineChartData(
    recentTrendMap: FrequencyMap,
    labelCallback: (date: Date) => string,
): ChartData[] {
    const trendChartData: ChartData[] = Object.entries(recentTrendMap).map(([timeLine, freq]) => {
        const data: ChartData = {
            label: labelCallback(new Date(timeLine)),
            value: freq,
            backgroundColor: getRecentTrendBackgroundColor(),
        };
        return data;
    });
    return trendChartData;
}
