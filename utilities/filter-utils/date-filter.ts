import { dateIsBetween } from '../date-utils/date-check';

interface IDateTime {
    dateTime: Date;
}
export function filterItemsOnInterval(
    items: IDateTime[],
    startDate: Date,
    endDate: Date,
): IDateTime[] {
    return items.filter((item) => dateIsBetween(item.dateTime, startDate, endDate));
}
