import { FrequencyMap, generateChartData } from '../../utilities/analysis-utils';
import { generateRecentWeeksFrequencyMap } from '../../utilities/analysis-utils/trend-data';
import { dateIsBetween } from '../../utilities/date-utils/date-check';
import { addWeeks } from '../../utilities/date-utils/date-control';
import { getWeekEnding } from '../../utilities/date-utils/date-get';
import { getMonthName } from '../../utilities/date-utils/month-util';
import { getRecentTrendBackgroundColor } from '../../utilities/gen-utils/color-util';
import { PlannerMode } from '../planner-models/PlannerMode';
import { PlannerTask } from '../task-models/Task';
import { AbstractAnalyzer } from './AbstractAnalyzer';
import { ChartData, TrendOption } from './helper-models';

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
    generateRecentPeriodData(numPeriod: number = 5, option: TrendOption = TrendOption.TOTAL) {
        // This method generates data based on this.allTasks.
        const recentTrendMap: FrequencyMap = generateRecentWeeksFrequencyMap(
            this.allTasks,
            this.currentBeginningPeriod,
            numPeriod,
        );
        const trendChartData: ChartData[] = Object.entries(recentTrendMap).map(
            ([timeLine, freq]) => {
                const data: ChartData = {
                    label: getWeekBeginningLabel(new Date(timeLine)),
                    value: freq,
                    backgroundColor: getRecentTrendBackgroundColor(),
                };
                return data;
            },
        );
        // console.table(trendChartData);
        return trendChartData;
    }
}

function getWeekBeginningLabel(date: Date): string {
    const month = getMonthName(date);
    return `${date.getDate()} ${month}`;
}
