import React from "react";
import { WeekDayListFromMonday } from "../../../models/date-models/WeekDay";
import { WeeklyPlanner } from "../../../models/planner-models/Planner";
import TaskList from "../../tasks/TaskList";

interface Props {
	weekBeginning: Date;
	planner: WeeklyPlanner;
	onMutate: () => void;
}

const WeekdayList: React.FC<Props> = (props) => {
	const { weekBeginning, planner, onMutate } = props;

	return (
		<div className="">
			{WeekDayListFromMonday.map((day, idx) => (
				<TaskList
					key={idx}
					day={day}
					weekBeginning={weekBeginning}
					planner={planner}
					index={idx}
					onMutate={onMutate}
				/>
			))}
		</div>
	);
};

export default WeekdayList;
