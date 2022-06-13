import React from 'react';

import IntroPanel from './info/IntroPanel';
import PlannerCard from '../ui/cards/PlannerCard';
import ControlNav from './control/ControlNav';
import IntervalsList from './lists/IntervalsList';

interface Props {
    onInvalidate(): void;
}

// Re-usable for both recurring-events and recurring-tasks
const RecurringEventsMain: React.FC<Props> = (props) => {
    const { onInvalidate } = props;

    return (
        <PlannerCard className={'flex flex-col justify-between gap-8'}>
            <IntroPanel />
            <ControlNav onInvalidate={onInvalidate} />
            <IntervalsList onInvalidate={onInvalidate} />
        </PlannerCard>
    );
};

export default RecurringEventsMain;
