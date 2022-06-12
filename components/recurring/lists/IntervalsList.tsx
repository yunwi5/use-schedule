import React from 'react';
import { RecurringIntervalList } from '../../../models/recurring-models';
import { useAppSelector } from '../../../store/redux';
import RecurringItemList from './RecurringItemList';

const IntervalsList: React.FC<{ onInvalidate(): void }> = ({ onInvalidate }) => {
    const recEvents = useAppSelector((state) => state.recurring.recurringEvents);

    return (
        <section className={'lg:mt-3 flex flex-col gap-5 lg:gap-10 xl:pr-6'}>
            {RecurringIntervalList.map((interval) => {
                const intervalEvents = recEvents.filter((ev) => ev.interval === interval);
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
