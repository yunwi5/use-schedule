import React from "react";
import TableNav from "../planner-nav/TableNav";
import WeekdayList from "./WeekdayList";

const WeeklyTable: React.FC = () => {
	return (
		<div>
			<TableNav />
			<WeekdayList />
		</div>
	);
};

export default WeeklyTable;
