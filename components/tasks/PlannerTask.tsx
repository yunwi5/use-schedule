import React from "react";
import { Task } from "../../models/task-models/Task";

interface Props {
	task: Task;
}

const PlannerTask: React.FC<Props> = (props) => {
	const { task } = props;

	return <div>PlannerTask</div>;
};

export default PlannerTask;
