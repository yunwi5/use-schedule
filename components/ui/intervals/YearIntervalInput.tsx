import { useEffect, useState } from 'react';
import { setHMSToEnd } from '../../../utilities/date-utils/date-control';
import { getCurrentYearBeginning, getYearEnding } from '../../../utilities/date-utils/date-get';
import { getYearList } from '../../../utilities/date-utils/yaer-util';
import AppSelect from '../input/AppSelect';

interface Props {
    beginningPeriod: Date;
    onChangeInterval: (newInterval: { startDate: Date; endDate: Date }) => void;
    error: string | null;
}

function getBeginningOfYear(year: number) {
    return new Date(year, 0, 1);
}

const currentYear = getCurrentYearBeginning().getFullYear();
let yearList: number[] = [];
for (let i = -3; i < 5; i++) {
    yearList.push(currentYear - i);
}

// need to be moved to different file later on
const YearIntervalInput: React.FC<Props> = ({ beginningPeriod, onChangeInterval, error }) => {
    const [startYear, setStartYear] = useState(beginningPeriod.getFullYear());
    const [endYear, setEndYear] = useState(beginningPeriod.getFullYear());

    const yearChangeHandler = (newYear: string) => {
        setStartYear(parseInt(newYear));
    };

    const endYearChangeHandler = (newEndYear: string) => {
        setEndYear(parseInt(newEndYear));
    };

    useEffect(() => {
        const startDate = getBeginningOfYear(startYear);
        const endDate = getYearEnding(getBeginningOfYear(endYear));
        setHMSToEnd(endDate);
        // validation is done by parent component
        onChangeInterval({ startDate, endDate });
    }, [onChangeInterval, startYear, endYear]);

    const yearList = getYearList();

    return (
        <div className="flex flex-wrap items-center gap-3 text-lg">
            <div className="flex gap-2">
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

export default YearIntervalInput;
