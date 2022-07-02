import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormTaskObject, Task } from '../../../../models/task-models/Task';
import {
    CategoryList,
    getSubCategory,
    Category,
    SubCategory,
} from '../../../../models/task-models/Category';
import {
    FormValues,
    getFormTaskObject,
    userHasInputs,
} from '../../../../utilities/form-utils/task-form-util';
import GeneralInputs from './form-sections/GeneralInputs';
import DurationInput from './form-sections/DurationInput';
import PlanTimeInput from './form-sections/plan-datetime/PlanDateTimeInput';
import classes from './TaskForm.module.scss';
import FormButtons from './TaskFormButtons';
import { useAppSelector } from '../../../../store/redux';
import { PlannerMode } from '../../../../models/planner-models/PlannerMode';
import DescriptionInput from './form-sections/DescriptionInput';

interface Props {
    onSubmit: (newTask: FormTaskObject) => void;
    beginningPeriod: Date;
    isEdit?: boolean;
    initialTask?: Task;
    onDelete?: () => void;
}

const TaskForm: React.FC<Props> = (props) => {
    const { onSubmit, beginningPeriod, initialTask, isEdit, onDelete } = props;
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const [isAnyDateTime, setIsAnyDateTime] = useState(
        initialTask ? !!initialTask.isAnyDateTime : false,
    );
    // For yearly task.
    const [isMonthDateOnly, setIsMonthDateOnly] = useState(false);

    const isTemplateTask =
        useAppSelector((state) => state.planner.plannerMode) === PlannerMode.TEMPLATE;

    const submitHandler = (data: FormValues) => {
        const newTask = getFormTaskObject(
            data,
            beginningPeriod,
            isTemplateTask,
            isMonthDateOnly,
        );
        if (isAnyDateTime) {
            newTask.timeString = beginningPeriod.toString();
            newTask.isAnyDateTime = true;
        } else {
            newTask.isAnyDateTime = false;
        }
        onSubmit(newTask);
    };

    const category =
        watch().category || (initialTask ? initialTask.category : CategoryList[0]);
    const subCategoryList: SubCategory[] = getSubCategory(category as Category);

    return (
        <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
            <section className={classes['form-content']}>
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
                    onAnyTime={setIsAnyDateTime}
                    onMonthDateOnly={setIsMonthDateOnly}
                    monthDateOnly={isMonthDateOnly}
                />

                <DurationInput
                    initialTask={initialTask}
                    register={register}
                    watch={watch}
                    errors={errors}
                />

                <DescriptionInput
                    register={register}
                    initialTask={initialTask}
                    errors={errors}
                />
            </section>
            <FormButtons isEdit={isEdit} onDelete={onDelete} />
        </form>
    );
};

export default TaskForm;
