import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { v4 as uuidv4 } from "uuid";

import { FormTaskObject, PlannerTask, Task } from "../../../models/task-models/Task";
import TaskForm from "./TaskForm";
import PlannerModal from "./PlannerModal";
import { postTask } from "../../../lib/planners/weekly-planner-api";
import { PlannerMode } from "../../../models/planner-models/PlannerMode";

interface Props {
	onClose: () => void;
	onAddTask: (newTask: PlannerTask) => void;
	beginningPeriod: Date;
}

const PlannerTaskAdd: React.FC<Props> = (props) => {
	const { onClose, onAddTask, beginningPeriod } = props;
	const { user } = useUser();
	const userId = user ? user.sub : null;

	const taskAddHandler = async (newFormTask: FormTaskObject) => {
		if (!userId) {
			alert("User is not logged in!");
			return;
		}
		console.log("new form task:", newFormTask);
		const newTask: Task = {
			...newFormTask,
			id: uuidv4(),
			userId
		};

		const newPlannerTask = new PlannerTask(newTask);

		const { isSuccess, insertedId } = await postTask(newPlannerTask, PlannerMode.WEEKLY);
		if (isSuccess) {
			alert("Post Task successful");
		} else {
			alert("Post Task went wrong");
		}

		if (insertedId) newPlannerTask.id = insertedId;
		onAddTask(newPlannerTask);
		onClose();
	};

	return (
		<PlannerModal onClose={onClose} title={"Add New Task"}>
			<TaskForm onSubmit={taskAddHandler} beginningPeriod={beginningPeriod} />
		</PlannerModal>
	);
};

export default PlannerTaskAdd;
