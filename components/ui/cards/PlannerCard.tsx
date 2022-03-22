import React from "react";

const PlannerCard: React.FC = (props) => {
	return <main className="ml-[12.2rem] mt-16 px-4 py-8 flex flex-col">{props.children}</main>;
};

export default PlannerCard;
