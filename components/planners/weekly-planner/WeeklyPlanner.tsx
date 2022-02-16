import React, { useState, useEffect } from "react";

import PlannerHeader from "../planner-nav/PlannerHeader";
import WeeklyTable from "./WeeklyTable";
import { isSameWeek } from "../../../utilities/time-utils/date-classify";
import { PlannerTask, Task } from "../../../models/task-models/Task";
import { WeeklyPlanner as Planner } from "../../../models/planner-models/Planner";
import { getCurrentWeekBeginning } from "../../../utilities/time-utils/date-get";
import useDateTime from "../../../hooks/useDateTime";
import useLogger from "../../../hooks/useLogger";

interface Props {
	weeklyTasks: Task[];
	onMutate: () => void;
}

function populateWeeklyPlanner (tasks: Task[], weekBeginning: Date): Planner {
	const planner = new Planner(weekBeginning);
	for (const task of tasks) {
		let taskDate = new Date(task.timeString);
		const sameWeek = isSameWeek(weekBeginning, taskDate);
		// console.log(
		// 	`taskDate: ${taskDate}, wb: ${weekBeginning}, range: ${taskDate.getTime()} - ${weekBeginning.getTime()}`
		// );
		if (sameWeek) {
			const plannerTask = new PlannerTask(task);
			planner.addTasks(plannerTask);
		}
	}

	return planner;
}

const WeeklyPlanner: React.FC<Props> = ({ weeklyTasks: initialTasks, onMutate }) => {
	const [ planner, setPlanner ] = useState<Planner | null>(null);

	const weekBeginning = getCurrentWeekBeginning();
	const { currentTimeStamp, addWeeks: addLocalWeeks } = useDateTime(weekBeginning);

	useLogger(currentTimeStamp);

	useEffect(
		() => {
			console.log("Repopulate planner");
			const newPlanner = populateWeeklyPlanner(initialTasks, currentTimeStamp);
			setPlanner(newPlanner);
		},
		[ initialTasks, currentTimeStamp ]
	);

	// If the week beginning changes, the planner also has to change to load new tasks according to
	// Changed week beginning.
	const weekNavigateHandler = (direction: number) => {
		if (direction !== 1 && direction !== -1) throw new Error("Direction parameter is wrong!");
		// Hook call
		addLocalWeeks(direction);
	};

	return (
		<main className="ml-[12.2rem] mt-16">
			{/* <div className="flex text-gray-700 text-lg">
				<div className="text-center px-3 py-2 rounded-t-xl bg-white bg-gray-200/50 w-[10rem]">
					Time Planner
				</div>
				<div className="text-center px-3 py-2 rounded-t-xl bg-gray-200/50">Statistics</div>
			</div> */}
			<PlannerHeader beginningPeriod={currentTimeStamp} onMutate={onMutate} />
			{!planner && <p className="text-center text-3xl text-slate-800">Loading...</p>}
			{planner && (
				<WeeklyTable
					weekBeginning={currentTimeStamp}
					planner={planner}
					onChangeWeek={weekNavigateHandler}
					onMutate={onMutate}
				/>
			)}
		</main>
	);
};

export default WeeklyPlanner;
