import { useState } from 'react';
import { getMonthMember, Month, MonthList } from '../../../models/date-models/Month';
import { addMonths } from '../../../utilities/date-utils/date-control';
import { getCurrentYearBeginning } from '../../../utilities/date-utils/date-get';
import AppSelect from '../input/AppSelect';

interface Props {
    beginningPeriod: Date;
    onChangeInterval: (newInterval: { startDate: Date; endDate: Date }) => void;
}

// need to be moved to different file later on
const MonthIntervalInput: React.FC<Props> = ({ beginningPeriod, onChangeInterval }) => {
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

    const currentYear = getCurrentYearBeginning().getFullYear();
    let yearList: number[] = [];
    for (let i = -3; i < 5; i++) {
        yearList.push(currentYear - i);
    }

    return (
        <div className="flex flex-col lg:flex-row items-center gap-3 text-lg">
            <div className="flex gap-2">
                <AppSelect
                    onChange={monthChangeHandler}
                    id="month-input"
                    label={'Start of'}
                    value={startMonth}
                    options={MonthList}
                />
                <AppSelect
                    onChange={yearChangeHandler}
                    id="year-input"
                    label="Start of"
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
                    value={endMonth}
                    options={MonthList}
                />
                <AppSelect
                    onChange={endYearChangeHandler}
                    id="year-input-end"
                    label="End of"
                    value={endYear}
                    options={yearList}
                />
            </div>
        </div>
    );
};

export default MonthIntervalInput;
