import { AbstractAnalyzer } from '../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisMode, ChartData } from '../../models/analyzer-models/helper-models';
import { MontlyAnalyzer } from '../../models/analyzer-models/MontlyAnalyzer';
import { WeeklyAnalyzer } from '../../models/analyzer-models/WeeklyAnalyzer';
import { YearlyAnalyzer } from '../../models/analyzer-models/YearlyAnalyzer';
import { IEvent } from '../../models/Event';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import {
    getSubCategoryBackgroundColorPallets,
    getSubCategoryBorderColorPallets,
} from '../gen-utils/color-util';

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
    bgColorFnCallback?: (name: string) => string,
    borderColorFnCallback?: (name: string) => string,
): ChartData[] {
    const chartDataList: ChartData[] = Object.entries(freqMap).map(([cat, freq]) => {
        const data: ChartData = {
            label: cat,
            value: freq,
            backgroundColor: bgColorFnCallback ? bgColorFnCallback(cat) : 'aaaaaabd', // default colors can be given
            borderColor: borderColorFnCallback ? borderColorFnCallback(cat) : '555555',
        };
        return data;
    });
    return chartDataList;
}

// Subcategory chart data is different from others
// because subcategory does not have particular bg color and border color associated to each one
// therefore, color pallets (rainbow based) are generated for every subcategory list
export function generateSubCategoryChartData(
    subCategoryMap: FrequencyMap,
    subCategoryList: string[],
) {
    let subCategoryChartData: ChartData[] = generateChartData(subCategoryMap);
    const backgroundColors = getSubCategoryBackgroundColorPallets(subCategoryList);
    const borderColors = getSubCategoryBorderColorPallets(subCategoryList);
    return subCategoryChartData.map((scData, idx) => ({
        ...scData,
        backgroundColor: backgroundColors[idx],
        borderColor: borderColors[idx],
    }));
}

export function generateLineChartData(
    recentTrendMap: FrequencyMap,
    labelCallback: (date: Date) => string,
    backgroundColor?: string,
    borderColor?: string,
): ChartData[] {
    const trendChartData: ChartData[] = Object.entries(recentTrendMap).map(([timeLine, freq]) => {
        const data: ChartData = {
            label: labelCallback(new Date(timeLine)),
            value: freq,
            backgroundColor: backgroundColor ?? '',
            borderColor: borderColor,
        };
        return data;
    });
    return trendChartData;
}

// Data analysis link with initial starting date
export function getDataAnalysisLink(plannerMode: PlannerMode | null, beginningPeriod: Date) {
    const dateStr = beginningPeriod.toDateString();
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
            return `/task-planner/weekly-planner/analysis?start_date=${dateStr}`;
        case PlannerMode.MONTLY:
            return `/task-planner/montly-planner/analysis?start_date=${dateStr}`;
        case PlannerMode.YEARLY:
            return `/task-planner/yearly-planner/analysis?start_date=${dateStr}`;
        default:
            return `/task-planner/weekly-planner/analysis?start_date=${dateStr}`;
    }
}

export function populateAnalyzer(
    plannerMode: PlannerMode,
    analysisMode: AnalysisMode,
    currentPeriod: Date,
    tasks: AbstractTask[],
    events: IEvent[],
) {
    let analyzer: AbstractAnalyzer;
    if (plannerMode === PlannerMode.WEEKLY) {
        analyzer = new WeeklyAnalyzer(currentPeriod, analysisMode);
    } else if (plannerMode === PlannerMode.MONTLY) {
        analyzer = new MontlyAnalyzer(currentPeriod, analysisMode);
    } else {
        analyzer = new YearlyAnalyzer(currentPeriod, analysisMode);
    }
    if (analysisMode === AnalysisMode.EVENTS || analysisMode === AnalysisMode.ALL) {
        for (const event of events) analyzer.addItem(event);
    }
    if (analysisMode === AnalysisMode.TASKS || analysisMode === AnalysisMode.ALL) {
        for (const task of tasks) analyzer.addItem(task);
    }
    return analyzer;
}
