import React, { useState, useMemo, useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/pro-regular-svg-icons";

import PlannerTaskCard from "./PlannerTaskCard";
import { WeekDay } from "../../models/date-models/WeekDay";
import { WeeklyPlanner } from "../../models/planner-models/Planner";
import { addDays } from "../../utilities/time-utils/date-control";
import { getMonth } from "../../utilities/time-utils/month-util";
import { getShortDayName } from "../../utilities/time-utils/weekday-util";
import { PlannerTask, Task } from "../../models/task-models/Task";
import { Filter } from "../planners/planner-support/PlannerFilter";

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

function applyTaskFilter (
	taskList: Task[],
	filterTarget: string | null,
	mainFilter: string | null,
	subFilter: string | null
): Task[] {
	if (!filterTarget || !mainFilter) return taskList;

	let filteredList: Task[] = [];
	switch (filterTarget) {
		case Filter.IMPORTANCE:
			filteredList = taskList.filter((task) => task.importance.trim() === mainFilter.trim());
			return filteredList;
		case Filter.STATUS:
			filteredList = taskList.filter((task) => task.status.trim() === mainFilter.trim());
			return filteredList;
		case Filter.CATEGORY:
			if (!subFilter) {
				filteredList = taskList.filter((task) => task.category === mainFilter.trim());
				return filteredList;
			}
			// If there is subCategory filter to filter again,
			filteredList = taskList.filter((task) => {
				return task.category === mainFilter.trim() && task.subCategory === subFilter.trim();
			});
			return filteredList;
		default:
			throw new Error("Filter is invalid! Check the filter inputs!");
	}
}

const TaskList: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, day, index, onMutate } = props;
	const isFolded = useSelector((state: RootStateOrAny) => state.fold.isFolded);
	const { searchWord, filterTarget, mainFilter, subFilter } = useSelector(
		(state: RootStateOrAny) => state.filter
	);

	const [ isShrinked, setIsShrinked ] = useState(false);

	const sortedTasksList = planner.getTasks(day).sort(sortTaskByTime);
	const [ filteredTaskList, setFilteredTaskList ] = useState<Task[]>(sortedTasksList);

	const shortDay = getShortDayName(day);
	const curr = addDays(beginningPeriod, index);
	const currMonth = getMonth(curr);

	const isDateAny = day === WeekDay.ANY;
	let currDate = !isDateAny ? curr.getDate().toString() : "?";

	useEffect(
		() => {
			setIsShrinked(isFolded);
		},
		[ isFolded ]
	);

	useEffect(
		() => {
			const searchedList = sortedTasksList.filter((task) =>
				task.name.toLowerCase().includes(searchWord.toLowerCase())
			);
			// console.log(
			// 	`filterTarget: ${filterTarget}, mainFilter: ${mainFilter}, subFilter: ${subFilter}`
			// );
			const newFiltered = applyTaskFilter(searchedList, filterTarget, mainFilter, subFilter);
			setFilteredTaskList(newFiltered);
		},
		[ searchWord, filterTarget, mainFilter, subFilter, sortedTasksList ]
	);

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
					{filteredTaskList.map((task) => (
						<PlannerTaskCard
							key={task.id}
							task={task as PlannerTask}
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
