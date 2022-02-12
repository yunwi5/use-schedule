export function addDays (date: Date, numDays: number = 1): Date {
	const dateCopy = new Date(date);
	dateCopy.setDate(dateCopy.getDate() + numDays);
	return dateCopy;
}

export function addWeeks (date: Date, numWeeks: number = 1): Date {
	const dateCopy = new Date(date);
	dateCopy.setDate(dateCopy.getDate() + numWeeks * 7);
	return dateCopy;
}

export function addMonths (date: Date, numMonths: number = 1): Date {
	const dateCopy = new Date(date);
	dateCopy.setMonth(dateCopy.getMonth() + numMonths);
	return dateCopy;
}

// Reset day time to 0:0
export function resetHoursAndMinutes (date: Date): Date {
	const dateCpy = new Date(date);
	dateCpy.setHours(0);
	dateCpy.setMinutes(0);
	return dateCpy;
}
