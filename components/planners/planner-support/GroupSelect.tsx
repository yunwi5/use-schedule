import React from "react";

// Currently not being used.
const GroupSelect: React.FC = () => {
	return (
		<div>
			<span>Group by</span>
			<select className="ml-2 py-2 px-3">
				<option>Day</option>
				<option>Importance</option>
				<option>Status</option>
			</select>
		</div>
	);
};

export default GroupSelect;
