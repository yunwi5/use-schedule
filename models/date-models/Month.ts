export enum Month {
    JANUARY = 'January',
    FEBRUARY = 'February',
    MARCH = 'March',
    APRIL = 'April',
    MAY = 'May',
    JUNE = 'June',
    JULY = 'July',
    AUGUST = 'August',
    SEPTEMBER = 'September',
    OCTOBER = 'October',
    NOVEMBER = 'November',
    DECEMBER = 'December',
    ANY = 'Any',
}

export const MonthList = [
    Month.JANUARY,
    Month.FEBRUARY,
    Month.MARCH,
    Month.APRIL,
    Month.MAY,
    Month.JUNE,
    Month.JULY,
    Month.AUGUST,
    Month.SEPTEMBER,
    Month.OCTOBER,
    Month.NOVEMBER,
    Month.DECEMBER,
];

export const MonthListWithAny = [
    Month.JANUARY,
    Month.FEBRUARY,
    Month.MARCH,
    Month.APRIL,
    Month.MAY,
    Month.JUNE,
    Month.JULY,
    Month.AUGUST,
    Month.SEPTEMBER,
    Month.OCTOBER,
    Month.NOVEMBER,
    Month.DECEMBER,
    Month.ANY,
];

export function getMonthFromIndex(index: number) {
    if (index < MonthListWithAny.length) return MonthListWithAny[index];
    return Month.ANY;
}

// Needs testing
export function getMonthMember(date: Date | null) {
    if (!date) return Month.ANY;

    const monthNumber = date.getMonth();
    return MonthListWithAny[monthNumber];
}

// number of days of a single month
export function getNumberOfDays(month: Month): number {
    switch (month) {
        case Month.FEBRUARY:
            return 28;
        case Month.JANUARY:
        case Month.MARCH:
        case Month.MAY:
        case Month.JULY:
        case Month.AUGUST:
        case Month.OCTOBER:
        case Month.DECEMBER:
            return 31;
        default:
            return 30;
    }
}

export function getMonthDays(month: Month): number[] {
    const numDays = getNumberOfDays(month);
    const daysArray = [];
    for (let i = 1; i <= numDays; i++) {
        daysArray.push(i);
    }
    return daysArray;
}
