import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/pro-duotone-svg-icons";
import { faCheck, faXmark } from "@fortawesome/pro-solid-svg-icons";

import classes from "./IconEdit.module.scss";

interface Props {
	isEditing: boolean;
	onEdit: () => void;
	onCheck: () => void;
	onCancel: () => void;
}

const IconEdit: React.FC<Props> = (props) => {
	const { isEditing, onEdit, onCheck, onCancel } = props;

	return (
		<div>
			{!isEditing && (
				<FontAwesomeIcon
					icon={faPencilAlt}
					onClick={onEdit}
					className={`${classes.icon} text-slate-700`}
				/>
			)}
			{isEditing && (
				<Fragment>
					<FontAwesomeIcon
						icon={faCheck}
						onClick={onCheck}
						className={`${classes.icon} -translate-x-5 text-teal-600`}
					/>
					<FontAwesomeIcon
						icon={faXmark}
						className={`${classes.icon} text-rose-600`}
						onClick={onCancel}
					/>
				</Fragment>
			)}
		</div>
	);
};

export default IconEdit;
