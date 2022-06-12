import React, { useMemo } from 'react';
import { RecurringIntervalList } from '../../../models/recurring-models';
import { useAppSelector } from '../../../store/redux';
import RecurringItemList from './RecurringItemList';

const IntervalsList: React.FC<{ onInvalidate(): void }> = ({ onInvalidate }) => {
    const { recurringEvents, searchWord } = useAppSelector((state) => state.recurring);

    const filteredItems = useMemo(() => {
        return recurringEvents.filter((item) =>
            item.name.toLowerCase().includes(searchWord.toLowerCase()),
        );
    }, [recurringEvents, searchWord]);

    return (
        <section className={'lg:mt-3 flex flex-col gap-5 lg:gap-10 xl:pr-6'}>
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
