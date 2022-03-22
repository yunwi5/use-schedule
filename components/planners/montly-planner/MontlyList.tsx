import { MontlyPlanner } from "../../../models/planner-models/MontlyPlanner";
import TaskListContainer from "../../tasks/TaskListContainer";
import {
	getWeekFromIndex,
	getWeekNumber,
	WeekNumber,
	WeekNumberListFromWeek1
} from "../../../models/date-models/WeekNumber";
import { getNumberOfWeeks } from "../../../utilities/time-utils/month-util";

interface Props {
	beginningPeriod: Date;
	planner: MontlyPlanner;
	onMutate: () => void;
}

const MontlyList: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, onMutate } = props;

	const numberOfWeeks = getNumberOfWeeks(beginningPeriod);

	return (
		// This component will need to be centered
		<div className="ml-5">
			{WeekNumberListFromWeek1.map((week, idx) => {
				const isWeekAny = week === WeekNumber.ANY;
				const currentWeekNumber = getWeekNumber(week);

				if (!isWeekAny && currentWeekNumber > numberOfWeeks) return;

				const weekNumber: WeekNumber = getWeekFromIndex(idx);
				const tasks = planner.getTasks(weekNumber);

				return (
					<TaskListContainer
						key={idx}
						beginningPeriod={beginningPeriod}
						index={idx}
						onMutate={onMutate}
						tasks={tasks}
					/>
				);
			})}
		</div>
	);
};

export default MontlyList;
