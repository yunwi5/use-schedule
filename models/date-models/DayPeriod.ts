import { isInvalidDate } from '../../utilities/date-utils/date-check';

export enum DayPeriod {
    AM = 'AM',
    PM = 'PM',
}

export const DayPeriodList = [DayPeriod.AM, DayPeriod.PM];

export function getDayPeriod(date: Date): DayPeriod {
    if (date == null || isInvalidDate(date)) {
        console.log('Date is invalid:', date);
        return DayPeriod.AM;
    }
    return date.getHours() < 12 ? DayPeriod.AM : DayPeriod.PM;
}
