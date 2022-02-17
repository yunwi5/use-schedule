import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/pro-regular-svg-icons";

import PlannerTaskCard from "./PlannerTaskCard";
import { WeekDay } from "../../models/date-models/WeekDay";
import { WeeklyPlanner } from "../../models/planner-models/Planner";
import { addDays } from "../../utilities/time-utils/date-control";
import { getMonth } from "../../utilities/time-utils/month-util";
import { getShortDayName } from "../../utilities/time-utils/weekday-util";
import { PlannerTask } from "../../models/task-models/Task";

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

const TaskList: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, day, index, onMutate } = props;
	const [ isShrinked, setIsShrinked ] = useState(false);

	const taskList = planner.getTasks(day);
	const sortedTasksList = useMemo(
		() => {
			return taskList.sort(sortTaskByTime);
		},
		[ taskList ]
	);

	const shortDay = getShortDayName(day);
	const curr = addDays(beginningPeriod, index);
	const currMonth = getMonth(curr);

	const isDateAny = day === WeekDay.ANY;
	let currDate = !isDateAny ? curr.getDate().toString() : "?";

	return (
		<div className="ml-4 my-4">
			<div className="flex items-center gap-3">
				<div className=" px-2 pt-[5px] pb-3 bg-gray-500 text-white w-16 h-16 rounded-md flex flex-col items-center">
					<span className="text-2xl">{currDate}</span>
					<span>{currMonth}</span>
				</div>
				<p className="w-14 text-2xl font-semibold text-slate-700/70">{shortDay}</p>
				<div className="w-full h-1 bg-slate-300" />
				<FontAwesomeIcon
					icon={faAngleDown}
					className={`max-w-[1.3rem] text-3xl text-slate-500 cursor-pointer ml-auto mr-12 ${isShrinked
						? ""
						: "rotate-180"} transition-all duration-300`}
					onClick={() => setIsShrinked((prevState) => !prevState)}
				/>
			</div>
			{!isShrinked && (
				<ul className="flex flex-col items-center gap-4 pl-10">
					{sortedTasksList.map((task) => (
						<PlannerTaskCard
							key={task.id}
							task={task}
							beginningPeriod={beginningPeriod}
							onMutate={onMutate}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default TaskList;
