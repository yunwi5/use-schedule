import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@mui/material';

import { Calendar } from '../../../models/calendar-models/Calendar';
import { getMonthMember } from '../../../models/date-models/Month';
import { WeekdayListMondayToSunday } from '../../../models/date-models/WeekDay';
import { addMonths } from '../../../utilities/date-utils/date-control';
import { getMonthBeginning } from '../../../utilities/date-utils/date-get';
import MiniNavigator from '../../ui/navigation/MiniNavigator';
import SummaryCard from '../cards/SummaryCard';
import SummaryHeading from '../cards/SummaryHeading';
import { useDashboardContext } from '../dashboard-context';
import MiniCalendarCell from './MiniCalendarCell';

const info = (
    <>
        <span className={`font-semibold text-lg`}>Mini Calendar</span> <br />
        allows you to navigate. The data will be adjusted to your chosen date & week.
    </>
);

const weekdayLabels = WeekdayListMondayToSunday.map((weekday) => weekday.substring(0, 3));

const MiniCalendar: React.FC = () => {
    const { currentPeriod, onChangeDate } = useDashboardContext();

    const [monthBeginning, setMonthBeginning] = useState(getMonthBeginning(currentPeriod));
    const [calendar, setCalendar] = useState(new Calendar(monthBeginning));

    const calendarDays: Date[] = useMemo(() => calendar.generateCalendarDays(), [calendar]);

    const monthNavigateHandler: any = (dir: number) => {
        if (dir !== 1 && dir !== -1) return;
        const newMonthBeginning = addMonths(monthBeginning, dir);
        setMonthBeginning(newMonthBeginning);
    };

    const todayNavigateHandler = () => {
        const today = new Date();
        const currentMonth = getMonthBeginning(today);
        setMonthBeginning(currentMonth);
        onChangeDate(today);
    };

    useEffect(() => {
        const newCal = new Calendar(monthBeginning);
        setCalendar(newCal);
    }, [monthBeginning]);

    const periodLabel = `${getMonthMember(monthBeginning)} ${monthBeginning.getFullYear()}`;

    const numRows = calendarDays.length / 7;

    return (
        <SummaryCard className={`!gap-0 pt-4 sm:pt-3 lg:pt-2`}>
            <SummaryHeading info={info}>
                <MiniNavigator onNavigate={monthNavigateHandler}>{periodLabel}</MiniNavigator>
                <Button className="calendar-nav-button" onClick={todayNavigateHandler}>
                    <span className={`capitalize`}>Today</span>
                </Button>
            </SummaryHeading>
            <div
                className={`pt-2 grid grid-cols-7 ${numRows >= 6 ? 'text-[0.9rem]' : 'text-base'}`}
            >
                {weekdayLabels.map((weekday) => (
                    <div key={weekday} className={`py-1 md:py-0 flex-center px-1 bg-slate-200`}>
                        {weekday}
                    </div>
                ))}
                {calendarDays.map((day, idx) => (
                    <MiniCalendarCell
                        key={idx}
                        cellDate={day}
                        currentPeriod={currentPeriod}
                        onChangeDate={onChangeDate}
                    />
                ))}
            </div>
        </SummaryCard>
    );
};

export default MiniCalendar;
