export enum DayPeriod {
    AM = 'AM',
    PM = 'PM',
}

export const DayPeriodList = [DayPeriod.AM, DayPeriod.PM];

export function getDayPeriod(date: Date): DayPeriod {
    if (date.getHours() < 12) {
        return DayPeriod.AM;
    }
    return DayPeriod.PM;
}
