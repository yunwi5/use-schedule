import React from "react";

const PlannerTableCard: React.FC = (props) => {
	return (
		<section className="rounded-md border-2 border-slate-200 bg-white mt-8">
			{props.children}
		</section>
	);
};

export default PlannerTableCard;
