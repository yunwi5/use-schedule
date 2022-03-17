import { useRef } from "react";

interface Props {
	onAdd: (name: string) => void;
}

const SubTaskForm: React.FC<Props> = ({ onAdd }) => {
	return (
		<div>
			<input
				type="text"
				placeholder="Add Sub Task"
				id="subtask-input"
				name="subtask-input"
				className=""
			/>
		</div>
	);
};

export default SubTaskForm;
