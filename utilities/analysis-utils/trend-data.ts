import { FrequencyMap } from '.';
import { addMonths, addWeeks, addYears } from '../date-utils/date-control';
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

function getNumberOfMonthsDiff(currentPeriod: Date, dateToTest: Date) {
    dateToTest.setHours(12);

    // e.g. currentPeriod: 2022 May, dateToTest: 2021 March
    const yearsDiff = currentPeriod.getFullYear() - dateToTest.getFullYear(); // e.g. 2022 - 2021 = 1 (year)
    const monthDiff = currentPeriod.getMonth() - dateToTest.getMonth(); // e.g. May - March = 2 (month)
    const totalMonthDiff = yearsDiff * 12 + monthDiff; //  total month diff in across multiple years
    return totalMonthDiff;
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

interface ITrendItem {
    dateTime: Date;
    duration: number;
}

// Worse solution (but easier) runs O(n * t) time.
// Current solution has
// Time complexity O(n + t), where t is numPeriods and n is numberOfitems
// Space complexity O(t)
export function generateRecentWeeksFrequencyMap(
    items: ITrendItem[],
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
    items.forEach((item) => {
        // O(1) time
        const itemWeekDiff = getNumberOfWeeksDiff(currentPeriod, item.dateTime);
        if (itemWeekDiff < 0) return;
        if (itemWeekDiff >= recentWeeksList.length) return;

        const weekBeginning = recentWeeksList[itemWeekDiff];
        const weekBeginningStr = weekBeginning.toString();
        if (weekBeginningStr in recentWeeksFreqMap)
            recentWeeksFreqMap[weekBeginningStr] += addByDuration ? item.duration : 1;
        else recentWeeksFreqMap[weekBeginningStr] = addByDuration ? item.duration : 1;
    });

    return recentWeeksFreqMap;
}

export function generateRecentMonthsFrequencyMap(
    items: ITrendItem[],
    currentPeriod: Date,
    numPeriod: number,
    addByDuration?: boolean,
) {
    const recentMonthsList: Date[] = []; // O(t) spcae
    const recentMonthsFreqMap: FrequencyMap = {}; // O(t) space

    // e.g. recent 5 months
    // 0 to -4 months
    // O(t) time
    for (let i = 0; i < numPeriod; i++) {
        const monthBeginning = addMonths(currentPeriod, -i);
        recentMonthsList.push(monthBeginning);
        recentMonthsFreqMap[monthBeginning.toString()] = 0;
    }

    // O(n) time
    items.forEach((item) => {
        // O(1) time
        const itemMonthDiff = getNumberOfMonthsDiff(currentPeriod, item.dateTime);
        if (itemMonthDiff < 0) return;
        if (itemMonthDiff >= recentMonthsList.length) return;

        const monthBeginning = recentMonthsList[itemMonthDiff];
        const monthBeginningStr = monthBeginning.toString();
        if (monthBeginningStr in recentMonthsFreqMap)
            recentMonthsFreqMap[monthBeginningStr] += addByDuration ? item.duration : 1;
        else recentMonthsFreqMap[monthBeginningStr] = addByDuration ? item.duration : 1;
    });

    return recentMonthsFreqMap;
}

export function generateRecentYearsFrequencyMap(
    items: ITrendItem[],
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

    // O(n) time
    items.forEach((item) => {
        // O(1) time
        const itemYearDiff = getNumberOfYearsDiff(currentPeriod, item.dateTime);
        if (itemYearDiff < 0) return;
        if (itemYearDiff >= recentYearsList.length) return;

        const yearBeginning = recentYearsList[itemYearDiff];
        const yearBeginningStr = yearBeginning.toString();
        if (yearBeginningStr in recentYearsFreqMap)
            recentYearsFreqMap[yearBeginningStr] += addByDuration ? item.duration : 1;
        else recentYearsFreqMap[yearBeginningStr] = addByDuration ? item.duration : 1;
    });

    return recentYearsFreqMap;
}
