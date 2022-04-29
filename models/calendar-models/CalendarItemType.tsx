import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBallotCheck, faCalendarStar, faSquareCheck } from "@fortawesome/pro-duotone-svg-icons";

export enum CalendarItemType {
    TASK = "Task",
    EVENT = "Event",
    TODO = "TodoList",
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

export function getItemTextColorClass(itemType: CalendarItemType) {
    if (itemType === CalendarItemType.EVENT) {
        return "text-sky-600/75";
    } else if (itemType === CalendarItemType.TASK) {
        return "text-blue-600/75";
    } else if (itemType === CalendarItemType.TODO) {
        return "text-indigo-500/75";
    }
}

export function getItemIcon(itemType: CalendarItemType) {
    const iconClass = "mr-2 max-w-[1.8rem] max-h-[1.8rem] !text-2xl inline-block shadow-md";
    if (itemType === CalendarItemType.EVENT) {
        return <FontAwesomeIcon icon={faCalendarStar} className={`${iconClass}`} />;
    } else if (itemType === CalendarItemType.TASK) {
        return <FontAwesomeIcon icon={faBallotCheck} className={`${iconClass}`} />;
    } else if (itemType === CalendarItemType.TODO) {
        return <FontAwesomeIcon icon={faSquareCheck} className={`${iconClass}`} />;
    }
}
