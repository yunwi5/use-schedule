import PlannerTaskCard from "../tasks/PlannerTaskCard";
import { PlannerTask } from "../../models/task-models/Task";
import { PlannerMode } from "../../models/planner-models/PlannerMode";
import {
	getCurrentMonthBeginning,
	getCurrentWeekBeginning,
	getCurrentYearBeginning
} from "../../utilities/time-utils/date-get";
import classes from "./SearchTaskList.module.scss";
import { getTaskType } from "../../utilities/tasks-utils/task-label";

interface Props {
	tasks: PlannerTask[];
}

const SearchTaskList: React.FC<Props> = (props) => {
	const { tasks } = props;

	const weekBeginning = getCurrentWeekBeginning();
	const monthBeginning = getCurrentMonthBeginning();
	const yearBeginning = getCurrentYearBeginning();

	return (
		<ul className={classes["search-list"]}>
			{tasks.map((task) => {
				return (
					<div key={task.id}>
						<div className={`${classes.label} ${classes["label-" + task.plannerType]}`}>
							{getTaskType(task.plannerType) || "? Task"}
						</div>
						<PlannerTaskCard
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
					</div>
				);
			})}
		</ul>
	);
};

export default SearchTaskList;
