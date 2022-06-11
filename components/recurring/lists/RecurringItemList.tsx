import React, { useState } from 'react';
import { RecurringInterval, RecurringIntervalList } from '../../../models/recurring-models';
import ListHeading from './ListHeading';

interface Props {
    recurringInterval: RecurringInterval;
    items: any[];
}

const RecurringItemList: React.FC<Props> = (props) => {
    const { recurringInterval, items } = props;
    const [isShrinked, setIsShrinked] = useState(false);

    return (
        <section className={'flex flex-col gap-3'}>
            <ListHeading
                headingText={`Every ${recurringInterval}`}
                isShrinked={isShrinked}
                onToggleShrink={() => setIsShrinked((ps) => !ps)}
            />
        </section>
    );
};

export default RecurringItemList;
