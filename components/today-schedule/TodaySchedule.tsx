import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faFaceSmile } from '@fortawesome/pro-duotone-svg-icons';

import { CalendarItem } from '../../models/calendar-models/CalendarItem';
import { getFullDateFormat } from '../../utilities/date-utils/date-format';
import { generateDayTimeLine } from '../../utilities/date-utils/timeline-util';
import { getCalendarLink } from '../../utilities/link-utils';
import CustomMUIButton from '../ui/buttons/CustomMUIButton';
import TimeLine from './TimeLine';
import LoadingSpinner from '../ui/design-elements/LoadingSpinner';

interface Props {
    items: CalendarItem[];
    onInvalidate(): void;
    isLoading: boolean;
}

// Displaying user message to the user who has no schedules "today"
// Display button link that navigates to calendar page to encourage them to create some items
const UserMessageNoSchedule = () => (
    <div className={'flex flex-col items-center gap-4'}>
        <h2 className={'text-3xl'}>You have no schedules today...</h2>
        <CustomMUIButton size={'large'}>
            <Link href={getCalendarLink()}>
                <a>
                    <FontAwesomeIcon icon={faCalendarPlus} className={'mr-2'} />
                    Make Some Schedules!
                </a>
            </Link>
        </CustomMUIButton>
    </div>
);

const TodaySchedule: React.FC<Props> = (props) => {
    const { items, onInvalidate, isLoading } = props;
    const [expandItems, setExpandItems] = useState(true);
    const timeLines: string[] = generateDayTimeLine();

    const todayFormat = getFullDateFormat(new Date());
    // If the state is still loading, user may have schedules today.
    const hasNoItems = !isLoading && items.length === 0;

    return (
        <main className={'min-h-[78vh] py-10 px-4 lg:px-14 xl:px-[8rem] text-slate-600'}>
            <div className={'mb-8 flex flex-col sm:flex-row justify-between gap-5'}>
                <h2 className={'text-2xl md:text-3xl'}>
                    Today&apos;s Schedule
                    <time className={'ml-4 text-slate-500/80 font-semibold'}>
                        {todayFormat}
                    </time>
                </h2>
            </div>
            <div className={'mb-14 flex justify-between items-end gap-8'}>
                <span className={'text-2xl font-semibold text-slate-500/80'}>
                    {items.length} Schedules
                </span>
                <CustomMUIButton
                    onClick={() => setExpandItems((ps) => !ps)}
                    className={'self-start'}
                >
                    {expandItems ? 'Collapse All' : 'Expand All'}
                </CustomMUIButton>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center mt-6">
                    <LoadingSpinner />
                </div>
            )}

            {hasNoItems && <UserMessageNoSchedule />}

            <ul className={'flex flex-col gap-10'}>
                {timeLines.map((time, idx) => {
                    const hour = idx + 1;
                    const currentHourItems = items.filter(
                        (item) => item.dateTime?.getHours() === hour,
                    );
                    if (currentHourItems.length === 0) return;
                    return (
                        <TimeLine
                            key={idx}
                            timeLabel={time}
                            items={currentHourItems}
                            expandItems={expandItems}
                            onInvalidate={onInvalidate}
                        />
                    );
                })}
            </ul>
            {!hasNoItems && (
                <h2 className={'mt-14 text-center capitalize text-3xl text-slate-700'}>
                    <FontAwesomeIcon
                        icon={faFaceSmile}
                        className={'mr-2 scale-125 text-sky-600'}
                    />{' '}
                    Have a good day!
                </h2>
            )}
        </main>
    );
};

export default TodaySchedule;
