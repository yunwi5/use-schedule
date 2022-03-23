import React from "react";

const TableNavCard: React.FC = (props) => {
	return <div className="mt-2 ml-2 flex items-center justify-between p-3">{props.children}</div>;
};

export default TableNavCard;
