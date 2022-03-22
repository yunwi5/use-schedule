import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import IntroPanel from "../planner-nav/IntroPanel";
import YearlyTable from "./YearlyTable";
import PlannerHeader from "../planner-nav/PlannerHeader";
import { plannerActions } from "../../../store/redux/planner-slice";
import { PlannerTask, Task } from "../../../models/task-models/Task";
import { YearlyPlanner as Planner } from "../../../models/planner-models/YearlyPlanner";
import useDateTime, { ResetPeriod } from "../../../hooks/useDateTime";
import { PlannerMode } from "../../../models/planner-models/PlannerMode";
import { getCurrentYearBeginning } from "../../../utilities/time-utils/date-get";
import { isSameYear } from "../../../utilities/time-utils/date-classify";
import { adjustIfOverdueTask } from "../../../utilities/tasks-utils/task-util";
import PlannerCard from "../../ui/cards/PlannerCard";

interface Props {
	yearlyTasks: Task[];
	onMutate: () => void;
}

// This needs to be implemented.
function populateYearlyPlanner (tasks: Task[], yearBeginning: Date): Planner {
	const planner = new Planner(yearBeginning);

	for (const task of tasks) {
		let taskDate = new Date(task.timeString);
		const sameYear = isSameYear(yearBeginning, taskDate);

		adjustIfOverdueTask(task);

		if (sameYear) {
			const plannerTask = new PlannerTask(task);
			plannerTask.plannerType = PlannerMode.YEARLY;
			planner.addTask(plannerTask);
		}
	}
	return planner;
}

const YearlyPlanner: FC<Props> = ({ yearlyTasks: initialTasks, onMutate }) => {
	const [ planner, setPlanner ] = useState<Planner | null>(null);

	const dispatch = useDispatch();

	const yearBeginning = getCurrentYearBeginning();
	console.log(`year beginning: ${yearBeginning}`);

	const { currentTimeStamp, addYears: addLocalYears } = useDateTime(
		yearBeginning,
		ResetPeriod.YEAR
	);

	useEffect(
		() => {
			const newPlanner = populateYearlyPlanner(initialTasks, currentTimeStamp);
			setPlanner(newPlanner);
		},
		[ initialTasks, currentTimeStamp ]
	);

	useEffect(() => {
		dispatch(plannerActions.setPlannerMode(PlannerMode.YEARLY));
	}, []);

	const yearNavigateHandler = (direction: number) => {
		if (direction !== 1 && direction !== -1) throw new Error("Direction parameter is wrong!");
		// Hook call
		addLocalYears(direction);
	};

	return (
		<PlannerCard>
			<IntroPanel
				title="Yearly Planner"
				message="Make your year strong and compact with timeply planned yearly goals added on your scheduler. Feel free to see the analytics of your week done by our statistical analysis."
			/>
			<div className="rounded-md border-2 border-slate-200 bg-white mt-8">
				<PlannerHeader beginningPeriod={currentTimeStamp} onMutate={onMutate} />
				{!planner && <p className="text-center text-3xl text-slate-800">Loading...</p>}
				{planner && (
					<YearlyTable
						yearBeginning={currentTimeStamp}
						planner={planner}
						onChangeYear={yearNavigateHandler}
						onMutate={onMutate}
					/>
				)}
			</div>
		</PlannerCard>
	);
};

export default YearlyPlanner;
