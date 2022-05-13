import { AbstractTask } from '../../models/task-models/AbstractTask';
import { isStatus } from '../../models/task-models/Status';

export function filterItemsOnStatus(items: AbstractTask[], statusFilter?: string) {
    const validStatus: boolean = isStatus(statusFilter || '');
    // optional filter
    let filteredItems = validStatus ? items.filter((t) => t.status === statusFilter) : items;
    return filteredItems;
}
