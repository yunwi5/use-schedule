import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

import { FormTaskObject, Task } from "../../../models/task-models/Task";
import { Size, Theme } from "../../../models/design-models";
import {
	CategoryList,
	getSubCategory,
	Category,
	SubCategory
} from "../../../models/task-models/Category";
import { ImportanceList } from "../../../models/task-models/Status";
import Button from "../../ui/Button";
import {
	FormValues,
	getInitialDurationInput,
	getDuration,
	getEndTimeFormatted,
	getInitialDateTimeInput,
	getInitialEndtimeInput,
	getFormTaskObject
} from "../../../utilities/form-utils/task-form-util";
import classes from "./TaskForm.module.scss";

interface Props {
	onSubmit: (newTask: FormTaskObject) => void;
	beginningPeriod: Date;
	isEdit?: boolean;
	initialTask?: Task;
	onDelete?: () => void;
}

const TaskForm: React.FC<Props> = (props) => {
	const { onSubmit, beginningPeriod, initialTask, isEdit, onDelete } = props;
	const { register, watch, handleSubmit, formState: { errors } } = useForm<FormValues>();

	const submitHandler = (data: FormValues) => {
		const newTask = getFormTaskObject(data);
		onSubmit(newTask);
	};

	const category = watch().category || (initialTask ? initialTask.category : CategoryList[0]);
	const subCategoryList: SubCategory[] = getSubCategory(category as Category);

	// Initial input for datetime
	const { defaultDate, defaultTime } = getInitialDateTimeInput(initialTask, beginningPeriod);

	// Initial input for due datetime
	const { defaultEndDate, defaultEndTime } = getInitialEndtimeInput(beginningPeriod);

	// Initial time display for Edit mode.
	const { defaultHours, defaultMinutes } = getInitialDurationInput(initialTask);

	// Duration user display related
	const currentDuration = getDuration(watch);
	const endTimeFormatted = getEndTimeFormatted(watch);

	// Name, description, category, subcategory,
	// Importance, duration, planned datetime, due datetime
	return (
		<form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
			<section className={classes["form-content"]}>
				{/* Name */}
				<div className={`${classes.name} ${classes.section}`}>
					<label htmlFor="name">Title</label>
					<input
						type="text"
						{...register("name", {
							required: "Title is required!",
							minLength: { value: 3, message: "Minimum 3 characters!" },
							maxLength: { value: 30, message: "Maximum 30 characters!" }
						})}
						id="name"
						aria-invalid={errors.name ? true : false}
						defaultValue={initialTask ? initialTask.name : ""}
					/>
					{errors.name && <p className={classes.error}>{errors.name.message}</p>}
				</div>

				{/* Description */}
				<div className={`${classes.description} ${classes.section}`}>
					<label htmlFor="description">Description</label>
					<textarea
						{...register("description", {
							required: "Description is required",
							minLength: { value: 3, message: "Minimum 3 characters!" },
							maxLength: { value: 300, message: "Maximum 300 character!" }
						})}
						id="description"
						cols={30}
						rows={4}
						aria-invalid={errors.description ? true : false}
						defaultValue={initialTask ? initialTask.description : ""}
					/>
					{errors.description && (
						<p className={classes.error}>{errors.description.message}</p>
					)}
				</div>

				{/* Importance */}
				<div className={`${classes.importance} ${classes.section}`}>
					<label htmlFor="importance">Importance</label>
					<select
						{...register("importance")}
						id="importance"
						defaultValue={initialTask ? initialTask.importance : ""}
					>
						{ImportanceList.map((imp) => <option key={imp}>{imp}</option>)}
					</select>
				</div>

				{/* Category */}
				<div className={`${classes.category} ${classes.section}`}>
					<label htmlFor="category">Category</label>
					<select
						// onChange={categoryChangeHandler}
						{...register("category")}
						id="category"
						className={classes.select}
						defaultValue={initialTask ? initialTask.category : ""}
					>
						{CategoryList.map((category) => <option key={category}>{category}</option>)}
					</select>
					<label htmlFor="subCategory">SubCategory</label>
					<select
						className={classes.select}
						{...register("subCategory")}
						id="subCategory"
						defaultValue={initialTask ? initialTask.subCategory : ""}
					>
						{subCategoryList.map((sub) => <option key={sub}>{sub}</option>)}
					</select>
				</div>

				{/* DateTime */}
				<div className={`${classes.datetime} ${classes.section}`}>
					<div className={classes.date}>
						<label htmlFor="date">Date</label>
						<input
							type="date"
							{...register("date")}
							id="date"
							defaultValue={defaultDate}
						/>
					</div>
					<div className={classes.time}>
						<label htmlFor="time">Time</label>
						<input
							type="time"
							{...register("time")}
							id="time"
							defaultValue={defaultTime}
						/>
					</div>
				</div>

				{/* Duration */}
				<div className={`${classes.duration} ${classes.section}`}>
					<div className={classes.duration__input}>
						<p className={classes.duration__heading}>Duration</p>
						<div className={classes.number}>
							<input
								type="number"
								{...register("durationHours", {
									valueAsNumber: true,
									min: { value: 0, message: "Hours cannot be negative!" }
								})}
								id="durationHours"
								defaultValue={defaultHours}
								aria-invalid={errors.durationHours ? true : false}
							/>
							<label htmlFor="durationHours">hr</label>
						</div>
						<div className={classes.number}>
							<input
								type="number"
								{...register("durationMinutes", {
									valueAsNumber: true,
									min: { value: 0, message: "Minutes cannot be negative!" },
									max: { value: 59, message: "Minutes cannot exceed 60!" }
								})}
								id="durationMinutes"
								defaultValue={defaultMinutes}
								aria-invalid={errors.durationMinutes ? true : false}
							/>
							<label htmlFor="durationMinutes">min</label>
						</div>
						{errors.durationHours && (
							<p className={classes.error}>{errors.durationHours.message}</p>
						)}
						{errors.durationMinutes && (
							<p className={classes.error}>{errors.durationMinutes.message}</p>
						)}
					</div>
					<div className={classes.duration__endtime}>
						{currentDuration > 0 && (
							<Fragment>
								<p>Estimated Endtime</p>
								<span className={classes.date}>{endTimeFormatted}</span>
							</Fragment>
						)}
					</div>
				</div>

				{/* Due Datetime */}
				<div className={`${classes.dueDatetime} ${classes.section}`}>
					<div className={classes.date}>
						<label htmlFor="dueDate">Due Date</label>
						<input
							type="date"
							{...register("dueDate")}
							id="dueDate"
							defaultValue={defaultEndDate}
						/>
					</div>
					<div className={classes.time}>
						<label htmlFor="dueTime">Due Time</label>
						<input
							type="time"
							{...register("dueTime")}
							id="dueTime"
							defaultValue={defaultEndTime}
						/>
					</div>
				</div>
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
