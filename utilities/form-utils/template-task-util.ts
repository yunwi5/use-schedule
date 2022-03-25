export type FormValues = {
	name: string;
	description: string;
	importance: string;
	category: string;
	subCategory: string;
	date: string;
	time: string;
	dueDate: string;
	dueTime: string;

	durationDays: number;
	durationHours: number;
	durationMinutes: number;

	// Yearly planner for monthDateOnly
	month: string;
	monthDay: number;
};
