import { AbstractTask } from '../../models/task-models/AbstractTask';
import { isStatus } from '../../models/task-models/Status';

interface StatusItem {
    status: string;
}
export function filterItemsOnStatus(items: StatusItem[], statusFilter?: string) {
    const validStatus: boolean = isStatus(statusFilter || '');
    // optional filter
    let filteredItems = validStatus ? items.filter((t) => t.status === statusFilter) : items;
    return filteredItems;
}
