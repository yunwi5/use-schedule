import { useState } from "react";
import { SubTask } from "../../../models/task-models/SubTask";
import SubTaskCard from "./SubTaskCard";

interface Props {
	subTasks: SubTask[];
}

const SubTaskList: React.FC<Props> = (props) => {
	const { subTasks } = props;
	const [ isEditMode, setIsEditMode ] = useState(false);

	const editSubTaskHandler = (newSubTask: SubTask) => {
		console.log("Updated Task:", newSubTask);
	};

	const deleteSubTaskHandler = (id: string) => {
		console.log(`Delete id: ${id}`);
	};

	return (
		<div className="">
			<ul>
				{subTasks.map((subTask) => (
					<SubTaskCard
						key={subTask.id}
						subTask={subTask}
						isEditMode={isEditMode}
						onEdit={editSubTaskHandler}
						onDelete={deleteSubTaskHandler}
					/>
				))}
			</ul>
		</div>
	);
};

export default SubTaskList;
