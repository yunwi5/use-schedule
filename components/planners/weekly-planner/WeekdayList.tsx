import React from "react";
import { WeekDayList } from "../../../models/date-models/WeekDay";
import { addDays } from "../../../utilities/time-utils/date-control";
import { getMonth } from "../../../utilities/time-utils/month-util";

interface Props {
	weekBeginning: Date;
}

const WeekdayList: React.FC<Props> = (props) => {
	const { weekBeginning } = props;

	return (
		<div className="">
			{WeekDayList.map((day, idx) => {
				const curr = addDays(weekBeginning, idx);
				const currMonth = getMonth(curr);
				const currDate = curr.getDate();

				return (
					<div key={idx} className="ml-4 my-4">
						<div className="flex items-center gap-3">
							<div className="px-2 pt-[5px] pb-3 bg-gray-500 text-white w-16 h-16 rounded-md flex flex-col items-center">
								<span className="text-2xl">{currDate}</span>
								<span>{currMonth}</span>
							</div>
							<p className="text-2xl font-semibold text-slate-700/70">{day}</p>
						</div>
						<ul />
						{/* Task card */}
					</div>
				);
			})}
		</div>
	);
};

export default WeekdayList;
