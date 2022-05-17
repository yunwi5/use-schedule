import { getCurrentYearBeginning } from './date-get';

export function getYearList() {
    const currentYear = getCurrentYearBeginning().getFullYear();
    let yearList: number[] = [];
    for (let i = -3; i < 5; i++) {
        yearList.push(currentYear - i);
    }
    return yearList;
}
