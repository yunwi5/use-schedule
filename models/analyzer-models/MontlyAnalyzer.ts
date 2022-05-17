import { AbstractAnalyzer } from './AbstractAnalyzer';
import { FrequencyMap, generateLineChartData } from '../../utilities/analysis-utils';
import { generateRecentMonthsFrequencyMap } from '../../utilities/analysis-utils/trend-data';
import { dateIsBetween } from '../../utilities/date-utils/date-check';
import { addMonths } from '../../utilities/date-utils/date-control';
import { getMonthEnding } from '../../utilities/date-utils/date-get';
import { PlannerMode } from '../planner-models/PlannerMode';
import { Status } from '../task-models/Status';
import { AnalysisMode, ChartData } from './helper-models';
import { filterItemsOnStatus } from '../../utilities/filter-utils/status-filter';
import { getMonthMember } from '../date-models/Month';
import { AnalysisItem } from './AnalysisItem';

const getMonthBeginningLabel = (date: Date) => `${getMonthMember(date)}`;

export class MontlyAnalyzer extends AbstractAnalyzer {
    previousBeginningPeriod: Date;
    plannerMode: PlannerMode = PlannerMode.MONTLY;

    constructor(beginningPeriod: Date, analysisMode: AnalysisMode = AnalysisMode.ALL) {
        super(beginningPeriod, analysisMode);
        const lastMonthBeginning = addMonths(beginningPeriod, -1);
        this.previousBeginningPeriod = lastMonthBeginning;
    }

    addItem(item: AnalysisItem): void {
        const currentMonthEnding = getMonthEnding(this.currentBeginningPeriod);
        const previousMonthEnding = getMonthEnding(this.previousBeginningPeriod);

        if (dateIsBetween(item.dateTime, this.currentBeginningPeriod, currentMonthEnding)) {
            this.currentPeriodItems.push(item);
        } else if (
            dateIsBetween(item.dateTime, this.previousBeginningPeriod, previousMonthEnding)
        ) {
            this.previousPeriodItems.push(item);
        }
        this.allItems.push(item);
    }

    generateRecentPeriodCountData(numPeriod: number = 5, statusFilter?: Status): ChartData[] {
        const filteredItems = filterItemsOnStatus(this.allItems, statusFilter) as AnalysisItem[];

        const recentTrendMap: FrequencyMap = generateRecentMonthsFrequencyMap(
            filteredItems,
            this.currentBeginningPeriod,
            numPeriod,
            false,
        );

        const trendChartData: ChartData[] = generateLineChartData(
            recentTrendMap,
            getMonthBeginningLabel,
        );
        return trendChartData.reverse();
    }

    generateRecentPeriodDurationData(numPeriod: number, statusFilter?: string): ChartData[] {
        const filteredItems = filterItemsOnStatus(this.allItems, statusFilter) as AnalysisItem[];

        const recentTrendMap: FrequencyMap = generateRecentMonthsFrequencyMap(
            filteredItems,
            this.currentBeginningPeriod,
            numPeriod,
            true,
        );
        const trendChartData: ChartData[] = generateLineChartData(
            recentTrendMap,
            getMonthBeginningLabel,
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
