import { FrequencyMap, generateLineChartData } from '../../utilities/analysis-utils';
import { generateRecentWeeksFrequencyMap } from '../../utilities/analysis-utils/trend-data';
import { dateIsBetween } from '../../utilities/date-utils/date-check';
import { addWeeks } from '../../utilities/date-utils/date-control';
import { getWeekEnding } from '../../utilities/date-utils/date-get';
import { getMonthName } from '../../utilities/date-utils/month-util';
import { filterItemsOnStatus } from '../../utilities/filter-utils/status-filter';
import { PlannerMode } from '../planner-models/PlannerMode';
import { Status } from '../task-models/Status';
import { AbstractAnalyzer } from './AbstractAnalyzer';
import { AnalysisItem } from './AnalysisItem';
import { AnalysisMode, ChartData } from './helper-models';

function getWeekBeginningLabel(date: Date): string {
    const month = getMonthName(date);
    return `${date.getDate()} ${month}`;
}

export class WeeklyAnalyzer extends AbstractAnalyzer {
    previousBeginningPeriod: Date;
    plannerMode: PlannerMode = PlannerMode.WEEKLY;

    constructor(beginningPeriod: Date, analysisMode: AnalysisMode = AnalysisMode.ALL) {
        super(beginningPeriod, analysisMode);
        const lastWeekBeginning = addWeeks(beginningPeriod, -1);
        this.previousBeginningPeriod = lastWeekBeginning;
    }

    addItem(item: AnalysisItem): void {
        const currentWeekEnding = getWeekEnding(this.currentBeginningPeriod);
        const previousWeekEnding = getWeekEnding(this.previousBeginningPeriod);

        if (dateIsBetween(item.dateTime, this.currentBeginningPeriod, currentWeekEnding)) {
            // Task dateTime is this Week
            this.currentPeriodItems.push(item);
        } else if (dateIsBetween(item.dateTime, this.previousBeginningPeriod, previousWeekEnding)) {
            // Task dateTIme is previous week
            this.previousPeriodItems.push(item);
        }
        this.allItems.push(item);
    }

    generateRecentPeriodCountData(numPeriod: number = 5, statusFilter?: Status): ChartData[] {
        let filteredItems = filterItemsOnStatus(this.allItems, statusFilter) as AnalysisItem[];

        // This method generates data based on this.allTasks.
        const recentTrendMap: FrequencyMap = generateRecentWeeksFrequencyMap(
            filteredItems,
            this.currentBeginningPeriod,
            numPeriod,
            false,
        );
        const trendChartData: ChartData[] = generateLineChartData(
            recentTrendMap,
            getWeekBeginningLabel,
            'rgba(224, 242, 254, .7)', // light blue
            'rgb(14, 165, 233)', // blue
        );
        // console.table(trendChartData);
        return trendChartData.reverse();
    }

    // Trend based on total hours.
    generateRecentPeriodDurationData(numPeriod: number, statusFilter?: string): ChartData[] {
        // optional filter
        let filteredItems = filterItemsOnStatus(this.allItems, statusFilter) as AnalysisItem[];

        const recentTrendMap: FrequencyMap = generateRecentWeeksFrequencyMap(
            filteredItems,
            this.currentBeginningPeriod,
            numPeriod,
            true,
        );

        const trendChartData: ChartData[] = generateLineChartData(
            recentTrendMap,
            getWeekBeginningLabel,
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
