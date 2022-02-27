import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { plannerActions } from "../../../store/redux/planner-slice";
import IntroPanel from "../planner-nav/IntroPanel";
import MontlyTable from "./MontlyTable";
import PlannerHeader from "../planner-nav/PlannerHeader";
import { PlannerTask, Task } from "../../../models/task-models/Task";
import { MontlyPlanner as Planner } from "../../../models/planner-models/MontlyPlanner";
import { PlannerMode } from "../../../models/planner-models/PlannerMode";
import { getCurrentMonthBeginning } from "../../../utilities/time-utils/date-get";
import { isSameMonth, isSameYear } from "../../../utilities/time-utils/date-classify";
import useDateTime, { ResetPeriod } from "../../../hooks/useDateTime";

interface Props {
	// Not constructed as planner tasks yet.
	montlyTasks: Task[];
	onMutate: () => void;
}

function populateMontlyPlanner (tasks: Task[], monthBeginning: Date): Planner {
	const planner = new Planner(monthBeginning);

	for (const task of tasks) {
		const taskDate = new Date(task.timeString);
		const sameYear = isSameYear(monthBeginning, taskDate);
		const sameMonth = isSameMonth(monthBeginning, taskDate);

		if (sameMonth && sameYear) {
			const plannerTask = new PlannerTask(task);
			plannerTask.plannerType = PlannerMode.MONTLY;
			planner.addTask(plannerTask);
		}
	}

	return planner;
}

const MontlyPlanner: FC<Props> = ({ montlyTasks: initialTasks, onMutate }) => {
	const [ planner, setPlanner ] = useState<Planner | null>(null);

	const dispatch = useDispatch();

	const monthBeginning = getCurrentMonthBeginning();

	const { currentTimeStamp, addMonths: addLocalMonths } = useDateTime(monthBeginning);

	console.log(`currentTimeStamp: ${currentTimeStamp}`);

	useEffect(
		() => {
			const newPlanner = populateMontlyPlanner(initialTasks, currentTimeStamp);
			setPlanner(newPlanner);
		},
		[ initialTasks, currentTimeStamp ]
	);

	useEffect(() => {
		dispatch(plannerActions.setPlannerMode(PlannerMode.MONTLY));
	}, []);

	const monthNaviagtionHandler = (direction: number) => {
		if (direction !== 1 && direction !== -1) throw new Error("Direction parameter is wrong!");
		// Hook fn call
		addLocalMonths(direction);
	};

	return (
		<main className="ml-[12.2rem] mt-16 px-4 py-8 flex flex-col">
			<IntroPanel
				title="Montly Planner"
				message="Make your month strong and facinating with regularly planned montly goals and schedules. Feel free to see the analytics of your week done by our statistical analysis."
			/>
			<div className="rounded-md border-2 border-slate-200 bg-white mt-8">
				<PlannerHeader beginningPeriod={currentTimeStamp} onMutate={onMutate} />
				{!planner && <p className="text-center text-3xl text-slate-800">Loading...</p>}
				{planner && (
					<MontlyTable
						monthBeginning={currentTimeStamp}
						planner={planner}
						onChangeMonth={monthNaviagtionHandler}
						onMutate={onMutate}
					/>
				)}
			</div>
		</main>
	);
};

export default MontlyPlanner;
