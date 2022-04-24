export interface CalendarItem {
    id: string;
    name: string;
    dateTime?: Date;
    duration?: number | null;
    userId: string;
}
