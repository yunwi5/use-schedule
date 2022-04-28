import { CalendarItemType } from "./calendar-models/CalendarItemType";
import { Importance, Status } from "./task-models/Status";

export interface StatusFilter {
    [Status.OPEN]: boolean;
    [Status.IN_PROGRESS]: boolean;
    [Status.COMPLETED]: boolean;
    [Status.OVERDUE]: boolean;
    [Status.CANCELLED]: boolean;
}

export interface ImportanceFilter {
    [Importance.CRUCIAL]: boolean;
    [Importance.IMPORTANT]: boolean;
    [Importance.NICE_TO_HAVE]: boolean;
    [Importance.TRIVIAL]: boolean;
    [Importance.EXTRA]: boolean;
}

export interface ItemTypeFilter {
    [CalendarItemType.EVENT]: boolean;
    [CalendarItemType.TASK]: boolean;
    [CalendarItemType.TODO]: boolean;
}

export interface CalendarFilter {
    statusFilter: StatusFilter;
    importanceFilter: ImportanceFilter;
    itemTypeFilter: ItemTypeFilter;
}
