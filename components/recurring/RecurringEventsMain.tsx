import React from 'react';

import IntroPanel from './info/IntroPanel';
import PlannerCard from '../ui/cards/PlannerCard';
import ControlNav from './control/ControlNav';

const RecurringEventsMain = () => {
    return (
        <PlannerCard className={'flex flex-col justify-between gap-8'}>
            <IntroPanel
                title={'Recurring Events'}
                message={
                    <span>
                        You can organize your repetitive events that occur in regular interval in
                        one place. Here, you can organize recurring events in various intervals. The
                        events will be added to your calendar & planner up to{' '}
                        <strong className="text-slate-600/90 underline underline-offset-2">
                            1 YEAR FORWARD
                        </strong>
                        .
                    </span>
                }
            />
            <ControlNav />
            Recurring Events
        </PlannerCard>
    );
};

export default RecurringEventsMain;
