import React from 'react';
import { faTimer } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RecurringInterval, RecurringItem } from '../../../../models/recurring-models';
import { useRecurringStyles } from './common-styles';

interface Props {
    recItem: RecurringItem;
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

const RecurringItemInterval: React.FC<Props> = ({ recItem }) => {
    const styles = useRecurringStyles();

    return (
        <div className="flex flex-col">
            <span className={`${styles.labelClass}`}>
                <FontAwesomeIcon icon={faTimer} className={styles.labelIconClass} />
                Recurring Interval
            </span>
            <time>
                {recItem.intervalFormat} ({getIntervalLabel(recItem.interval)})
            </time>
        </div>
    );
};

export default RecurringItemInterval;
