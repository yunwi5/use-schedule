import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useSelector, RootStateOrAny } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import TaskForm from "./task-form/TaskForm";
import PlannerModal from "../planner-modal/PlannerModal";
import DiscardModal from "../../ui/modal/modal-variation/DiscardModal";
import { NotifStatus } from "../../ui/Notification";
import { FormTaskObject, PlannerTask, Task } from "../../../models/task-models/Task";
import { postTask } from "../../../lib/planners/planners-api";
import useNotification from "../../../hooks/useNotification";

interface Props {
	onClose: () => void;
	onAddTask: (newTask: PlannerTask) => void;
	beginningPeriod: Date;
}

const PlannerTaskAdd: React.FC<Props> = (props) => {
	const { onClose, onAddTask, beginningPeriod } = props;
	const { user } = useUser();
	const userId = user ? user.sub : null;

	const { plannerMode } = useSelector((state: RootStateOrAny) => state.planner);

	const { setNotification } = useNotification();
	const [ showDiscardModal, setShowDiscardModal ] = useState(false);

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

		setNotification(NotifStatus.PENDING);
		const { isSuccess, insertedId } = await postTask(newPlannerTask, plannerMode);
		if (isSuccess) {
			setNotification(NotifStatus.SUCCESS);
		} else {
			setNotification(NotifStatus.ERROR);
		}

		if (insertedId) newPlannerTask.id = insertedId;
		onAddTask(newPlannerTask);
		onClose();
	};

	return (
		<PlannerModal onClose={setShowDiscardModal.bind(null, true)} title={"Add New Task"}>
			{showDiscardModal && (
				<DiscardModal onAction={onClose} onClose={setShowDiscardModal.bind(null, false)} />
			)}
			<TaskForm onSubmit={taskAddHandler} beginningPeriod={beginningPeriod} />
		</PlannerModal>
	);
};

export default PlannerTaskAdd;
