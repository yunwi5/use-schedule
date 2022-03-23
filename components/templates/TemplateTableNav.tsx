import React from "react";

import { TemplatePlanner } from "../../models/template-models/TemplatePlanner";
import TableNavCard from "../ui/cards/TableNavCard";

interface Props {
	planner: TemplatePlanner | null;
}

const TemplateTableNav: React.FC<Props> = ({ planner }) => {
	const totalTasks = planner ? planner.allTasks.length : 0;

	return (
		<TableNavCard>
			<p className="text-xl text-slate-700">Template Table</p>
			<div className="text-lg">
				<span className="py-2 px-4 rounded-full bg-slate-50 hover:bg-slate-400 hover:text-slate-50 text-slate-600">
					{totalTasks} Tasks Total
				</span>
			</div>
		</TableNavCard>
	);
};

export default TemplateTableNav;
