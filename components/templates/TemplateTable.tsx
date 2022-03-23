import React from "react";
import { TemplatePlanner } from "../../models/template-models/TemplatePlanner";
import WeekdayList from "../planners/weekly-planner/WeekdayList";
import TemplateTableNav from "./TemplateTableNav";

interface Props {
	weekBeginning: Date;
	planner: TemplatePlanner | null;
	onMutate: () => void;
}

const TemplateTable: React.FC<Props> = (props) => {
	const { weekBeginning, planner, onMutate } = props;

	const totalTasks = planner ? planner.allTasks.length : 0;

	return (
		<div>
			<TemplateTableNav planner={planner} />
			<WeekdayList beginningPeriod={weekBeginning} planner={planner} onMutate={onMutate} />
		</div>
	);
};

export default TemplateTable;
