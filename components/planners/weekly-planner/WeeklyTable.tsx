import React from "react";
import TableNav from "../planner-nav/TableNav";
import WeekdayList from "./WeekdayList";

interface Props {
	weekBeginning: Date;
}

const WeeklyTable: React.FC<Props> = (props) => {
	const { weekBeginning } = props;

	return (
		<div>
			<TableNav weekBeginning={weekBeginning} />
			<WeekdayList weekBeginning={weekBeginning} />
		</div>
	);
};

export default WeeklyTable;
