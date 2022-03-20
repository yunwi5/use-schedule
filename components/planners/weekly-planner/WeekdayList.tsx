import { WeekDayListFromMonday } from "../../../models/date-models/WeekDay";
import { WeeklyPlanner } from "../../../models/planner-models/WeeklyPlanner";
import { Planner } from "../../../models/planner-models/Planner";
import TaskListContainer from "../../tasks/TaskListContainer";

interface Props {
	beginningPeriod: Date;
	planner: Planner;
	onMutate: () => void;
}

const WeekdayList: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, onMutate } = props;

	return (
		// This component will need to be centered
		<div className="ml-5">
			{WeekDayListFromMonday.map((day, idx) => (
				<TaskListContainer
					key={idx}
					beginningPeriod={beginningPeriod}
					planner={planner}
					index={idx}
					onMutate={onMutate}
				/>
			))}
		</div>
	);
};

export default WeekdayList;
