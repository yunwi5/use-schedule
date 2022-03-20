const WeeekDay = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

export function printDay (date: Date): void {
	// Accessing different properties of the time
	const day = date.getDay();
	const dayName = WeeekDay[day];

	const dayDate = date.getDate();
	const month = date.getMonth() + 1;

	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	console.log(`${dayDate}(${dayName})/${month}/${year}, ${hours}:${minutes}`);
}
