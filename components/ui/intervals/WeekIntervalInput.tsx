import { useEffect, useState } from 'react';

import { addWeeks, setHMSToEnd } from '../../../utilities/date-utils/date-control';
import {
    getMonthDays,
    getMonthIndex,
    getMonthMember,
    Month,
    MonthList,
} from '../../../models/date-models/Month';
import { getCurrentYearBeginning } from '../../../utilities/date-utils/date-get';
import AppSelect from '../input/AppSelect';

interface Props {
    beginningPeriod: Date;
    onChangeInterval: (newInterval: { startDate: Date; endDate: Date }) => void;
    error: string | null;
}

function getDateFromMonthAndDay(month: Month, day: number) {
    const year = getCurrentYearBeginning().getFullYear();
    const monthIndex = getMonthIndex(month);
    return new Date(year, monthIndex, day);
}

function getEndingDate(month: Month, day: number) {
    const date = getDateFromMonthAndDay(month, day);
    setHMSToEnd(date);
    return date;
}

// need to be moved to different file later on
const WeekIntervalInput: React.FC<Props> = ({ beginningPeriod, onChangeInterval, error }) => {
    const nextWeek = addWeeks(beginningPeriod, 1);
    const [startDay, setStartDay] = useState(beginningPeriod.getDate());
    const [startMonth, setStartMonth] = useState<Month>(getMonthMember(beginningPeriod));

    const [endDay, setEndDay] = useState(nextWeek.getDate());
    const [endMonth, setEndMonth] = useState<Month>(getMonthMember(nextWeek));

    const DayChangeHandler = (newYear: string) => {
        setStartDay(parseInt(newYear));
    };
    const monthChangeHandler = (newMonth: string) => {
        setStartMonth(newMonth as Month);
    };

    const endDayChangeHandler = (newEndYear: string) => {
        setEndDay(parseInt(newEndYear));
    };
    const endMonthChangeHandler = (newEndMonth: string) => {
        setEndMonth(newEndMonth as Month);
    };

    useEffect(() => {
        const startDate = getDateFromMonthAndDay(startMonth, startDay);
        const endDate = getEndingDate(endMonth, endDay);
        // validation is done by parent component
        onChangeInterval({ startDate, endDate });
    }, [onChangeInterval, startMonth, startDay, endMonth, endDay]);

    const currentYear = getCurrentYearBeginning().getFullYear();
    let yearList: number[] = [];
    for (let i = -3; i < 5; i++) {
        yearList.push(currentYear - i);
    }

    return (
        <div className="flex flex-wrap flex-col lg:flex-row items-center gap-3 text-lg">
            <div className="flex gap-2">
                <AppSelect
                    onChange={DayChangeHandler}
                    id="day-input"
                    label="Start Day"
                    error={!!error}
                    value={startDay}
                    options={getMonthDays(startMonth)}
                />
                <AppSelect
                    onChange={monthChangeHandler}
                    id="month-input"
                    label={'Start Month'}
                    error={!!error}
                    value={startMonth}
                    options={MonthList}
                />
            </div>
            <span>To</span>
            <div className="flex gap-2">
                <AppSelect
                    onChange={endDayChangeHandler}
                    id="dat-input-end"
                    label="End Day"
                    error={!!error}
                    value={endDay}
                    options={getMonthDays(endMonth)}
                />
                <AppSelect
                    onChange={endMonthChangeHandler}
                    id="month-input-end"
                    label={'End Month'}
                    error={!!error}
                    value={endMonth}
                    options={MonthList}
                />
            </div>
            {error && <p className="error-message -mt-1 w-full">{error}</p>}
        </div>
    );
};

export default WeekIntervalInput;
