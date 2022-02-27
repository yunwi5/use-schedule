import TableNav from "../planner-nav/TableNav";
import YearlyList from "./YearlyList";
import { YearlyPlanner } from "../../../models/planner-models/YearlyPlanner";

interface Props {
	yearBeginning: Date;
	planner: YearlyPlanner;
	onChangeYear: (direction: number) => void;
	onMutate: () => void;
}

const YearlyTable: React.FC<Props> = (props) => {
	const { yearBeginning, planner, onChangeYear, onMutate } = props;

	return (
		<div>
			<TableNav
				beginningPeriod={yearBeginning}
				planner={planner}
				onChangePeriod={onChangeYear}
			/>
			<YearlyList beginningPeriod={yearBeginning} planner={planner} onMutate={onMutate} />
		</div>
	);
};

export default YearlyTable;
