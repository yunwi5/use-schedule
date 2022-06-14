import React from 'react';

import IntroPanel from './info/IntroPanel';
import PlannerCard from '../ui/cards/PlannerCard';
import ControlNav from './control/ControlNav';
import IntervalsList from './lists/IntervalsList';
import { RecurringItem } from '../../models/recurring-models';

interface Props {
    onInvalidate(): void;
    items: RecurringItem[];
}

// Re-usable for both recurring-events and recurring-tasks
const RecurringMain: React.FC<Props> = (props) => {
    const { onInvalidate, items } = props;

    return (
        <PlannerCard className={'flex flex-col justify-between gap-8'}>
            <IntroPanel />
            <ControlNav onInvalidate={onInvalidate} />
            <IntervalsList onInvalidate={onInvalidate} items={items} />
        </PlannerCard>
    );
};

export default RecurringMain;
