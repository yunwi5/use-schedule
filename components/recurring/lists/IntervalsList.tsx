import React, { useMemo } from 'react';
import { RecurringIntervalList, RecurringItem } from '../../../models/recurring-models';
import { useAppSelector } from '../../../store/redux';
import RecurringItemList from './RecurringItemList';

interface Props {
    onInvalidate(): void;
    items: RecurringItem[];
}

const IntervalsList: React.FC<Props> = ({ onInvalidate, items }) => {
    const { searchWord } = useAppSelector((state) => state.recurring);

    const filteredItems = useMemo(() => {
        return items.filter((item) => item.name.toLowerCase().includes(searchWord.toLowerCase()));
    }, [items, searchWord]);

    return (
        <section className={'lg:mt-3 flex flex-col gap-10 xl:pr-6'}>
            {RecurringIntervalList.map((interval) => {
                const intervalEvents = filteredItems.filter((ev) => ev.interval === interval);
                return (
                    <RecurringItemList
                        key={interval}
                        recurringInterval={interval}
                        items={intervalEvents}
                        onInvalidate={onInvalidate}
                    />
                );
            })}
        </section>
    );
};

export default IntervalsList;
