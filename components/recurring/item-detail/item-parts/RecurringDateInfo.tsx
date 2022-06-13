import { faInfo } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { RecurringItem } from '../../../../models/recurring-models';
import { useAppSelector } from '../../../../store/redux';
import { getFullDateFormat } from '../../../../utilities/date-utils/date-format';
import { incrementRecurringDate } from '../../../../utilities/recurring-utils';

interface Props {
    item: RecurringItem;
}

const RecurringDateInfo: React.FC<Props> = ({ item }) => {
    const itemType = useAppSelector((state) => state.recurring.mode);

    if (!item.lastRecurred) return <div />;

    return (
        <p>
            <FontAwesomeIcon icon={faInfo} className={'icon-medium mr-2 text-sky-600/75'} />
            This {itemType.toLowerCase()} was last added to the calendar on &nbsp;
            <time className={'text-slate-600 font-semibold'}>
                {getFullDateFormat(item.lastRecurred)}
            </time>
            . Next one will be added on &nbsp;
            <time className={'text-slate-600 font-semibold'}>
                {getFullDateFormat(incrementRecurringDate(item.lastRecurred, item.interval))}.
            </time>
        </p>
    );
};

export default RecurringDateInfo;
