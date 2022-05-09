import React from "react";

import { Size, Theme } from "../../../../models/design-models";
import Button from "../../../ui/buttons/Button";
import classes from "./TaskForm.module.scss";

interface Props {
	isEdit?: boolean;
	onDelete?: () => void;
}

const FormButtons: React.FC<Props> = (props) => {
	const { isEdit, onDelete } = props;

	return (
		<div className={classes.btns}>
			<Button className="" theme={Theme.PRIMARY} size={Size.MEDIUM_LARGE} type="submit">
				Confirm
			</Button>
			{isEdit &&
			onDelete && (
				<Button
					theme={Theme.DANGER}
					size={Size.MEDIUM_LARGE}
					type="button"
					onClick={onDelete}
				>
					Delete
				</Button>
			)}
		</div>
	);
};

export default FormButtons;
