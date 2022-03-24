import React, { useCallback, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import TaskForm from "./task-form/TaskForm";
import PlannerModal from "../planner-modal/PlannerModal";
import { FormTaskObject, PlannerTask, Task } from "../../../models/task-models/Task";
import { deleteTask, updateTask } from "../../../lib/planners/tasks-api";
import { NotifStatus } from "../../ui/Notification";
import useNotification from "../../../hooks/useNotification";
import DeleteModal from "../../ui/modal/modal-variation/DeleteModal";
import DiscardModal from "../../ui/modal/modal-variation/DiscardModal";
import { PlannerMode } from "../../../models/planner-models/PlannerMode";

interface Props {
	onClose: () => void;
	onUpdate: (updateTask?: PlannerTask) => void;
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

	// For popup model for cancel event.
	const [ userHasEdit, setUserHasEdit ] = useState(false);

	const taskEditHandler = async (newFormTask: FormTaskObject) => {
		if (!userId) {
			alert("User is not logged in!");
			return;
		}
		const newTask: Task = {
			...newFormTask,
			id: initialTask.id,
			comment: initialTask.comment,
			status: initialTask.status,
			plannerType: initialTask.plannerType,
			userId
		};

		const newPlannerTask = new PlannerTask(newTask);
		setNotification(NotifStatus.PENDING, `Currently editing task ${newPlannerTask.name}`);
		const { isSuccess } = await updateTask(
			initialTask.id,
			newPlannerTask,
			initialTask.plannerType || PlannerMode.WEEKLY
		);
		if (isSuccess) {
			setNotification(NotifStatus.SUCCESS, `Editing task was successful!`);
		} else {
			setNotification(NotifStatus.ERROR, "Sorry, editing task went wrong...");
		}

		onUpdate(newPlannerTask);
		onClose();
	};

	const taskDeleteHandler = async () => {
		setShowDeleteModal(false);
		setNotification(NotifStatus.PENDING);
		const { isSuccess } = await deleteTask(
			initialTask.id,
			initialTask.plannerType || PlannerMode.WEEKLY
		);
		if (isSuccess) {
			setNotification(NotifStatus.SUCCESS, "Delete task successful!");
		} else {
			setNotification(NotifStatus.ERROR, "Delete task went wrong");
		}
		onUpdate();
	};

	const closeHandler = useCallback(
		() => {
			if (userHasEdit) setShowDiscardModal(true);
			else onClose();
		},
		[ userHasEdit, onClose ]
	);

	const userHasEditHandler = useCallback(
		(hasEdit: boolean) => {
			setUserHasEdit(hasEdit);
		},
		[ setUserHasEdit ]
	);

	return (
		<PlannerModal onClose={closeHandler} title={"Edit Task"}>
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
				onHasEdit={userHasEditHandler}
				userHasEdit={userHasEdit}
			/>
		</PlannerModal>
	);
};

export default PlannerTaskAdd;
