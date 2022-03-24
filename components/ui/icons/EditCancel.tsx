import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/pro-duotone-svg-icons";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";

interface Props {
	isEditing: boolean;
	onEdit(edit: boolean): void;
}

const EditCancel: React.FC<Props> = ({ isEditing, onEdit }) => {
	return (
		<div className="absolute right-2 top-2">
			{!isEditing && (
				<FontAwesomeIcon
					icon={faPencilAlt}
					onClick={onEdit.bind(null, true)}
					className={`cursor-pointer text-2xl hover:scale-110 transition-all text-slate-700`}
				/>
			)}
			{isEditing && (
				<FontAwesomeIcon
					icon={faXmark}
					className={`absolute right-2 top-2 cursor-pointer text-2xl hover:scale-110 transition-all text-rose-500`}
					onClick={onEdit.bind(null, false)}
				/>
			)}
		</div>
	);
};

export default EditCancel;
