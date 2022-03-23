import { WeekDayListFromMonday } from "../../../models/date-models/WeekDay";
import { Planner } from "../../../models/planner-models/Planner";
import TaskListContainer from "../../tasks/TaskListContainer";

interface Props {
	beginningPeriod: Date;
	planner: Planner | null;
	onMutate: () => void;
}

const WeekdayList: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, onMutate } = props;

	return (
		// This component will need to be centered
		<div className="ml-5">
			{WeekDayListFromMonday.map((day, idx) => {
				const tasks = planner ? planner.getTasks(day) : [];

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

export default WeekdayList;
