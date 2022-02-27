import { MontlyPlanner } from "../../../models/planner-models/MontlyPlanner";
import TaskListContainer from "../../tasks/TaskListContainer";
import {
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
	// console.log(`numberOfWeeks: ${numberOfWeeks}`);

	return (
		// This component will need to be centered
		<div className="ml-5">
			{WeekNumberListFromWeek1.map((week, idx) => {
				const isWeekAny = week === WeekNumber.ANY;
				const currentWeekNumber = getWeekNumber(week);

				if (!isWeekAny && currentWeekNumber > numberOfWeeks) return;

				return (
					<TaskListContainer
						key={idx}
						beginningPeriod={beginningPeriod}
						planner={planner}
						index={idx}
						onMutate={onMutate}
					/>
				);
			})}
		</div>
	);
};

export default MontlyList;
