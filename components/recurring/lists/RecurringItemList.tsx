import React, { useMemo, useState } from 'react';
import { RecurringInterval, RecurringIntervalList } from '../../../models/recurring-models';
import { RecurringEvent } from '../../../models/recurring-models/RecurringEvent';
import { useAppSelector } from '../../../store/redux';
import { sortEvents } from '../../../utilities/sort-utils/event-sort';
import { RecurringEventItem } from '../item-cards';
import ListHeading from './ListHeading';

interface Props {
    recurringInterval: RecurringInterval;
    items: RecurringEvent[];
    onInvalidate(): void;
}

const RecurringItemList: React.FC<Props> = (props) => {
    const { recurringInterval, items, onInvalidate } = props;
    const [isShrinked, setIsShrinked] = useState(false);

    const { eventSortingStandard, sortingDirection } = useAppSelector((state) => state.recurring);

    const sortedItems = useMemo(() => {
        if (!eventSortingStandard || !sortingDirection) return items;
        return sortEvents(items, eventSortingStandard, sortingDirection) as RecurringEvent[];
    }, [items, eventSortingStandard, sortingDirection]);

    return (
        <section className={'flex flex-col gap-3'}>
            <ListHeading
                headingText={`Every ${recurringInterval}`}
                isShrinked={isShrinked}
                onToggleShrink={() => setIsShrinked((ps) => !ps)}
            />
            {!isShrinked && (
                <ul className={`md:pl-[8rem] md:pr-[2rem] flex flex-col gap-4`}>
                    {sortedItems.map((item) => (
                        <RecurringEventItem key={item.id} item={item} onInvalidate={onInvalidate} />
                    ))}
                </ul>
            )}
        </section>
    );
};

export default RecurringItemList;
