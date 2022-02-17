import { FormTaskObject, Task } from "../../models/task-models/Task";
import { TaskStatus } from "../../models/task-models/Status";
import { addMinutes } from "../time-utils/date-control";
import { getWeekEnding } from "../time-utils/date-get";
import { getDateTimeFormat, getISODateFormat, getISOTimeFormat } from "../time-utils/date-format";

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

	durationHours: number;
	durationMinutes: number;
};

export function getInitialDurationInput (initialTask: Task | undefined) {
	if (!initialTask) return { defaultHours: 0, defaultMinutes: 0 };
	const dur = initialTask.duration;
	const defaultHours = Math.floor(dur / 60);
	const defaultMinutes = dur % 60;
	return { defaultHours, defaultMinutes };
}

export function getDuration (watch: () => FormValues) {
	const currentDuration = watch().durationHours * 60 + watch().durationMinutes;
	return currentDuration;
}

export function getEndTimeFormatted (watch: () => FormValues) {
	const currentInputDate = watch().date;
	const currentInputTime = watch().time;
	const currentDate = new Date(`${currentInputDate} ${currentInputTime}`);
	const currentDuration = getDuration(watch);
	const estimatedEndTime = addMinutes(currentDate, currentDuration);
	const endTimeFormatted = getDateTimeFormat(estimatedEndTime);

	return endTimeFormatted;
}

export function getInitialDateTimeInput (initialTask: Task | undefined, beginningPeriod: Date) {
	let defaultDateTime = beginningPeriod;
	if (initialTask) {
		defaultDateTime = new Date(initialTask.timeString);
	}

	const defaultDate = getISODateFormat(defaultDateTime);
	const defaultTime = getISOTimeFormat(defaultDateTime);
	return { defaultDate, defaultTime };
}

export function getInitialEndtimeInput (beginningPeriod: Date) {
	const weekEnding = getWeekEnding(beginningPeriod);
	const defaultEndDate = getISODateFormat(weekEnding);
	const defaultEndTime = getISOTimeFormat(weekEnding);
	return { defaultEndDate, defaultEndTime };
}

export function getFormTaskObject (data: FormValues): FormTaskObject {
	const {
		name,
		description,
		importance,
		category,
		subCategory,
		date,
		time,
		dueDate,
		dueTime,
		durationHours,
		durationMinutes
	} = data;

	const timeString = new Date(`${date} ${time}`).toString();
	const dueDateString = new Date(`${dueDate} ${dueTime}`).toString();
	const duration = durationHours * 60 + durationMinutes;

	const newTask: FormTaskObject = {
		name,
		description,
		importance,
		category,
		subCategory,
		timeString,
		dueDateString,
		// Temporary
		duration,
		status: TaskStatus.OPEN
	};
	return newTask;
}