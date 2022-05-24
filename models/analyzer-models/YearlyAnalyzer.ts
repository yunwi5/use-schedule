import { AbstractAnalyzer } from './AbstractAnalyzer';
import {
    FrequencyMap,
    generateChartData,
    generateLineChartData,
} from '../../utilities/analysis-utils';
import { generateRecentYearsFrequencyMap } from '../../utilities/analysis-utils/trend-data';
import { dateIsBetween } from '../../utilities/date-utils/date-check';
import { addYears } from '../../utilities/date-utils/date-control';
import { getYearEnding } from '../../utilities/date-utils/date-get';
import { PlannerMode } from '../planner-models/PlannerMode';
import { Status } from '../task-models/Status';
import { PlannerTask } from '../task-models/Task';
import { AnalysisMode, AnalysisOption, ChartData } from './helper-models';
import { filterItemsOnStatus } from '../../utilities/filter-utils/status-filter';
import { generateMonthMap } from '../../utilities/analysis-utils/periodic-data';
import { getMonthBackgroundColor, getMonthBorderColor } from '../../utilities/gen-utils/color-util';
import { IEvent } from '../Event';
import { AnalysisItem } from './AnalysisItem';

const getYearBeginningLabel = (date: Date) => '' + date.getFullYear();

export class YearlyAnalyzer extends AbstractAnalyzer {
    previousBeginningPeriod: Date;
    plannerMode: PlannerMode = PlannerMode.YEARLY;

    constructor(beginningPeriod: Date) {
        super(beginningPeriod);
        const lastYearBeginning = addYears(beginningPeriod, -1);
        this.previousBeginningPeriod = lastYearBeginning;
    }

    addItem(item: AnalysisItem): void {
        const currentYearEnding = getYearEnding(this.currentBeginningPeriod);
        const previousYearEnding = getYearEnding(this.previousBeginningPeriod);

        if (
            dateIsBetween(new Date(item.dateTime), this.currentBeginningPeriod, currentYearEnding)
        ) {
            this.currentPeriodItems.push(item);
        } else if (
            dateIsBetween(new Date(item.dateTime), this.previousBeginningPeriod, previousYearEnding)
        ) {
            this.previousPeriodItems.push(item);
        }
        this.allItems.push(item);
    }

    generateMonthData(option: AnalysisOption = AnalysisOption.CURRENT): ChartData[] {
        const selectedItems = this.selectRequestedItems(option);
        const monthMap: FrequencyMap = generateMonthMap(selectedItems);

        const monthChartDataArray = generateChartData(
            monthMap,
            getMonthBackgroundColor,
            getMonthBorderColor,
        );
        return monthChartDataArray;
    }

    generateRecentPeriodCountData(numPeriod: number = 5, statusFilter?: Status): ChartData[] {
        const filteredItems = filterItemsOnStatus(this.allItems, statusFilter) as AnalysisItem[];

        const recentTrendMap: FrequencyMap = generateRecentYearsFrequencyMap(
            filteredItems,
            this.currentBeginningPeriod,
            numPeriod,
            false,
        );

        const trendChartData: ChartData[] = generateLineChartData(
            recentTrendMap,
            getYearBeginningLabel,
        );
        return trendChartData.reverse();
    }

    generateRecentPeriodDurationData(numPeriod: number, statusFilter?: string): ChartData[] {
        const filteredItems = filterItemsOnStatus(this.allItems, statusFilter) as AnalysisItem[];

        const recentTrendMap: FrequencyMap = generateRecentYearsFrequencyMap(
            filteredItems,
            this.currentBeginningPeriod,
            numPeriod,
            true,
        );

        const trendChartData: ChartData[] = generateLineChartData(
            recentTrendMap,
            getYearBeginningLabel,
            'rgba(219, 234, 254, .7)', // light blue
            'rgb(59, 130, 246)', // blue
        );
        trendChartData.forEach((data) => {
            const totalHours = Math.round(data.value / 60);
            data.value = totalHours;
        });
        return trendChartData.reverse();
    }
}
