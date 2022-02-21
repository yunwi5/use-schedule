import React, { useState, useMemo } from "react";

import { WeekDay } from "../../models/date-models/WeekDay";
import { WeeklyPlanner, Planner } from "../../models/planner-models/Planner";
import { addDays } from "../../utilities/time-utils/date-control";
import { getMonth } from "../../utilities/time-utils/month-util";
import { getShortDayName } from "../../utilities/time-utils/weekday-util";
import { Task } from "../../models/task-models/Task";
import TaskList from "./TaskList";
import ListHeading from "./task-support/ListHeading";

interface Props {
	beginningPeriod: Date;
	planner: Planner;
	period: WeekDay;
	index: number;
	onMutate: () => void;
}

function sortTaskByTime (taskA: Task, taskB: Task) {
	return new Date(taskA.timeString) < new Date(taskB.timeString) ? -1 : 1;
}

const WeeklyTaskList: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, period, index, onMutate } = props;
	const [ isShrinked, setIsShrinked ] = useState(false);

	// Possibly needs to be validated
	const sortedTasksList = useMemo(() => planner.getTasks(period).sort(sortTaskByTime), [
		planner,
		period
	]);

	// period, beginningPeriod, index
	const shortDay = getShortDayName(period);

	const curr = addDays(beginningPeriod, index);
	const currMonth = getMonth(curr);

	const isDateAny = period === WeekDay.ANY;
	let currDate = !isDateAny ? curr.getDate().toString() : "?";

	return (
		<div className="ml-4 my-4">
			<ListHeading
				labelMain={currDate}
				labelSub={currMonth}
				headingText={shortDay}
				isShrinked={isShrinked}
				onToggleShrink={() => setIsShrinked((prevState) => !prevState)}
			/>
			<TaskList
				beginningPeriod={beginningPeriod}
				onMutate={onMutate}
				onShrink={(shrink: boolean) => setIsShrinked(shrink)}
				taskList={!isShrinked ? sortedTasksList : []}
			/>
		</div>
	);
};

export default WeeklyTaskList;
