import React, { useMemo, useState } from 'react';
import {
    RecurringInterval,
    RecurringItem,
    RecurringItemMode,
} from '../../../models/recurring-models';
import { RecurringEvent } from '../../../models/recurring-models/RecurringEvent';
import { Task } from '../../../models/task-models/Task';
import { useAppSelector } from '../../../store/redux';
import { sortEvents } from '../../../utilities/sort-utils/event-sort';
import { sortTasks } from '../../../utilities/sort-utils/task-sort-util';
import { RecurringEventItem } from '../item-cards';
import ListHeading from './ListHeading';

interface Props {
    recurringInterval: RecurringInterval;
    items: RecurringItem[];
    onInvalidate(): void;
}

const RecurringItemList: React.FC<Props> = (props) => {
    const { recurringInterval, items, onInvalidate } = props;
    const [isShrinked, setIsShrinked] = useState(false);

    const { mode, eventSortingStandard, taskSortingStandard, sortingDirection } = useAppSelector(
        (state) => state.recurring,
    );

    const sortedItems = useMemo(() => {
        if (!sortingDirection) return items;
        if (eventSortingStandard && mode === RecurringItemMode.EVENT)
            return sortEvents(
                items as RecurringEvent[],
                eventSortingStandard,
                sortingDirection,
            ) as RecurringEvent[];
        else if (taskSortingStandard && mode === RecurringItemMode.TASK)
            return sortTasks(items as any[], taskSortingStandard, sortingDirection);
        return items;
    }, [items, eventSortingStandard, taskSortingStandard, mode, sortingDirection]);

    return (
        <section className={'flex flex-col gap-3'}>
            <ListHeading
                headingText={`Every ${recurringInterval}`}
                isShrinked={isShrinked}
                onToggleShrink={() => setIsShrinked((ps) => !ps)}
            />
            {!isShrinked && mode === RecurringItemMode.EVENT && (
                <ul className={`md:pl-[8rem] md:pr-[2rem] flex flex-col gap-4`}>
                    {sortedItems.map((item) => (
                        <RecurringEventItem
                            key={item.id}
                            item={item as RecurringEvent}
                            onInvalidate={onInvalidate}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
};

export default RecurringItemList;
