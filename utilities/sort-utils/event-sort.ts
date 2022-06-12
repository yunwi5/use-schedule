import { IEvent } from '../../models/Event';
import { EventSort, SortingDirection } from '../../models/sorting-models';
import {
    comapreByImportance,
    compareByAlphabeticalOrder,
    compareByDateTime,
    compareByDuration,
} from './sort-util';

export function sortEvents(
    events: IEvent[],
    sortingStandard: EventSort,
    direction: SortingDirection,
): IEvent[] {
    const isAsc = direction === SortingDirection.Ascending;
    switch (sortingStandard) {
        case EventSort.DATETIME:
            return events.sort((a, b) =>
                isAsc ? compareByDateTime(a, b) : compareByDateTime(b, a),
            );
        case EventSort.DURATION:
            return events.sort((a, b) =>
                isAsc ? compareByDuration(a, b) : compareByDuration(b, a),
            );
        case EventSort.IMPORTANCE:
            return events.sort((a, b) =>
                isAsc ? comapreByImportance(a, b) : comapreByImportance(b, a),
            );
        case EventSort.NAME:
            return events.sort((a, b) =>
                isAsc
                    ? compareByAlphabeticalOrder(a.name, b.name)
                    : compareByAlphabeticalOrder(b.name, a.name),
            );
        default:
            return events;
    }
}
