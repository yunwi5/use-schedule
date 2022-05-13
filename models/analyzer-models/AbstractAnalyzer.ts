import { PlannerMode } from '../planner-models/PlannerMode';
import { AbstractTask } from '../task-models/AbstractTask';
import { AnalysisOption, ChartData } from './helper-models';
import {
    generateStatusMap,
    generateImportanceMap,
    generateCategoryMap,
    generateSubCategoryMap,
} from '../../utilities/analysis-utils/categorical-data';
import {
    getCategoryBackgroundColor,
    getCategoryBorderColor,
    getDayPeriodBackgroundColor,
    getDayPeriodBorderColor,
    getImportanceBackgroundColor,
    getImportanceBorderColor,
    getStatusBackgroundColor,
    getStatusBorderColor,
    getSubCategoryBackgroundColorPallets,
    getSubCategoryBorderColorPallets,
    getWeekDayBackgroundColor,
    getWeekDayBorderColor,
} from '../../utilities/gen-utils/color-util';
import {
    FrequencyMap,
    generateChartData,
    generateSubCategoryChartData,
} from '../../utilities/analysis-utils';
import {
    generateDayPeriodMap,
    generateWeekDayMap,
} from '../../utilities/analysis-utils/periodic-data';
import { Status } from '../task-models/Status';
import { Category, getSubCategory } from '../task-models/Category';

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
    abstract generateRecentPeriodCountData(numPeriod: number, status?: string): ChartData[];
    abstract generateRecentPeriodDurationData(numPeriod: number, status?: string): ChartData[];

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
            getImportanceBorderColor,
        );
        return importanceChartData;
    }

    generateCategoryData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedTasks = this.selectRequestedTasks(option);
        const categoryMap: FrequencyMap = generateCategoryMap(selectedTasks);

        const categoryChartData: ChartData[] = generateChartData(
            categoryMap,
            getCategoryBackgroundColor,
            getCategoryBorderColor,
        );
        return categoryChartData;
    }

    generateSubCategoryData(
        category: Category,
        option: AnalysisOption = AnalysisOption.CURRENT,
    ): ChartData[] {
        const subCategoryList = getSubCategory(category);
        const selectedTasks = this.selectRequestedTasks(option);
        const categoryTasks = selectedTasks.filter((t) => t.category === category);

        const subCategoryMap: FrequencyMap = generateSubCategoryMap(categoryTasks, subCategoryList);
        const subCategoryChartData = generateSubCategoryChartData(subCategoryMap, subCategoryList);
        return subCategoryChartData;
    }

    generateWeekDayData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedTasks = this.selectRequestedTasks(option);
        const weekDayMap: FrequencyMap = generateWeekDayMap(selectedTasks);

        const weekDayChartData: ChartData[] = generateChartData(
            weekDayMap,
            getWeekDayBackgroundColor,
            getWeekDayBorderColor,
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
            getDayPeriodBorderColor,
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
