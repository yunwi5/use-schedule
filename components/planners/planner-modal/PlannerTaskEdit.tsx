import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

import { FormTaskObject, PlannerTask, Task } from "../../../models/task-models/Task";
import TaskForm from "./TaskForm";
import PlannerModal from "./PlannerModal";
import { updateTask } from "../../../lib/planners/weekly-planner-api";

interface Props {
	onClose: () => void;
	onEditTask: (newTask: PlannerTask) => void;
	beginningPeriod: Date;
	initialTask: Task;
}

const PlannerTaskAdd: React.FC<Props> = (props) => {
	const { onClose, onEditTask, beginningPeriod, initialTask } = props;
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

		const { isSuccess } = await updateTask(initialTask.id, newPlannerTask);
		if (isSuccess) {
			alert("Update Successful!");
		} else {
			alert("Update went wrong...");
		}

		onEditTask(newPlannerTask);
		onClose();
	};

	const taskDeleteHandler = async () => {
		console.log("Delete the task", initialTask.name);
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
