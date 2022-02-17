import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsFilter } from "@fortawesome/pro-solid-svg-icons";

// More features will be added as the filter part is getting implemented.
const PlannerFilter: React.FC = () => {
	return (
		<div className="flex items-center mr-auto ml-8">
			Filter
			<button className="flex justify-center items-center bg-slate-500 hover:bg-slate-500 text-white ml-2  w-11 h-11 rounded-full">
				<FontAwesomeIcon icon={faBarsFilter} className="max-w-[1.3rem] text-xl" />
			</button>
		</div>
	);
};

export default PlannerFilter;
