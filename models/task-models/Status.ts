export const Importance = {
	EXTRA: { name: "Extra", value: 1 },
	TRIVIAL: { name: "Trivial", value: 2 },
	NICE_TO_HAVE: { name: "Nice to have", value: 3 },
	IMPORTANT: { name: "Important", value: 4 },
	CRUCIAL: { name: "Crucial", value: 5 }
};

export const ImportanceList = [
	Importance.EXTRA,
	Importance.TRIVIAL,
	Importance.NICE_TO_HAVE,
	Importance.IMPORTANT,
	Importance.CRUCIAL
];

export enum TaskStatus {
	OPEN = "Open",
	CANCELLED = "Cancelled",
	IN_PROGRESS = "In Progress",
	COMPLETED = "Completed",
	OVERDUE = "Overdue"
}
