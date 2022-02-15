import React from "react";
import { WeeklyPlanner } from "../../../models/planner-models/Planner";
import { TaskStatus } from "../../../models/task-models/Status";
import { getWeekEnding } from "../../../utilities/time-utils/date-get";
import { getMonth } from "../../../utilities/time-utils/month-util";
import { getTaskStatusCount } from "../../../utilities/tasks-utils/task-status-util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/pro-duotone-svg-icons";

interface Props {
	weekBeginning: Date;
	planner: WeeklyPlanner;
	onChangeWeek: (direction: number) => void;
}

// Manages week navigation & tasks status overview
const TableNav: React.FC<Props> = (props) => {
	const { weekBeginning, planner, onChangeWeek } = props;
	const weekEnding = getWeekEnding(weekBeginning);

	const beginDate = weekBeginning.getDate();
	const beginMonth = getMonth(weekBeginning);
	const endDate = weekEnding.getDate();
	const endMonth = getMonth(weekEnding);

	const totalTasks = planner.allTasks.length;
	const { openedTasks, completedTasks, progressTasks, overDueTasks } = getTaskStatusCount(
		planner
	);

	return (
		<div className="mt-2 ml-2 flex items-center justify-between p-3">
			<div className="flex items-center gap-1 text-xl">
				<FontAwesomeIcon
					className="text-4xl cursor-pointer max-w-[1.2rem]"
					icon={faCaretLeft}
					onClick={onChangeWeek.bind(null, -1)}
				/>
				<p>
					{beginDate}/{beginMonth} ~ {endDate}/{endMonth}
				</p>
				<FontAwesomeIcon
					className="text-4xl cursor-pointer max-w-[1.2rem]"
					icon={faCaretRight}
					onClick={onChangeWeek.bind(null, 1)}
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
