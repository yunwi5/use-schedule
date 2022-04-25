export enum CalendarItemType {
    TASK = "Task",
    Event = "Event",
    TODO = "List Item",
}

export const CalendarItemTypeList = [
    CalendarItemType.Event,
    CalendarItemType.TASK,
    CalendarItemType.TODO,
];

export function isCalendarItemType(str: string) {
    const calendarItemTypes: string[] = CalendarItemTypeList;
    return calendarItemTypes.includes(str);
}
