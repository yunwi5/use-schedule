import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Rating from "@mui/material/Rating";

import { Template, TemplateFormObj } from "../../../models/template-models/Template";
import Button from "../../ui/Button";
import classes from "./TemplateForm.module.scss";

interface Props {
	onSubmit: (newTemplate: TemplateFormObj, isNew: boolean) => void;
	isNew: boolean; // if new one created isNew = true, if it is editted isNew = false
	initialTemplate?: Template;
}

interface TemplateFormValues {
	name: string;
	importance: number;
	description: string;
}

const TemplateForm: React.FC<Props> = ({ onSubmit, isNew, initialTemplate }) => {
	const [ isEditing, setIsEditing ] = useState<boolean>(isNew);

	const { register, watch, handleSubmit, control, formState: { errors } } = useForm<
		TemplateFormValues
	>();

	const submitHandler = (data: TemplateFormValues) => {
		const { name, importance, description } = data;

		const newTemplate: TemplateFormObj = {
			name,
			importance,
			description,
			id: initialTemplate && initialTemplate.id,
			userId: initialTemplate && initialTemplate.userId
		};
		onSubmit(newTemplate, isNew);
	};

	console.log("errors:", errors);

	return (
		<form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
			<div className={`${classes.control} ${classes.name}`}>
				<label htmlFor="template-title">Template Name</label>
				<input
					type="text"
					id="template-title"
					{...register("name", {
						required: "Template name is required!",
						minLength: { value: 3, message: "Minimum 3 characters for name!" },
						maxLength: { value: 40, message: "Maximum 40 characters for name!" }
					})}
					aria-invalid={!!errors.name}
					defaultValue={initialTemplate ? initialTemplate.name : ""}
				/>
				{errors.name && <p className={classes.error}>{errors.name.message}</p>}
			</div>
			<div className={`${classes.control} ${classes.rating}`}>
				<label>Importance</label>
				<Controller
					name={"importance"}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Rating
							size="large"
							precision={0.5}
							onChange={(event, newValue) => onChange(newValue || 0)}
							value={+value}
							defaultValue={initialTemplate ? initialTemplate.importance : 0}
						/>
					)}
				/>
				{errors.importance && <p className={classes.error}>{errors.importance.message}</p>}
			</div>
			<div className={`${classes.control} ${classes.desc}`}>
				<label htmlFor="template-desc">Description</label>
				<textarea
					id="template-desc"
					cols={30}
					rows={3}
					{...register("description", {
						required: "Description is required!",
						minLength: { value: 3, message: "Minimum 3 characters!" },
						maxLength: { value: 1000, message: "Maximum 1000 characters!" }
					})}
					aria-invalid={!!errors.description}
					defaultValue={initialTemplate ? initialTemplate.description : ""}
				/>
				{errors.description && (
					<p className={classes.error}>{errors.description.message}</p>
				)}
			</div>
			<div className={classes.action}>
				<Button type="submit">Submit</Button>
			</div>
		</form>
	);
};

export default TemplateForm;
