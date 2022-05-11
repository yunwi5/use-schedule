import { FrequencyMap, generateLineChartData } from '../../utilities/analysis-utils';
import { generateRecentWeeksFrequencyMap } from '../../utilities/analysis-utils/trend-data';
import { dateIsBetween } from '../../utilities/date-utils/date-check';
import { addWeeks } from '../../utilities/date-utils/date-control';
import { getWeekEnding } from '../../utilities/date-utils/date-get';
import { getMonthName } from '../../utilities/date-utils/month-util';
import { PlannerMode } from '../planner-models/PlannerMode';
import { isStatus, Status } from '../task-models/Status';
import { PlannerTask } from '../task-models/Task';
import { AbstractAnalyzer } from './AbstractAnalyzer';
import { ChartData } from './helper-models';

function getWeekBeginningLabel(date: Date): string {
    const month = getMonthName(date);
    return `${date.getDate()} ${month}`;
}

export class WeeklyAnalyzer extends AbstractAnalyzer {
    previousBeginningPeriod: Date;
    plannerMode: PlannerMode = PlannerMode.WEEKLY;

    constructor(beginningPeriod: Date) {
        super(beginningPeriod);
        const lastWeekBeginning = addWeeks(beginningPeriod, -1);
        this.previousBeginningPeriod = lastWeekBeginning;
    }

    addTask(task: PlannerTask): void {
        const currentWeekEnding = getWeekEnding(this.currentBeginningPeriod);
        const previousWeekEnding = getWeekEnding(this.previousBeginningPeriod);

        if (
            dateIsBetween(new Date(task.dateTime), this.currentBeginningPeriod, currentWeekEnding)
        ) {
            // Task dateTime is this Week
            this.currentPeriodTasks.push(task);
        } else if (
            dateIsBetween(new Date(task.dateTime), this.previousBeginningPeriod, previousWeekEnding)
        ) {
            // Task dateTIme is previous week
            this.previousPeriodTasks.push(task);
        }
        this.allTasks.push(task);
    }

    // Not implemented yet
    generateRecentPeriodCountData(numPeriod: number = 5, statusFilter?: Status): ChartData[] {
        const validStatus: boolean = isStatus(statusFilter || '');
        // optional filter
        let filteredTasks = validStatus
            ? this.allTasks.filter((t) => t.status === statusFilter)
            : this.allTasks;

        // This method generates data based on this.allTasks.
        const recentTrendMap: FrequencyMap = generateRecentWeeksFrequencyMap(
            filteredTasks,
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
        const validStatus: boolean = isStatus(statusFilter || '');
        // optional filter
        let filteredTasks = validStatus
            ? this.allTasks.filter((t) => t.status === statusFilter)
            : this.allTasks;

        const recentTrendMap: FrequencyMap = generateRecentWeeksFrequencyMap(
            filteredTasks,
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
