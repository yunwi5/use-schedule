import React, { useState, useMemo } from "react";
import { useSelector, RootStateOrAny } from "react-redux";

import TaskList from "./TaskList";
import ListHeading from "./task-support/ListHeading";
import { Task } from "../../models/task-models/Task";
import { WeekDay } from "../../models/date-models/WeekDay";
import { Month } from "../../models/date-models/Month";
import { Planner } from "../../models/planner-models/Planner";
// import { WeeklyPlanner } from "../../models/planner-models/WeeklyPlanner";
import { addDays, addMonths } from "../../utilities/time-utils/date-control";
import { getMonth } from "../../utilities/time-utils/month-util";
import { PlannerMode } from "../../models/planner-models/PlannerMode";

interface Props {
	beginningPeriod: Date;
	planner: Planner;
	period: string;
	index: number;
	onMutate: () => void;
}

function getHeadingLabels (
	plannerMode: PlannerMode,
	beginningPeriod: Date,
	time: string,
	index: number
) {
	let labelMain = "",
		labelSub = "",
		headingText = "";
	switch (plannerMode) {
		case PlannerMode.WEEKLY:
			const day = time;
			// period, beginningPeriod, index
			const shortDay = getShortName(day);

			const curr = addDays(beginningPeriod, index);
			const currMonth = getMonth(curr);

			const isDateAny = day === WeekDay.ANY;
			let currDate = !isDateAny ? curr.getDate().toString() : "?";
			labelMain = currDate;
			labelSub = currMonth;
			headingText = shortDay;
			break;
		case PlannerMode.YEARLY:
			const month = time;
			const isMonthAny = month === Month.ANY;

			labelMain = !isMonthAny ? `${index + 1}` : "?";
			labelSub = "mon";
			headingText = getShortName(month);
			break;
	}

	return { labelMain, labelSub, headingText };
}

function getShortName (name: string) {
	return name.substring(0, 3);
}

function sortTaskByTime (taskA: Task, taskB: Task) {
	return new Date(taskA.timeString) < new Date(taskB.timeString) ? -1 : 1;
}

const TaskListContainer: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, period, index, onMutate } = props;
	const [ isShrinked, setIsShrinked ] = useState(false);

	const plannerMode = useSelector((state: RootStateOrAny) => state.planner.plannerMode);

	// Possibly needs to be validated
	const sortedTasksList = useMemo(() => planner.getTasks(period).sort(sortTaskByTime), [
		planner,
		period
	]);

	const { labelMain, labelSub, headingText } = getHeadingLabels(
		plannerMode,
		beginningPeriod,
		period,
		index
	);

	return (
		<div className="ml-4 my-4">
			<ListHeading
				labelMain={labelMain}
				labelSub={labelSub}
				headingText={headingText}
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

export default TaskListContainer;
