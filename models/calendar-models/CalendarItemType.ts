export enum CalendarItemType {
    TASK = "Task",
    EVENT = "Event",
    TODO = "List Item",
}

export const CalendarItemTypeList = [
    CalendarItemType.EVENT,
    CalendarItemType.TASK,
    CalendarItemType.TODO,
];

export function isCalendarItemType(str: string) {
    const calendarItemTypes: string[] = CalendarItemTypeList;
    return calendarItemTypes.includes(str);
}
