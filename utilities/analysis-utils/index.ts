import { ChartData } from '../../models/analyzer-models/helper-models';

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
