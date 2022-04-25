import React, { Fragment } from "react";
import { UseFormRegister } from "react-hook-form";

import { Task } from "../../../../../models/task-models/Task";
import { ImportanceList } from "../../../../../models/task-models/Status";
import { CategoryList, SubCategory } from "../../../../../models/task-models/Category";
import classes from "../TaskForm.module.scss";
import { useAppSelector } from "../../../../../store/redux";
import { PlannerMode, PlannerModeList } from "../../../../../models/planner-models/PlannerMode";
import { FormValues } from "../../../../../utilities/form-utils/task-form-util";
import { getTaskType } from "../../../../../utilities/tasks-utils/task-label";

interface Props {
    initialTask?: Task;
    register: UseFormRegister<FormValues>;
    errors: any;
    subCategoryList: SubCategory[];
}

const plannerModeOptions = PlannerModeList.filter((mode) => mode !== PlannerMode.TEMPLATE);
// use getTaskType

const GeneralInputs: React.FC<Props> = (props) => {
    const { initialTask, register, errors, subCategoryList } = props;

    // If the mode is null, then show planner options to the users so that they can choose.
    // In the planner sections, plannerMode is never null, however, in the calendar section, it is null.
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);

    return (
        <Fragment>
            <div className={`${classes.name} ${classes.section}`}>
                <label htmlFor="name">Title</label>
                <input
                    type="text"
                    {...register("name", {
                        required: "Title is required!",
                        minLength: { value: 3, message: "Minimum 3 characters!" },
                        maxLength: { value: 35, message: "Maximum 35 characters!" },
                    })}
                    id="name"
                    placeholder="Enter your task name (3 ~ 35 characters)"
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
                        maxLength: { value: 300, message: "Maximum 300 character!" },
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
                    className={classes.select}
                    defaultValue={initialTask ? initialTask.importance : ""}
                >
                    {ImportanceList.map((imp) => (
                        <option key={imp}>{imp}</option>
                    ))}
                </select>
                <label htmlFor="importance">Task Type</label>
                <select
                    {...register("plannerType")}
                    id="task-type"
                    className={classes.select}
                    defaultValue={initialTask ? initialTask.plannerType : PlannerMode.WEEKLY}
                >
                    {plannerModeOptions.map((plannerMode) => (
                        <option key={plannerMode} value={plannerMode}>
                            {getTaskType(plannerMode)}
                        </option>
                    ))}
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
                    {CategoryList.map((category) => (
                        <option key={category}>{category}</option>
                    ))}
                </select>
                <label htmlFor="subCategory">SubCategory</label>
                <select
                    className={classes.select}
                    {...register("subCategory")}
                    id="subCategory"
                    defaultValue={initialTask ? initialTask.subCategory : ""}
                >
                    {subCategoryList.map((sub) => (
                        <option key={sub}>{sub}</option>
                    ))}
                </select>
            </div>
        </Fragment>
    );
};

export default GeneralInputs;
