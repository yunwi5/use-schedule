import TableNav from "../planner-nav/TableNav";
import WeekdayList from "./WeekdayList";
import { WeeklyPlanner } from "../../../models/planner-models/Planner";

interface Props {
	weekBeginning: Date;
	planner: WeeklyPlanner;
	onChangeWeek: (direction: number) => void;
	onMutate: () => void;
}

const WeeklyTable: React.FC<Props> = (props) => {
	const { weekBeginning, planner, onChangeWeek, onMutate } = props;

	return (
		<div>
			<TableNav weekBeginning={weekBeginning} planner={planner} onChangeWeek={onChangeWeek} />
			<WeekdayList beginningPeriod={weekBeginning} planner={planner} onMutate={onMutate} />
		</div>
	);
};

export default WeeklyTable;
