import React from "react";
import { Task } from "../../../models/task-models/Task";
import Modal from "../../ui/modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import classes from "./PlannerModal.module.scss";

interface Props {
	onClose: () => void;
	onAddTask: (newTask: Task) => void;
}

const PlannerTaskAdd: React.FC<Props> = (props) => {
	const { onClose, onAddTask } = props;

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<Modal onClose={onClose} classes="fixed top-[2.5rem] right-[-.5rem] h-[100vh] w-[40vw]">
			<form className={classes.modal} onSubmit={submitHandler}>
				<div className={classes.heading}>
					<FontAwesomeIcon
						onClick={onClose}
						icon={faArrowRight}
						className={`${classes.icon}`}
					/>
					<h3>Add New Task!</h3>
				</div>

				<div className={classes.body}>
					<div className={classes.name}>
						<label htmlFor="name">Name</label>
						<input type="text" id="name" />
					</div>
				</div>
			</form>
		</Modal>
	);
};

export default PlannerTaskAdd;
