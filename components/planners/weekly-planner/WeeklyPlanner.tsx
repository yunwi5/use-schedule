import React from "react";
import { getCurrentWeekBeginning } from "../../../utilities/time-utils/date-get";
import PlannerHeader from "../planner-nav/PlannerHeader";
import WeeklyTable from "./WeeklyTable";

const WeeklyPlanner: React.FC = () => {
	const weekBeginning = getCurrentWeekBeginning();

	return (
		<main className="ml-[12.2rem] mt-16">
			{/* <div className="flex text-gray-700 text-lg">
				<div className="text-center px-3 py-2 rounded-t-xl bg-white bg-gray-200/50 w-[10rem]">
					Time Planner
				</div>
				<div className="text-center px-3 py-2 rounded-t-xl bg-gray-200/50">Statistics</div>
			</div> */}
			<PlannerHeader />
			<WeeklyTable weekBeginning={weekBeginning} />
		</main>
	);
};

export default WeeklyPlanner;
