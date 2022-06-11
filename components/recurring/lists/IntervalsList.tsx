import React from 'react';
import { RecurringIntervalList } from '../../../models/recurring-models';
import RecurringItemList from './RecurringItemList';

const IntervalsList = () => {
    return (
        <section className={'lg:mt-3 flex flex-col gap-5 lg:gap-10 xl:pr-6'}>
            {RecurringIntervalList.map((interval) => (
                <RecurringItemList key={interval} recurringInterval={interval} items={[]} />
            ))}
        </section>
    );
};

export default IntervalsList;
