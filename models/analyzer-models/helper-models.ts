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
    ALL_PLANNERS = 'All Tasks',
    ONLY_CURRENT_PLANNER = 'Current Tasks',
}

export interface ChartData {
    label: string;
    value: number;
    backgroundColor: string;
    borderColor?: string;
}

// Dataset supply for Pie, Doughnut, Polar and Bar charts
export interface FlexChartDataSet {
    titleLabel: string;
    dataLabels: string[];
    data: number;
    backgroundColors: string[];
    borderColors: string[];
}

// Dataset supply for Line chart, where each column has the same bg and border color.
export interface LineChartDataSet {
    titleLabel: string;
    dataLabels: string[];
    data: number;
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
