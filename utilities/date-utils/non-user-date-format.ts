export function getSimpleDateTimeFormat (date: Date, showTime?: boolean) {
	const dateFormat = date.toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});

	if (!showTime) return dateFormat;

	return `${dateFormat}, ${date.getHours()}:${date.getMinutes()}`;
}

// Debugging purpose
export function getIntervalFormat (beginning: Date, ending: Date): string {
	const beginningFormat = getSimpleDateTimeFormat(beginning, true);
	const endingFormat = getSimpleDateTimeFormat(ending, true);

	return `Start: ${beginningFormat}, End: ${endingFormat}`;
}
