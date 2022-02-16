import React, { useContext, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import TaskForm from "./TaskForm";
import PlannerModal from "./PlannerModal";
import { FormTaskObject, PlannerTask, Task } from "../../../models/task-models/Task";
import { deleteTask, updateTask } from "../../../lib/planners/weekly-planner-api";
import { PlannerMode } from "../../../models/planner-models/PlannerMode";
import { NotifStatus } from "../../ui/Notification";
import useNotification from "../../../hooks/useNotification";
import DeleteModal from "../../ui/modal/modal-variation/DeleteModal";
import DiscardModal from "../../ui/modal/modal-variation/DiscardModal";

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

	const { setNotification } = useNotification();
	const [ showDeleteModal, setShowDeleteModal ] = useState(false);
	const [ showDiscardModal, setShowDiscardModal ] = useState(false);

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

		setNotification(NotifStatus.PENDING, `Currently editing task ${newPlannerTask.name}`);
		const { isSuccess } = await updateTask(initialTask.id, newPlannerTask, PlannerMode.WEEKLY);
		if (isSuccess) {
			setNotification(NotifStatus.SUCCESS, `Editing task was successful!`);
		} else {
			setNotification(NotifStatus.ERROR, "Sorry, editing task went wrong...");
		}

		onUpdate();
		onClose();
	};

	const taskDeleteHandler = async () => {
		setShowDeleteModal(false);
		setNotification(NotifStatus.PENDING);
		const { isSuccess } = await deleteTask(initialTask.id, PlannerMode.WEEKLY);
		if (isSuccess) {
			setNotification(NotifStatus.SUCCESS, "Delete task successful!");
		} else {
			setNotification(NotifStatus.ERROR, "Delete task went wrong");
		}
		onUpdate();
	};

	return (
		<PlannerModal onClose={setShowDiscardModal.bind(null, true)} title={"Edit Task"}>
			{showDeleteModal && (
				<DeleteModal
					targetName={initialTask.name}
					onAction={taskDeleteHandler}
					onClose={setShowDeleteModal.bind(null, false)}
				/>
			)}
			{showDiscardModal && (
				<DiscardModal onAction={onClose} onClose={setShowDiscardModal.bind(null, false)} />
			)}
			<TaskForm
				onSubmit={taskEditHandler}
				beginningPeriod={beginningPeriod}
				isEdit={true}
				initialTask={initialTask}
				onDelete={setShowDeleteModal.bind(null, true)}
			/>
		</PlannerModal>
	);
};

export default PlannerTaskAdd;
