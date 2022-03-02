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

	durationDays: number;
	durationHours: number;
	durationMinutes: number;
};

const DAY_IN_MINS = 60 * 24;

export function getInitialDurationInput (initialTask: Task | undefined) {
	if (!initialTask) return { defaultHours: 0, defaultMinutes: 0, defaultDays: 0 };
	const dur = initialTask.duration;
	const defaultDays = Math.floor(dur / DAY_IN_MINS);
	const dayRemaining = dur % DAY_IN_MINS;

	const defaultHours = Math.floor(dayRemaining / 60);
	const defaultMinutes = dayRemaining % 60;
	return { defaultDays, defaultHours, defaultMinutes };
}

export function getDuration (watch: () => FormValues) {
	const currentDuration =
		(watch().durationDays || 0) * (60 * 24) +
		watch().durationHours * 60 +
		watch().durationMinutes;
	return currentDuration;
}

export function getEndTimeFormatted (watch: () => FormValues) {
	const currentInputDate = watch().date;
	const currentInputTime = watch().time;
	if (!currentInputDate || !currentInputTime) return null;

	const currentDate = new Date(`${currentInputDate} ${currentInputTime}`);
	const currentDuration = getDuration(watch);
	const estimatedEndTime = addMinutes(currentDate, currentDuration);
	const endTimeFormatted = getDateTimeFormat(estimatedEndTime);

	return endTimeFormatted;
}

export function getInitialDateTimeInput (initialTask: Task | undefined, beginningPeriod: Date) {
	let defaultDateTime = beginningPeriod;
	if (initialTask && initialTask.timeString) {
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

export function getFormTaskObject (data: FormValues, beginningPeriod: Date): FormTaskObject {
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
		durationDays = 0,
		durationHours = 0,
		durationMinutes = 0
	} = data;

	// const timeString = date && time ? new Date(`${date} ${time}`).toString() : "";
	let timeString = beginningPeriod.toString();
	if (date && time) {
		timeString = new Date(`${date} ${time}`).toString();
	} else if (date) {
		timeString = new Date(`${date} ${getISOTimeFormat(beginningPeriod)}`).toString();
	} else if (time) {
		timeString = new Date(`${beginningPeriod.toDateString()} ${time}`).toString();
	}

	const duration = durationDays * (24 * 60) + durationHours * 60 + durationMinutes;
	let dueDateString =
		dueDate && dueTime ? new Date(`${dueDate} ${dueTime}`).toString() : undefined;

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
