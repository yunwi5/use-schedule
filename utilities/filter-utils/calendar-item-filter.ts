import { CalendarItem } from "../../models/calendar-models/CalendarItem";
import { CalendarItemType } from "../../models/calendar-models/CalendarItemType";

import { isInstanceOfTask } from "../../models/task-models/Task";
import { isInstanceOfTodo } from "../../models/todo-models/Todo";
import { Importance, Status } from "../../models/task-models/Status";
import { ImportanceFilter, ItemTypeFilter, StatusFilter } from "../../models/filter-models";
import { isTodoOverdue } from "../todos-utils/todo-util";
import { isInstanceOfEvent } from "../../models/Event";

export function filterItemsByStatus(items: any[], statusFilter: StatusFilter): CalendarItem[] {
    const filteredItems: CalendarItem[] = items.filter((item) => {
        if (item.hasOwnProperty("status")) {
            const itemStatus = item.status as Status;
            return statusFilter[itemStatus] === true;
        }
        // Filter todos
        else if (item.hasOwnProperty("isCompleted")) {
            const isOverdue: boolean = isTodoOverdue(item);
            if (isOverdue) {
                return statusFilter[Status.OVERDUE] === true;
            } else if (statusFilter[Status.OPEN] === true && item.isCompleted === false) {
                return true;
            } else if (statusFilter[Status.COMPLETED] === true && item.isCompleted === true) {
                return true;
            }
        }
        return false;
    });
    return filteredItems;
}

export function filterItemsByImportance(
    items: any[],
    importanceFilter: ImportanceFilter,
): CalendarItem[] {
    const filteredItems: CalendarItem[] = items.filter((item) => {
        // Filter task items
        if (item.hasOwnProperty("importance")) {
            const itemImportance = item.importance as Importance;
            return importanceFilter[itemImportance] === true;
        }
        // Filter todo items
        else if (item.hasOwnProperty("isImportant")) {
            if (item.isImportant) {
                return (
                    importanceFilter[Importance.IMPORTANT] === true &&
                    importanceFilter[Importance.CRUCIAL] === true
                );
            } else if (!item.isImportant) {
                return (
                    importanceFilter[Importance.NICE_TO_HAVE] === true ||
                    importanceFilter[Importance.TRIVIAL] === true ||
                    importanceFilter[Importance.EXTRA] === true
                );
            }
        }
        return false;
    });

    return filteredItems;
}

export function filterItemsByItemType(
    items: any[],
    itemTypeFilter: ItemTypeFilter,
): CalendarItem[] {
    const filteredItems: CalendarItem[] = items.filter((item) => {
        // Currently only handle task and tood. It will handle events in the future.
        if (isInstanceOfTask(item)) {
            return itemTypeFilter[CalendarItemType.TASK] === true;
        } else if (isInstanceOfEvent(item)) {
            return itemTypeFilter[CalendarItemType.EVENT] === true;
        } else if (isInstanceOfTodo(item)) {
            return itemTypeFilter[CalendarItemType.TODO] === true;
        }
        return false;
    });

    return filteredItems;
}
