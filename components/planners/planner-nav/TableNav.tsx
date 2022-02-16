import React from "react";
import { Planner } from "../../../models/planner-models/Planner";
import {
	getMonthWeekBeginning,
	getMonthWeekEnding,
	getWeekEnding,
	getYearEnding
} from "../../../utilities/time-utils/date-get";
import { getMonth } from "../../../utilities/time-utils/month-util";
import { getTaskStatusCount } from "../../../utilities/tasks-utils/task-status-util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/pro-duotone-svg-icons";
import { PlannerMode } from "../../../models/planner-models/PlannerMode";

interface Props {
	beginningPeriod: Date;
	planner: Planner;
	plannerMode: PlannerMode;
	onChangePeriod: (direction: number) => void;
}

function getPeriodFormat (beginningPeriod: Date, endingPeriod: Date): string {
	const beginDate = beginningPeriod.getDate();
	const beginMonth = getMonth(beginningPeriod);
	const endDate = endingPeriod.getDate();
	const endMonth = getMonth(endingPeriod);
	return `${beginDate}/${beginMonth} ~ ${endDate}/${endMonth}`;
}

function getNavigationPeriod (beginningPeriod: Date, plannerMode: PlannerMode) {
	let navPeriod = "";
	if (plannerMode === PlannerMode.WEEKLY) {
		const weekEnding = getWeekEnding(beginningPeriod);
		navPeriod = getPeriodFormat(beginningPeriod, weekEnding);
	} else if (plannerMode === PlannerMode.MONTLY) {
		const monthWeekBeginning = getMonthWeekBeginning(beginningPeriod);
		const monthWeekEnding = getMonthWeekEnding(beginningPeriod);
		navPeriod = getPeriodFormat(monthWeekBeginning, monthWeekEnding);
	} else {
		const yearEnding = getYearEnding(beginningPeriod);
		navPeriod = getPeriodFormat(beginningPeriod, yearEnding);
	}
	return navPeriod;
}

// Manages week navigation & tasks status overview
const TableNav: React.FC<Props> = (props) => {
	const { beginningPeriod, planner, onChangePeriod, plannerMode } = props;

	const totalTasks = planner.allTasks.length;
	const { openedTasks, completedTasks, progressTasks, overDueTasks } = getTaskStatusCount(
		planner
	);

	const navPeriod = getNavigationPeriod(beginningPeriod, plannerMode);

	return (
		<div className="mt-2 ml-2 flex items-center justify-between p-3">
			<div className="flex items-center gap-1 text-xl">
				<FontAwesomeIcon
					className="text-4xl cursor-pointer max-w-[1.2rem]"
					icon={faCaretLeft}
					onClick={onChangePeriod.bind(null, -1)}
				/>
				<p>{navPeriod}</p>
				<FontAwesomeIcon
					className="text-4xl cursor-pointer max-w-[1.2rem]"
					icon={faCaretRight}
					onClick={onChangePeriod.bind(null, 1)}
				/>
			</div>

			<div className="flex gap-5 text-lg">
				<span className="py-2 px-4 rounded-full bg-slate-50 hover:bg-slate-400 hover:text-slate-50 text-slate-600">
					{totalTasks} Tasks Total
				</span>
				<span className="py-2 px-4 rounded-full bg-teal-50 hover:bg-teal-400 text-teal-600 hover:text-teal-50">
					{openedTasks} Tasks Opened
				</span>
				<span className="py-2 px-4 rounded-full bg-sky-50 hover:bg-sky-400 text-sky-600 hover:text-sky-50">
					{completedTasks} Tasks Completed
				</span>
				<span className="py-2 px-4 rounded-full bg-indigo-50 hover:bg-indigo-400 text-indigo-600 hover:text-indigo-50">
					{progressTasks} Tasks In Progress
				</span>
				<span className="py-2 px-4 rounded-full bg-red-50 hover:bg-red-400 text-red-600 hover:text-red-50">
					{overDueTasks} Tasks Overdue
				</span>
			</div>
		</div>
	);
};

export default TableNav;
