import { useState, useEffect } from 'react';
import { addMonths, addWeeks, addYears } from '../utilities/date-utils/date-control';
import {
    getCurrentMonthBeginning,
    getCurrentWeekBeginning,
    getCurrentYearBeginning,
    getMonthEnding,
    getWeekEnding,
    getYearEnding,
} from '../utilities/date-utils/date-get';

export enum ResetPeriod {
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year',
}

function getNewTimeStamp(resetPeriod: ResetPeriod) {
    switch (resetPeriod) {
        case ResetPeriod.WEEK:
            return getCurrentWeekBeginning();
        case ResetPeriod.MONTH:
            return getCurrentMonthBeginning();
        case ResetPeriod.YEAR:
            return getCurrentYearBeginning();
        default:
            return getCurrentWeekBeginning();
    }
}

const defaultTimeStamp = getCurrentWeekBeginning();

const useDateTime = (initialPeriod?: Date, resetPeriod?: ResetPeriod) => {
    const [currentTimeStamp, setCurrentTimeStamp] = useState<Date>(
        initialPeriod || defaultTimeStamp,
    );

    // Handle navigation
    const addWeekHandler = (weeksToAdd: number) => {
        if (!currentTimeStamp) throw new Error('Current local Datetime is null!');
        const addedPeriod = addWeeks(currentTimeStamp, weeksToAdd);
        setCurrentTimeStamp(addedPeriod);
    };

    const addMonthHandler = (monthsToAdd: number) => {
        if (!currentTimeStamp) throw new Error('Current local Datetime is null!');
        const addedTimestamp = addMonths(currentTimeStamp, monthsToAdd);
        setCurrentTimeStamp(addedTimestamp);
    };

    const addYearHandler = (yearsToAdd: number) => {
        if (!currentTimeStamp) throw new Error('Current local Datetime is null!');
        const addedTimestamp = addYears(currentTimeStamp, yearsToAdd);
        setCurrentTimeStamp(addedTimestamp);
    };

    useEffect(() => {
        const storedDate = localStorage.getItem('dateTime');
        // console.log("storedDate:", storedDate);
        if (initialPeriod) return; // if default period is given, no action to change it brutally.
        if (storedDate) {
            const current = new Date(storedDate);
            setCurrentTimeStamp(current);
        } else {
            const newTimeStamp = getNewTimeStamp(resetPeriod || ResetPeriod.WEEK);
            setCurrentTimeStamp(newTimeStamp);
        }
    }, [initialPeriod, resetPeriod]);

    useEffect(() => {
        if (currentTimeStamp) localStorage.setItem('dateTime', currentTimeStamp.toString());
    }, [currentTimeStamp]);

    const weekEnding = getWeekEnding(currentTimeStamp);
    const monthEnding = getMonthEnding(currentTimeStamp);
    const yearEnding = getYearEnding(currentTimeStamp);

    return {
        currentTimeStamp: currentTimeStamp,
        addWeeks: addWeekHandler,
        addMonths: addMonthHandler,
        addYears: addYearHandler,
        setCurrentTimeStamp,
        weekEnding,
        monthEnding,
        yearEnding,
    };
};

export default useDateTime;
