import React from 'react';
import { faTimer } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RecurringItem } from '../../../../models/recurring-models';
import { RecurringEvent } from '../../../../models/recurring-models/RecurringEvent';
import { eventStyles } from '../../../calendar/events/detail/detail-parts/common-styles';

interface Props {
    recEvent: RecurringItem;
}

const RecurringInterval: React.FC<Props> = ({ recEvent }) => {
    recEvent.intervalFormat;

    return (
        <div className="flex flex-col">
            <span className={`${eventStyles.labelClass}`}>
                <FontAwesomeIcon icon={faTimer} className={eventStyles.labelIconClass} />
                Recurring Interval
            </span>
            <time>
                {recEvent.intervalFormat} ({recEvent.interval}ly)
            </time>
        </div>
    );
};

export default RecurringInterval;
