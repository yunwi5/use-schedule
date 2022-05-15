import { useState } from 'react';

import { getMonthDays, getMonthMember, Month, MonthList } from '../../../models/date-models/Month';
import { addWeeks } from '../../../utilities/date-utils/date-control';
import { getCurrentYearBeginning } from '../../../utilities/date-utils/date-get';
import AppSelect from '../input/AppSelect';

interface Props {
    beginningPeriod: Date;
    onChangeInterval: (newInterval: { startDate: Date; endDate: Date }) => void;
}

// need to be moved to different file later on
const WeekIntervalInput: React.FC<Props> = ({ beginningPeriod, onChangeInterval }) => {
    const nextWeek = addWeeks(beginningPeriod, 1);
    const [startDay, setStartDay] = useState(beginningPeriod.getDate());
    const [startMonth, setStartMonth] = useState<Month>(getMonthMember(beginningPeriod));

    const [endDay, setEndDay] = useState(nextWeek.getDate());
    const [endMonth, setEndMonth] = useState<Month>(getMonthMember(nextWeek));

    const DayChangeHandler = (newYear: string) => {
        setStartDay(parseInt(newYear));
    };
    const monthChangeHandler = (newMonth: string) => {
        console.log('changed to:', newMonth);
        setStartMonth(newMonth as Month);
    };

    const endDayChangeHandler = (newEndYear: string) => {
        setEndDay(parseInt(newEndYear));
    };
    const endMonthChangeHandler = (newEndMonth: string) => {
        setEndMonth(newEndMonth as Month);
    };

    const currentYear = getCurrentYearBeginning().getFullYear();
    let yearList: number[] = [];
    for (let i = -3; i < 5; i++) {
        yearList.push(currentYear - i);
    }

    return (
        <div className="flex flex-col lg:flex-row items-center gap-3 text-lg">
            <div className="flex gap-2">
                <AppSelect
                    onChange={DayChangeHandler}
                    id="day-input"
                    label="Start Day"
                    value={startDay}
                    options={getMonthDays(startMonth)}
                />
                <AppSelect
                    onChange={monthChangeHandler}
                    id="month-input"
                    label={'Start Month'}
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
                    value={endDay}
                    options={getMonthDays(endMonth)}
                />
                <AppSelect
                    onChange={endMonthChangeHandler}
                    id="month-input-end"
                    label={'End Month'}
                    value={endMonth}
                    options={MonthList}
                />
            </div>
        </div>
    );
};

export default WeekIntervalInput;
