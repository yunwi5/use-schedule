import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FormTaskObject, Task } from "../../../../models/task-models/Task";
import { Size, Theme } from "../../../../models/design-models";
import {
	CategoryList,
	getSubCategory,
	Category,
	SubCategory
} from "../../../../models/task-models/Category";
import Button from "../../../ui/Button";
import {
	FormValues,
	getInitialEndtimeInput,
	getFormTaskObject
} from "../../../../utilities/form-utils/task-form-util";
import classes from "./TaskForm.module.scss";
import GeneralInputs from "./GeneralInputs";
import DurationInput from "./DurationInput";
import PlanTimeInput from "./PlanTimeInput";
import DueDateInput from "./DueDateInput";
import { getWeekEnding } from "../../../../utilities/time-utils/date-get";

interface Props {
	onSubmit: (newTask: FormTaskObject) => void;
	beginningPeriod: Date;
	onHasEdit: (hasEdit: boolean) => void;
	isEdit?: boolean;
	initialTask?: Task;
	onDelete?: () => void;
}

const TaskForm: React.FC<Props> = (props) => {
	const { onSubmit, beginningPeriod, initialTask, isEdit, onDelete, onHasEdit } = props;
	const { register, watch, handleSubmit, formState: { errors } } = useForm<FormValues>();

	const defaultNoDueDate = initialTask && initialTask.dueDateString ? false : true;
	const [ isAnyDateTime, setIsAnyDateTime ] = useState(initialTask?.isAnyDateTime || false);
	const [isNoDueDate, setIsNoDueDate] = useState(defaultNoDueDate);

	const submitHandler = (data: FormValues) => {
		const newTask = getFormTaskObject(data, beginningPeriod);
		if (isAnyDateTime) {
			newTask.timeString = beginningPeriod.toString();
			newTask.isAnyDateTime = true;
		}
		if (isNoDueDate) {
			newTask.dueDateString = undefined;
		} else if (!newTask.dueDateString) {
			const weekEnding = getWeekEnding(beginningPeriod);
			newTask.dueDateString = weekEnding.toString();
		}
		console.log('newTask:', newTask);
		onSubmit(newTask);
	};


	useEffect(() => {
		if (watch().name && watch().description) {
			onHasEdit(true);
		} else {
			onHasEdit(false);
		}
	}, [watch, onHasEdit])

	const category = watch().category || (initialTask ? initialTask.category : CategoryList[0]);
	const subCategoryList: SubCategory[] = getSubCategory(category as Category);

	// Name, description, category, subcategory,
	// Importance, duration, planned datetime, due datetime
	return (
		<form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
			<section className={classes["form-content"]}>
				<GeneralInputs
					initialTask={initialTask}
					register={register}
					errors={errors}
					subCategoryList={subCategoryList}
				/>

				<PlanTimeInput
					initialTask={initialTask}
					register={register}
					beginningPeriod={beginningPeriod}
					isAnyTime={isAnyDateTime}
					onAnyTime={() => setIsAnyDateTime((prev) => !prev)}
				/>

				<DurationInput
					initialTask={initialTask}
					register={register}
					watch={watch}
					errors={errors}
				/>

				{/* Due Datetime */}
				<DueDateInput 
					register={register}
					beginningPeriod={beginningPeriod}
					isNoDueDate={isNoDueDate}
					onDueDateExist={() => setIsNoDueDate((prev) => !prev)}
					watch={watch}
				/>
			</section>

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
		</form>
	);
};

export default TaskForm;
