import { FrequencyMap } from '.';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { addWeeks, addYears } from '../date-utils/date-control';
import { getWeekEnding, getYearEnding } from '../date-utils/date-get';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const ONE_WEEK_IN_MS = ONE_DAY_IN_MS * 7;
const ONE_YEAR_IN_MS = ONE_DAY_IN_MS * 365; // 1 year always 365 days??

// Further testing could be needed.
function getNumberOfWeeksDiff(currentPeriod: Date, dateToTest: Date) {
    // prevent weird error, where Monday 00:00 is treated as previous week Sunday
    // set every datetime to noon
    dateToTest.setHours(12);

    const weekEnding = getWeekEnding(currentPeriod);
    const timeDiff: number = weekEnding.getTime() - dateToTest.getTime();

    const weeksDiff = Math.floor(timeDiff / ONE_WEEK_IN_MS); // integer form
    // If weeksDiff < 0, this means dateToTest is after week ending
    // If weekDiff > 0, this means dateToTest is before week ending (currentWeek for before)
    return weeksDiff;
}

function getNumberOfYearsDiff(currentPeriod: Date, dateToTest: Date) {
    dateToTest.setHours(12);

    const yearEnding = getYearEnding(currentPeriod);
    const timeDiff: number = yearEnding.getTime() - dateToTest.getTime();
    // If dateToTest is after than yearEnding, it would be negative

    const yearsDiff = Math.floor(timeDiff / ONE_YEAR_IN_MS); // integer form
    // If yearsDiff < 0, this means dateToTest is after the yaer ending.
    // If yearsDiff > 0, this means dateToTest is before year ending (current year or previous years)
    return yearsDiff;
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
        recentWeeksList.push(weekBeginning);
        recentWeeksFreqMap[weekBeginning.toString()] = 0;
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

export function generateRecentYearsFrequencyMap(
    tasks: AbstractTask[],
    currentPeriod: Date,
    numPeriod: number,
    addByDuration?: boolean,
) {
    const recentYearsList: Date[] = []; // O(t) spcae
    const recentYearsFreqMap: FrequencyMap = {}; // O(t) space

    // e.g. recent 5 years
    // 0 to -4 years
    // O(t) time
    for (let i = 0; i < numPeriod; i++) {
        const yearBeginning = addYears(currentPeriod, -i);
        recentYearsList.push(yearBeginning);
        recentYearsFreqMap[yearBeginning.toString()] = 0;
    }

    // const recentWeeksFrequencyList: Array<{ [key: string]: number }> = [];
    // O(n) time
    tasks.forEach((task) => {
        // O(1) time
        const taskWeekDiff = getNumberOfYearsDiff(currentPeriod, task.dateTime);
        if (taskWeekDiff < 0) return;
        if (taskWeekDiff >= recentYearsList.length) return;

        const yearBeginning = recentYearsList[taskWeekDiff];
        const yearBeginningStr = yearBeginning.toString();
        if (yearBeginningStr in recentYearsFreqMap)
            recentYearsFreqMap[yearBeginningStr] += addByDuration ? task.duration : 1;
        else recentYearsFreqMap[yearBeginningStr] = addByDuration ? task.duration : 1;
    });

    return recentYearsFreqMap;
}
