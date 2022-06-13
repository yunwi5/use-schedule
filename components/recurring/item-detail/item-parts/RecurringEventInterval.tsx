import React from 'react';
import { faTimer } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RecurringInterval, RecurringItem } from '../../../../models/recurring-models';
import { eventStyles } from '../../../calendar/events/detail/detail-parts/common-styles';

interface Props {
    recEvent: RecurringItem;
}

export function getIntervalLabel(interval: RecurringInterval) {
    switch (interval) {
        case RecurringInterval.DAY:
            return 'daily';
        case RecurringInterval.WEEK:
            return 'weekly';
        case RecurringInterval.MONTH:
            return 'monthly';
        case RecurringInterval.YEAR:
            return 'yearly';
        default:
            return '';
    }
}

const RecurringIntervalComp: React.FC<Props> = ({ recEvent }) => {
    recEvent.intervalFormat;

    return (
        <div className="flex flex-col">
            <span className={`${eventStyles.labelClass}`}>
                <FontAwesomeIcon icon={faTimer} className={eventStyles.labelIconClass} />
                Recurring Interval
            </span>
            <time>
                {recEvent.intervalFormat} ({getIntervalLabel(recEvent.interval)})
            </time>
        </div>
    );
};

export default RecurringIntervalComp;
