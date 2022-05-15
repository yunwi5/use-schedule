import { useEffect, useState } from 'react';
import { getCurrentYearBeginning, getYearEnding } from '../../../utilities/date-utils/date-get';
import AppSelect from '../input/AppSelect';

interface Props {
    beginningPeriod: Date;
    onChangeInterval: (newInterval: { startDate: Date; endDate: Date }) => void;
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
const YearIntervalInput: React.FC<Props> = ({ beginningPeriod, onChangeInterval }) => {
    const [startYear, setStartYear] = useState(beginningPeriod.getFullYear());
    const [endYear, setEndYear] = useState(beginningPeriod.getFullYear());

    const yearChangeHandler = (newYear: string) => {
        setStartYear(parseInt(newYear));
    };

    const endYearChangeHandler = (newEndYear: string) => {
        setEndYear(parseInt(newEndYear));
    };

    useEffect(() => {
        // need validation
        onChangeInterval({
            startDate: getBeginningOfYear(startYear),
            endDate: getYearEnding(getBeginningOfYear(endYear)),
        });
    }, [onChangeInterval, startYear, endYear]);

    return (
        <div className="flex items-center gap-3 text-lg">
            <div className="flex gap-2">
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

export default YearIntervalInput;
