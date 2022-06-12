import React, { useState } from 'react';
import { RecurringInterval, RecurringIntervalList } from '../../../models/recurring-models';
import { RecurringEvent } from '../../../models/recurring-models/RecurringEvent';
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

    return (
        <section className={'flex flex-col gap-3'}>
            <ListHeading
                headingText={`Every ${recurringInterval}`}
                isShrinked={isShrinked}
                onToggleShrink={() => setIsShrinked((ps) => !ps)}
            />
            <ul className={`md:pl-[8rem] md:pr-[2rem] flex flex-col gap-4`}>
                {items.map((item) => (
                    <RecurringEventItem key={item.id} item={item} onInvalidate={onInvalidate} />
                ))}
            </ul>
        </section>
    );
};

export default RecurringItemList;
