import { PlannerMode } from '../planner-models/PlannerMode';
import { AbstractTask } from '../task-models/AbstractTask';
import {
    TrendOption,
    AnalysisOption,
    AnalysisMode,
    ChartData,
    FlexChartDataSet,
    LineChartDataSet,
} from './helper-models';
import {
    generateStatusMap,
    generateImportanceMap,
    generateCategoryMap,
} from '../../utilities/analysis-utils/categorical-data';
import {
    getCategoryBackgroundColor,
    getDayPeriodBackgroundColor,
    getImportanceBackgroundColor,
    getStatusBackgroundColor,
    getStatusBorderColor,
    getWeekDayBackgroundColor,
} from '../../utilities/gen-utils/color-util';
import { FrequencyMap, generateChartData } from '../../utilities/analysis-utils';
import {
    generateDayPeriodMap,
    generateWeekDayMap,
} from '../../utilities/analysis-utils/periodic-data';

export abstract class AbstractAnalyzer {
    abstract previousBeginningPeriod: Date;
    currentBeginningPeriod: Date;

    abstract plannerMode: PlannerMode;
    allTasks: AbstractTask[] = [];
    previousPeriodTasks: AbstractTask[] = [];
    currentPeriodTasks: AbstractTask[] = [];

    constructor(beginningPeriod: Date) {
        this.currentBeginningPeriod = beginningPeriod;
    }

    // Two abstract methods
    abstract addTask(task: AbstractTask): void;

    // For weekly, montly or yearly trend analysis (i.e. recent 5 weeks trend data)
    abstract generateRecentPeriodData(numPeriod: number, option: TrendOption): ChartData[];

    //TODO: 5 implemented methods
    //TODO: 3 categorical data (status, importance, category)
    generateStatusData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedTasks = this.selectRequestedTasks(option);
        const statusMap: FrequencyMap = generateStatusMap(selectedTasks);

        const statusChartData: ChartData[] = generateChartData(
            statusMap,
            getStatusBackgroundColor,
            getStatusBorderColor,
        );
        return statusChartData;
    }

    generateImportanceData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedTasks = this.selectRequestedTasks(option);
        const importanceMap: FrequencyMap = generateImportanceMap(selectedTasks);

        const importanceChartData: ChartData[] = generateChartData(
            importanceMap,
            getImportanceBackgroundColor,
        );
        return importanceChartData;
    }

    generateCategoryData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedTasks = this.selectRequestedTasks(option);
        const categoryMap: FrequencyMap = generateCategoryMap(selectedTasks);

        const categoryChartData: ChartData[] = generateChartData(
            categoryMap,
            getCategoryBackgroundColor,
        );
        return categoryChartData;
    }

    //TODO: 2 day periodical data (weekday, day period)
    generateWeekDayData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedTasks = this.selectRequestedTasks(option);
        const weekDayMap: FrequencyMap = generateWeekDayMap(selectedTasks);

        const weekDayChartData: ChartData[] = generateChartData(
            weekDayMap,
            getWeekDayBackgroundColor,
        );
        // Generate map for {[WeekDay]: number} - frequency map
        // Convert the WeekDay frequency map to ChartData[] array
        return weekDayChartData;
    }

    generateDayPeriodData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedTasks = this.selectRequestedTasks(option);
        const dayPeriodMap: FrequencyMap = generateDayPeriodMap(selectedTasks);

        const dayPeriodChartData: ChartData[] = generateChartData(
            dayPeriodMap,
            getDayPeriodBackgroundColor,
        );
        return dayPeriodChartData;
    }

    // utility method for selecting requested tasks (3 options)
    selectRequestedTasks(analysisOption: AnalysisOption): AbstractTask[] {
        switch (analysisOption) {
            case AnalysisOption.ALL:
                return this.allTasks;
            case AnalysisOption.CURRENT:
                return this.currentPeriodTasks;
            case AnalysisOption.PREVIOUS:
                return this.previousPeriodTasks;
            default:
                return this.currentPeriodTasks;
        }
    }
}
