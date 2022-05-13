import { AbstractAnalyzer } from './AbstractAnalyzer';
import {
    FrequencyMap,
    generateChartData,
    generateLineChartData,
} from '../../utilities/analysis-utils';
import {
    generateRecentMonthsFrequencyMap,
    generateRecentYearsFrequencyMap,
} from '../../utilities/analysis-utils/trend-data';
import { dateIsBetween } from '../../utilities/date-utils/date-check';
import { addMonths, addYears } from '../../utilities/date-utils/date-control';
import { getMonthEnding, getYearEnding } from '../../utilities/date-utils/date-get';
import { PlannerMode } from '../planner-models/PlannerMode';
import { Status } from '../task-models/Status';
import { PlannerTask } from '../task-models/Task';
import { AnalysisOption, ChartData } from './helper-models';
import { filterItemsOnStatus } from '../../utilities/filter-utils/status-filter';
import { generateMonthMap } from '../../utilities/analysis-utils/periodic-data';
import { getMonthBackgroundColor, getMonthBorderColor } from '../../utilities/gen-utils/color-util';
import { getMonthMember } from '../date-models/Month';

const getMonthBeginningLabel = (date: Date) => `${getMonthMember(date)}`;

export class MontlyAnalyzer extends AbstractAnalyzer {
    previousBeginningPeriod: Date;
    plannerMode: PlannerMode = PlannerMode.MONTLY;

    constructor(beginningPeriod: Date) {
        super(beginningPeriod);
        const lastMonthBeginning = addMonths(beginningPeriod, -1);
        this.previousBeginningPeriod = lastMonthBeginning;
    }

    addTask(task: PlannerTask): void {
        const currentMonthEnding = getMonthEnding(this.currentBeginningPeriod);
        const previousMonthEnding = getMonthEnding(this.previousBeginningPeriod);

        if (dateIsBetween(task.dateTime, this.currentBeginningPeriod, currentMonthEnding)) {
            this.currentPeriodTasks.push(task);
        } else if (
            dateIsBetween(task.dateTime, this.previousBeginningPeriod, previousMonthEnding)
        ) {
            this.previousPeriodTasks.push(task);
        }
        this.allTasks.push(task);
    }

    generateRecentPeriodCountData(numPeriod: number = 5, statusFilter?: Status): ChartData[] {
        const filteredTasks = filterItemsOnStatus(this.allTasks, statusFilter);

        const recentTrendMap: FrequencyMap = generateRecentMonthsFrequencyMap(
            filteredTasks,
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
        const filteredTasks = filterItemsOnStatus(this.allTasks, statusFilter);

        const recentTrendMap: FrequencyMap = generateRecentMonthsFrequencyMap(
            filteredTasks,
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
