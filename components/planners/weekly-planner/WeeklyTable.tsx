import React from "react";
import { WeeklyPlanner } from "../../../models/planner-models/Planner";
import TableNav from "../planner-nav/TableNav";
import WeekdayList from "./WeekdayList";

interface Props {
	weekBeginning: Date;
	planner: WeeklyPlanner;
	onChangeWeek: (direction: number) => void;
}

const WeeklyTable: React.FC<Props> = (props) => {
	const { weekBeginning, planner, onChangeWeek } = props;

	return (
		<div>
			<TableNav weekBeginning={weekBeginning} planner={planner} onChangeWeek={onChangeWeek} />
			<WeekdayList weekBeginning={weekBeginning} planner={planner} />
		</div>
	);
};

export default WeeklyTable;
