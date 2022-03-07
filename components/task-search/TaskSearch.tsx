import React from "react";
import { PlannerMode } from "../../models/planner-models/PlannerMode";
import { PlannerTask } from "../../models/task-models/Task";
import {
	getCurrentMonthBeginning,
	getCurrentWeekBeginning,
	getCurrentYearBeginning
} from "../../utilities/time-utils/date-get";
import PlannerTaskCard from "../tasks/PlannerTaskCard";

interface Props {
	searchWord: string;
	searchedTasks: PlannerTask[];
}

const TaskSearch: React.FC<Props> = (props) => {
	const { searchWord, searchedTasks } = props;

	const weekBeginning = getCurrentWeekBeginning();
	const monthBeginning = getCurrentMonthBeginning();
	const yearBeginning = getCurrentYearBeginning();

	// onMutate function may be needed to update the task when the user edits it.
	// TaskCard component has TaskEdit componenet/functionality attached.

	return (
		<main className="mt-10 max-w-fit mx-auto">
			<h2>Tasks that match your search &quot;{searchWord}&quot;</h2>
			<ul>
				{searchedTasks.map((task) => (
					<PlannerTaskCard
						key={task.id}
						beginningPeriod={
							task.plannerType === PlannerMode.WEEKLY ? (
								weekBeginning
							) : task.plannerType === PlannerMode.MONTLY ? (
								monthBeginning
							) : (
								yearBeginning
							)
						}
						onMutate={() => {}}
						task={task}
					/>
				))}
			</ul>
		</main>
	);
};

export default TaskSearch;
