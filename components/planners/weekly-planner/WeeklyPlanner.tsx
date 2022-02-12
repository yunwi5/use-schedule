import React from "react";
import PlannerHeader from "../planner-nav/PlannerHeader";
import WeeklyTable from "./WeeklyTable";

const WeeklyPlanner: React.FC = () => {
	return (
		<main className="ml-[12.2rem]">
			{/* <div className="flex text-gray-700 text-lg">
				<div className="text-center px-3 py-2 rounded-t-xl bg-white bg-gray-200/50 w-[10rem]">
					Time Planner
				</div>
				<div className="text-center px-3 py-2 rounded-t-xl bg-gray-200/50">Statistics</div>
			</div> */}
			<PlannerHeader />
			<WeeklyTable />
		</main>
	);
};

export default WeeklyPlanner;
