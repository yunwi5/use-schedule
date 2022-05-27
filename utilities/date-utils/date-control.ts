// Make sure all input days are not mutated. It should generate a copy before processsing
export function addMinutes(date: Date, minutes: number) {
    const dateCopy = new Date(date);
    dateCopy.setMinutes(dateCopy.getMinutes() + minutes);
    return dateCopy;
}

export function addDays(date: Date, numDays: number = 1): Date {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() + numDays);
    return dateCopy;
}

export function addWeeks(date: Date, numWeeks: number = 1): Date {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() + numWeeks * 7);
    return dateCopy;
}

export function addMonths(date: Date, numMonths: number = 1): Date {
    const dateCopy = new Date(date);
    dateCopy.setMonth(dateCopy.getMonth() + numMonths);
    return dateCopy;
}

export function addYears(date: Date, numYears: number = 1): Date {
    const dateCopy = new Date(date);
    dateCopy.setFullYear(dateCopy.getFullYear() + numYears);
    return dateCopy;
}

export function setHMSToEnd(date: Date) {
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
}

// Reset day time to 0:0
export function resetHoursAndMinutes(date: Date): Date {
    const dateCpy = new Date(date);
    dateCpy.setHours(0);
    dateCpy.setMinutes(0);
    dateCpy.setSeconds(0);
    dateCpy.setMilliseconds(0);
    return dateCpy;
}

export function getDayStart(date: Date): Date {
    return resetHoursAndMinutes(date);
}

export function getDayEnd(date: Date): Date {
    const dateCpy = new Date(date);
    dateCpy.setHours(23);
    dateCpy.setMinutes(59);
    dateCpy.setSeconds(59);
    return dateCpy;
}
