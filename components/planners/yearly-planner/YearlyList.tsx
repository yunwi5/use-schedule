import { MonthListFromJan } from "../../../models/date-models/Month";
import { YearlyPlanner } from "../../../models/planner-models/YearlyPlanner";
import TaskListContainer from "../../tasks/TaskListContainer";

interface Props {
	beginningPeriod: Date;
	planner: YearlyPlanner;
	onMutate: () => void;
}

const YearlyList: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, onMutate } = props;

	return (
		// This component will need to be centered
		<div className="ml-5">
			{MonthListFromJan.map((month, idx) => (
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

export default YearlyList;
