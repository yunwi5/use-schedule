import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useSelector, RootStateOrAny } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import TaskForm from "./TaskForm";
import PlannerModal from "./PlannerModal";
import { NotifStatus } from "../../ui/Notification";
import { FormTaskObject, PlannerTask, Task } from "../../../models/task-models/Task";
import { postTask } from "../../../lib/planners/planners-api";
import useNotification from "../../../hooks/useNotification";
import useLogger from "../../../hooks/useLogger";

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
	// useLogger(plannerMode);

	const { setNotification } = useNotification();

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
		<PlannerModal onClose={onClose} title={"Add New Task"}>
			<TaskForm onSubmit={taskAddHandler} beginningPeriod={beginningPeriod} />
		</PlannerModal>
	);
};

export default PlannerTaskAdd;
