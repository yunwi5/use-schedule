import { FrequencyMap } from '.';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { addWeeks } from '../date-utils/date-control';
import { getWeekEnding } from '../date-utils/date-get';

const ONE_WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;

// Further testing could be needed.
function getNumberOfWeeksDiff(currentPeriod: Date, dateToTest: Date) {
    // prevent weird error, where Monday 00:00 is treated as previous week Sunday
    // set every datetime to noon
    dateToTest.setHours(12);

    const weekEnding = getWeekEnding(currentPeriod);
    const timeDiff: number = weekEnding.getTime() - dateToTest.getTime();

    const weeksDiff = Math.floor(timeDiff / ONE_WEEK_IN_MS);
    // If weeksDiff < 0, this means dateToTest is after nextWeek
    // If weekDiff > 0, this means dateToTest is before nextWeek (currentWeek for before)
    return weeksDiff;
}

// Worse solution (but easier) runs O(n * t) time.
// Current solution has
// Time complexity O(n + t), where t is numPeriods and n is numberOfTasks
// Space complexity O(t)
export function generateRecentWeeksFrequencyMap(
    tasks: AbstractTask[],
    currentPeriod: Date,
    numPeriod: number,
    addByDuration?: boolean,
) {
    const recentWeeksList: Date[] = []; // O(t) spcae
    const recentWeeksFreqMap: FrequencyMap = {}; // O(t) space

    // e.g. recent 5 weeks
    // 0 to -4 weeks
    // O(t) time
    for (let i = 0; i < numPeriod; i++) {
        const weekBeginning = addWeeks(currentPeriod, -i);
        recentWeeksFreqMap[weekBeginning.toString()] = 0;
        recentWeeksList.push(weekBeginning);
    }

    // const recentWeeksFrequencyList: Array<{ [key: string]: number }> = [];
    // O(n) time
    tasks.forEach((task) => {
        // O(1) time
        const taskWeekDiff = getNumberOfWeeksDiff(currentPeriod, task.dateTime);
        if (taskWeekDiff < 0) return;
        if (taskWeekDiff >= recentWeeksList.length) return;

        const weekBeginning = recentWeeksList[taskWeekDiff];
        const weekBeginningStr = weekBeginning.toString();
        if (weekBeginningStr in recentWeeksFreqMap)
            recentWeeksFreqMap[weekBeginningStr] += addByDuration ? task.duration : 1;
        else recentWeeksFreqMap[weekBeginningStr] = addByDuration ? task.duration : 1;
    });

    return recentWeeksFreqMap;
}
