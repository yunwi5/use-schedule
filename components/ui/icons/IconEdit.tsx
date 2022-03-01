import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/pro-duotone-svg-icons";
import { faCheck, faXmark } from "@fortawesome/pro-solid-svg-icons";

import classes from "./IconEdit.module.scss";
import { Size } from "../../../models/design-models";

interface Props {
	isEditing: boolean;
	onEdit: () => void;
	onCheck: () => void;
	onCancel: () => void;
    size?: Size;
}

const IconEdit: React.FC<Props> = (props) => {
	const { isEditing, onEdit, onCheck, onCancel, size = Size.MEDIUM } = props;

	return (
		<>
			{!isEditing && (
				<FontAwesomeIcon
					icon={faPencilAlt}
					onClick={onEdit}
					className={`${classes.icon} ${classes['icon-' + size]} text-slate-700`}
				/>
			)}
			{isEditing && (
				<Fragment>
					<FontAwesomeIcon
						icon={faCheck}
						onClick={onCheck}
						className={`${classes.icon} ${classes['icon-' + size]} -translate-x-5 text-teal-600`}
					/>
					<FontAwesomeIcon
						icon={faXmark}
						className={`${classes.icon} ${classes['icon-' + size]} text-rose-600`}
						onClick={onCancel}
					/>
				</Fragment>
			)}
		</>
	);
};

export default IconEdit;
