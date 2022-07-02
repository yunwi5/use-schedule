import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/pro-duotone-svg-icons';
import { getMonthMember } from '../../../../../models/date-models/Month';
import { getWeekDay } from '../../../../../models/date-models/WeekDay';
import { RecurringInterval } from '../../../../../models/recurring-models';
import {
    getFullDateFormat,
    getShortUserTimeFormat,
} from '../../../../../utilities/date-utils/date-format';
import { getDaySuffixed } from '../../../../../utilities/gen-utils/format-util';

interface Props {
    watch: () => { startDate: string; interval: string; time: string };
    itemName?: string;
}

export function getIntervalUserMessage(
    interval: RecurringInterval,
    startDate: string,
    time: string,
    itemName: string,
): string | JSX.Element {
    const startDateTime = new Date(`${startDate} ${time}`);
    const timeFormat = getShortUserTimeFormat(startDateTime);
    const dateOfMonth: JSX.Element = getDaySuffixed(startDateTime);
    const month = getMonthMember(startDateTime);
    const startDateFormat = getFullDateFormat(startDateTime);

    const highlightClass = 'text-slate-500';

    switch (interval.trim()) {
        case RecurringInterval.DAY: {
            return (
                <>
                    This {itemName} will be added everyday at{' '}
                    <strong className={highlightClass}>{timeFormat}</strong> from &nbsp;
                    <strong className={highlightClass}>{startDateFormat}</strong>
                </>
            );
        }
        case RecurringInterval.WEEK: {
            const dayName = getWeekDay(startDateTime);
            return (
                <>
                    This {itemName} will be added every week, on{' '}
                    <strong className={highlightClass}>{dayName}</strong> at{' '}
                    <strong className={highlightClass}>{timeFormat}</strong> from &nbsp;
                    <strong className={highlightClass}>{startDateFormat}</strong>
                </>
            );
        }
        case RecurringInterval.MONTH: {
            return (
                <>
                    This {itemName} will be added every month, on{' '}
                    <strong className={highlightClass}>{dateOfMonth}</strong> at{' '}
                    <strong className={highlightClass}>{timeFormat}</strong> from&nbsp;
                    <strong className={highlightClass}>{startDateFormat}</strong>
                </>
            );
        }
        case RecurringInterval.YEAR: {
            return (
                <>
                    This {itemName} will be added every year, on{' '}
                    <strong className={highlightClass}>
                        {dateOfMonth} {month}
                    </strong>{' '}
                    at <strong className={highlightClass}>{timeFormat}</strong> from{' '}
                    <strong>{startDateFormat}</strong>
                </>
            );
        }
        default:
            return 'Something went wrong.';
    }
}

const IntervalPreDisplay: React.FC<Props> = ({ watch, itemName }) => {
    const { interval, startDate, time } = watch();
    if (!interval || !startDate || !time) return <div />;

    const userMessage = getIntervalUserMessage(
        interval as RecurringInterval,
        startDate,
        time,
        itemName || 'schedule',
    );

    return (
        <p className={`${itemName} px-[0.7rem]`}>
            <FontAwesomeIcon icon={faInfo} className="icon icon-medium mr-2" />
            {userMessage}.
        </p>
    );
};

export default IntervalPreDisplay;
