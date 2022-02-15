import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

import { FormTaskObject, PlannerTask, Task } from "../../../models/task-models/Task";
import TaskForm from "./TaskForm";
import PlannerModal from "./PlannerModal";
import { deleteTask, updateTask } from "../../../lib/planners/weekly-planner-api";
import { PlannerMode } from "../../../models/planner-models/PlannerMode";

interface Props {
	onClose: () => void;
	onUpdate: () => void;
	beginningPeriod: Date;
	initialTask: Task;
}

const PlannerTaskAdd: React.FC<Props> = (props) => {
	const { onClose, onUpdate, beginningPeriod, initialTask } = props;
	const { user } = useUser();
	const userId = user ? user.sub : null;

	const taskEditHandler = async (newFormTask: FormTaskObject) => {
		if (!userId) {
			alert("User is not logged in!");
			return;
		}
		const newTask: Task = {
			...newFormTask,
			id: initialTask.id,
			userId
		};

		const newPlannerTask = new PlannerTask(newTask);

		const { isSuccess } = await updateTask(initialTask.id, newPlannerTask, PlannerMode.WEEKLY);
		if (isSuccess) {
			alert("Update Successful!");
		} else {
			alert("Update went wrong...");
		}

		onUpdate();
		onClose();
	};

	const taskDeleteHandler = async () => {
		console.log("Delete the task", initialTask.name);
		const { isSuccess } = await deleteTask(initialTask.id, PlannerMode.WEEKLY);
		if (isSuccess) {
			alert("Delete task successful!");
		} else {
			alert("Delete task went wrong");
		}
		onUpdate();
	};

	return (
		<PlannerModal onClose={onClose} title={"Edit Task"}>
			<TaskForm
				onSubmit={taskEditHandler}
				beginningPeriod={beginningPeriod}
				isEdit={true}
				initialTask={initialTask}
				onDelete={taskDeleteHandler}
			/>
		</PlannerModal>
	);
};

export default PlannerTaskAdd;
