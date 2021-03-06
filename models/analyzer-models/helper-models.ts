export enum TrendOption {
    TOTAL = 'total',
    COMPLETED = 'completed',
}

// Current period, previous period, or all periods
export enum AnalysisOption {
    CURRENT = 'current',
    PREVIOUS = 'previous',
    ALL = 'all',
}

export enum AnalysisMode {
    TASKS = 'Tasks',
    EVENTS = 'Events',
    ALL = 'All',
}

export const AnalysisModeList = [AnalysisMode.ALL, AnalysisMode.EVENTS, AnalysisMode.TASKS];

export enum ProgressMode {
    WEEK = 'Week',
    MONTH = 'Month',
    YEAR = 'Year',
}

export const ProgressModeList = [ProgressMode.WEEK, ProgressMode.MONTH, ProgressMode.YEAR];

export interface ChartData {
    label: string;
    value: number;
    backgroundColor: string;
    borderColor?: string;
}

export interface DataSet {
    label: string;
    data: ChartData[];
}

export interface TrendDataSet {
    label: string;
    data: ChartData[];
    backgroundColor: string;
    borderColor: string;
}

export enum RecentPeriod {
    FIVE = 5,
    TEN = 10,
    FIFTEEN = 15,
    TWENTY = 20,
}

export const RecentPeriodList = [
    RecentPeriod.FIVE,
    RecentPeriod.TEN,
    RecentPeriod.FIFTEEN,
    RecentPeriod.TWENTY,
];

export enum FlexChartType {
    BAR = 'Bar',
    PIE = 'Pie',
    DOUGHNUT = 'Doughnut',
    POLAR_AREA = 'Polar Area',
}

export const FlexChartTypeList = [
    FlexChartType.BAR,
    FlexChartType.DOUGHNUT,
    FlexChartType.PIE,
    FlexChartType.POLAR_AREA,
];

export enum ComparisonChartType {
    BAR = 'Bar',
    RADAR = 'Radar',
}

export const ComparisonChartTypeList = Object.freeze([
    ComparisonChartType.BAR,
    ComparisonChartType.RADAR,
]);
