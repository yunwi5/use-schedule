import React, { useState, useMemo } from "react";

import { WeekDay } from "../../models/date-models/WeekDay";
import { WeeklyPlanner } from "../../models/planner-models/Planner";
import { addDays } from "../../utilities/time-utils/date-control";
import { getMonth } from "../../utilities/time-utils/month-util";
import { getShortDayName } from "../../utilities/time-utils/weekday-util";
import { PlannerTask } from "../../models/task-models/Task";
import TaskList from "./TaskList";
import ListHeading from "./task-support/ListHeading";

interface Props {
	beginningPeriod: Date;
	planner: WeeklyPlanner;
	day: WeekDay;
	index: number;
	onMutate: () => void;
}

function sortTaskByTime (taskA: PlannerTask, taskB: PlannerTask) {
	return taskA.dateTime < taskB.dateTime ? -1 : 1;
}

const WeeklyTaskList: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, day, index, onMutate } = props;
	const [ isShrinked, setIsShrinked ] = useState(false);

	// Possibly needs to be validated
	const sortedTasksList = useMemo(() => planner.getTasks(day).sort(sortTaskByTime), [
		planner,
		day
	]);

	const shortDay = getShortDayName(day);
	const curr = addDays(beginningPeriod, index);
	const currMonth = getMonth(curr);

	const isDateAny = day === WeekDay.ANY;
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
