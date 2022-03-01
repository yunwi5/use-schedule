import React, { Fragment } from "react";
import { UseFormRegister } from "react-hook-form";

import { FormValues } from "../../../../utilities/form-utils/task-form-util";
import { Task } from "../../../../models/task-models/Task";
import { CategoryList, SubCategory } from "../../../../models/task-models/Category";
import { ImportanceList } from "../../../../models/task-models/Status";
import classes from "./TaskForm.module.scss";

interface Props {
	initialTask?: Task;
	register: UseFormRegister<FormValues>;
	errors: any;
	subCategoryList: SubCategory[];
}

const GeneralInputs: React.FC<Props> = (props) => {
	const { initialTask, register, errors, subCategoryList } = props;

	return (
		<Fragment>
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
					placeholder="Enter your task name (3 ~ 30 characters)"
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
					placeholder="Enter your task description (3~300 characters)"
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
		</Fragment>
	);
};

export default GeneralInputs;
