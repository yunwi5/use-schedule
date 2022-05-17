import { useEffect, useState } from 'react';
import { getMonthIndex, getMonthMember, Month, MonthList } from '../../../models/date-models/Month';
import { setHMSToEnd } from '../../../utilities/date-utils/date-control';
import { getCurrentYearBeginning } from '../../../utilities/date-utils/date-get';
import { getYearList } from '../../../utilities/date-utils/yaer-util';
import AppSelect from '../input/AppSelect';

interface Props {
    beginningPeriod: Date;
    onChangeInterval: (newInterval: { startDate: Date; endDate: Date }) => void;
    error: string | null;
}

function getStartDateFromYearAndMonth(year: number, month: Month) {
    const monthIndex = getMonthIndex(month);
    const date = new Date(year, monthIndex, 1);
    return date;
}

function getEndDateFromYearAndMonth(year: number, month: Month) {
    const monthIndex = getMonthIndex(month);
    const ending = new Date(year, monthIndex + 1, 0);
    setHMSToEnd(ending);
    return ending;
}

// need to be moved to different file later on
const MonthIntervalInput: React.FC<Props> = ({ beginningPeriod, onChangeInterval, error }) => {
    const [startMonth, setStartMonth] = useState<Month>(getMonthMember(beginningPeriod));
    const [startYear, setStartYear] = useState(beginningPeriod.getFullYear());
    const [endMonth, setEndMonth] = useState<Month>(getMonthMember(beginningPeriod));
    const [endYear, setEndYear] = useState(beginningPeriod.getFullYear());

    const monthChangeHandler = (newMonth: string) => {
        console.log('changed to:', newMonth);
        setStartMonth(newMonth as Month);
    };

    const yearChangeHandler = (newYear: string) => {
        setStartYear(parseInt(newYear));
    };

    const endMonthChangeHandler = (newEndMonth: string) => {
        setEndMonth(newEndMonth as Month);
    };

    const endYearChangeHandler = (newEndYear: string) => {
        setEndYear(parseInt(newEndYear));
    };

    useEffect(() => {
        const startDate: Date = getStartDateFromYearAndMonth(startYear, startMonth);
        const endDate: Date = getEndDateFromYearAndMonth(endYear, endMonth);
        // validation is done by parent component
        onChangeInterval({ startDate, endDate });
    }, [onChangeInterval, startMonth, startYear, endMonth, endYear]);

    const yearList = getYearList();

    return (
        <div className="flex flex-wrap flex-col lg:flex-row items-center gap-3 text-lg">
            <div className="flex gap-2">
                <AppSelect
                    onChange={monthChangeHandler}
                    error={!!error}
                    id="month-input"
                    label={'Start of'}
                    value={startMonth}
                    options={MonthList}
                />
                <AppSelect
                    onChange={yearChangeHandler}
                    id="year-input"
                    label="Start of"
                    error={!!error}
                    value={startYear}
                    options={yearList}
                />
            </div>
            <span>To</span>
            <div className="flex gap-2">
                <AppSelect
                    onChange={endMonthChangeHandler}
                    id="month-input-end"
                    label={'End of'}
                    error={!!error}
                    value={endMonth}
                    options={MonthList}
                />
                <AppSelect
                    onChange={endYearChangeHandler}
                    id="year-input-end"
                    label="End of"
                    error={!!error}
                    value={endYear}
                    options={yearList}
                />
            </div>
            {error && <p className="error-message -mt-1 w-full">{error}</p>}
        </div>
    );
};

export default MonthIntervalInput;
