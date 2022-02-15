import { WeekDayListFromMonday } from "../../../models/date-models/WeekDay";
import { WeeklyPlanner } from "../../../models/planner-models/Planner";
import TaskList from "../../tasks/TaskList";

interface Props {
	beginningPeriod: Date;
	planner: WeeklyPlanner;
	onMutate: () => void;
}

const WeekdayList: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, onMutate } = props;

	return (
		// This component will need to be centered
		<div className="ml-10">
			{WeekDayListFromMonday.map((day, idx) => (
				<TaskList
					key={idx}
					day={day}
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
