import React, { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/pro-regular-svg-icons";
import { faStarExclamation, faMemo } from "@fortawesome/pro-duotone-svg-icons";

import { Template, TemplateFormObj } from "../../../models/template-models/Template";
import Button from "../../ui/Button";
import EditCancel from "../../ui/icons/EditCancel";
import classes from "./TemplateForm.module.scss";

interface Props {
	onSubmit: (newTemplate: TemplateFormObj, isNew: boolean) => Promise<boolean>;
	initialTemplate?: Template;
}

interface TemplateFormValues {
	name: string;
	importance: number;
	description: string;
}

const TemplateForm: React.FC<Props> = ({ onSubmit, initialTemplate }) => {
	const isNew = !initialTemplate;
	const [ isEditing, setIsEditing ] = useState<boolean>(isNew);

	const { register, watch, handleSubmit, control, formState: { errors } } = useForm<
		TemplateFormValues
	>();

	const submitHandler = async (data: TemplateFormValues) => {
		const { name, importance, description } = data;

		const newTemplate: TemplateFormObj = {
			name,
			importance,
			description,
			id: initialTemplate && initialTemplate.id,
			userId: initialTemplate && initialTemplate.userId
		};
		const isSuccess = await onSubmit(newTemplate, isNew);
		if (isSuccess) setIsEditing(false);
	};

	return (
		<form
			className={`${classes.form} ${isEditing
				? classes["form-edit"]
				: classes["form-read-only"]}`}
			onSubmit={handleSubmit(submitHandler)}
		>
			{initialTemplate && (
				<EditCancel isEditing={isEditing} onEdit={(edit: boolean) => setIsEditing(edit)} />
			)}
			<div className={`${classes.control} ${classes.name}`}>
				<label htmlFor="template-title">
					<FontAwesomeIcon icon={faTable} className={classes.icon} />
					Template {isEditing && <Fragment>Name</Fragment>}
				</label>
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
				{initialTemplate && <h3 className={`${classes.text}`}>{initialTemplate.name}</h3>}
				{errors.name && <p className={classes.error}>{errors.name.message}</p>}
			</div>
			<div className={`${classes.control} ${classes.rating}`}>
				<label>
					<FontAwesomeIcon icon={faStarExclamation} className={classes.icon} />
					Importance
				</label>
				<Controller
					name={"importance"}
					control={control}
					defaultValue={initialTemplate ? initialTemplate.importance : 0}
					render={({ field: { onChange, value } }) => (
						<Rating
							size="large"
							precision={0.5}
							onChange={(event, newValue) => onChange(newValue || 0)}
							value={+value}
							readOnly={!isEditing}
						/>
					)}
				/>
				{errors.importance && <p className={classes.error}>{errors.importance.message}</p>}
			</div>
			<div className={`${classes.control} ${classes.desc}`}>
				<label htmlFor="template-desc">
					<FontAwesomeIcon icon={faMemo} className={classes.icon} />
					Description
				</label>
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
				{initialTemplate && <p className={classes.text}>{initialTemplate.description}</p>}
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
