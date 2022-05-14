import { getMonthMember } from '../../models/date-models/Month';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { getWeekEnding } from '../date-utils/date-get';
import { getMonthName } from '../date-utils/month-util';

export function getRankingSuffixed(num: number, suffixFontSize: string = '10px') {
    const numToSuffix = Math.round(num); // only integer value

    const smallFontSize = {
        fontSize: suffixFontSize,
    };

    if (numToSuffix === 1)
        return (
            <span>
                1<small style={smallFontSize}>st</small>
            </span>
        );
    if (numToSuffix === 2)
        return (
            <span>
                2<small style={smallFontSize}>nd</small>
            </span>
        );
    if (numToSuffix === 3)
        return (
            <span>
                3<small style={smallFontSize}>rd</small>
            </span>
        );
    return (
        <span>
            {numToSuffix}
            <small style={smallFontSize}>th</small>
        </span>
    );
}

export function getDaySuffixed(date: Date): JSX.Element {
    const day = date.getDate();
    return getRankingSuffixed(day);
}

function getPeriodFormat(beginningPeriod: Date, endingPeriod: Date): string {
    const beginDate = beginningPeriod.getDate();
    const beginMonth = getMonthName(beginningPeriod);
    const endDate = endingPeriod.getDate();
    const endMonth = getMonthName(endingPeriod);
    return `${beginDate} ${beginMonth} ~ ${endDate} ${endMonth}`;
}

// Needs to be fixed
export function getNavigationPeriod(
    beginningPeriod: Date,
    plannerMode: PlannerMode | null,
): string | JSX.Element {
    let navPeriod: string | JSX.Element = '';
    if (plannerMode === PlannerMode.WEEKLY) {
        const weekEnding = getWeekEnding(beginningPeriod);
        navPeriod = getPeriodFormat(beginningPeriod, weekEnding);
    } else if (plannerMode === PlannerMode.MONTLY) {
        const year = beginningPeriod.getFullYear();
        const month = getMonthMember(beginningPeriod);
        navPeriod = (
            <>
                <span className="text-gray-600 text-[110%]">{month}</span> ({year})
            </>
        );
    } else if (plannerMode === PlannerMode.YEARLY) {
        navPeriod = '' + beginningPeriod.getFullYear();
    }
    // else throw new Error("Planner mode matches noting from TableNav");
    return navPeriod;
}
