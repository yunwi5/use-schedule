import { PlannerMode } from '../planner-models/PlannerMode';
import { AbstractTask } from '../task-models/AbstractTask';
import { AnalysisMode, AnalysisOption, ChartData } from './helper-models';
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
import { Category, getSubCategory } from '../task-models/Category';
import { AnalysisItem } from './AnalysisItem';

export abstract class AbstractAnalyzer {
    abstract previousBeginningPeriod: Date;
    currentBeginningPeriod: Date;

    abstract plannerMode: PlannerMode;

    allItems: AnalysisItem[] = [];
    previousPeriodItems: AnalysisItem[] = [];
    currentPeriodItems: AnalysisItem[] = [];

    constructor(beginningPeriod: Date) {
        this.currentBeginningPeriod = beginningPeriod;
    }

    // Abstract methods
    // abstract addTask(task: AbstractTask): void;
    // abstract addEvent(event: IEvent): void;
    abstract addItem(item: AnalysisItem): void;

    // For weekly, montly or yearly trend analysis (i.e. recent 5 weeks trend data)
    abstract generateRecentPeriodCountData(
        numPeriod: number,
        status?: string,
        analysisMode?: AnalysisMode,
    ): ChartData[];
    abstract generateRecentPeriodDurationData(
        numPeriod: number,
        status?: string,
        analysisMode?: AnalysisMode,
    ): ChartData[];

    // 5 implemented methods
    // 3 categorical data (status, importance, category)
    generateStatusData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedItems = this.selectRequestedItems(option);
        const statusMap: FrequencyMap = generateStatusMap(selectedItems);

        const statusChartData: ChartData[] = generateChartData(
            statusMap,
            getStatusBackgroundColor,
            getStatusBorderColor,
        );
        return statusChartData;
    }

    generateImportanceData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedItems = this.selectRequestedItems(option);
        const importanceMap: FrequencyMap = generateImportanceMap(selectedItems);

        const importanceChartData: ChartData[] = generateChartData(
            importanceMap,
            getImportanceBackgroundColor,
            getImportanceBorderColor,
        );
        return importanceChartData;
    }

    generateCategoryData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedItems = this.selectRequestedItems(option);
        const categoryItems = selectedItems.filter((item) => !!item.category);
        const categoryMap: FrequencyMap = generateCategoryMap(categoryItems);

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

        const selectedItems = this.selectRequestedItems(option);
        const categoryItems = selectedItems.filter(
            (item) => item.category === category && !!item.subCategory,
        );

        const subCategoryMap: FrequencyMap = generateSubCategoryMap(categoryItems, subCategoryList);
        const subCategoryChartData = generateSubCategoryChartData(subCategoryMap, subCategoryList);
        return subCategoryChartData;
    }

    generateWeekDayData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedItems = this.selectRequestedItems(option);
        const weekDayMap: FrequencyMap = generateWeekDayMap(selectedItems);

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
        const selectedItems = this.selectRequestedItems(option);
        const dayPeriodMap: FrequencyMap = generateDayPeriodMap(selectedItems);

        const dayPeriodChartData: ChartData[] = generateChartData(
            dayPeriodMap,
            getDayPeriodBackgroundColor,
            getDayPeriodBorderColor,
        );
        return dayPeriodChartData;
    }

    selectRequestedItems(analysisOption: AnalysisOption): AnalysisItem[] {
        switch (analysisOption) {
            case AnalysisOption.ALL:
                return this.allItems;
            case AnalysisOption.CURRENT:
                return this.currentPeriodItems;
            case AnalysisOption.PREVIOUS:
                return this.previousPeriodItems;
            default:
                return this.allItems;
        }
    }
}
