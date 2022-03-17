import { useState } from "react";
import { SubTask } from "../../../models/task-models/SubTask";

interface Props {
	subTask: SubTask;
	isEditMode: boolean;
	onEdit: (newTask: SubTask) => void;
	onDelete: (id: string) => void;
}

const SubTaskCard: React.FC<Props> = (props) => {
	const { subTask, onEdit, onDelete, isEditMode } = props;
	const [ currentText, setCurrentText ] = useState<string>(subTask.name);

	return <div>SubTask</div>;
};

export default SubTaskCard;
