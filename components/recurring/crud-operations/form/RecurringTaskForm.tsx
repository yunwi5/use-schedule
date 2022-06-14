import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';

import { IEvent, NoIdEvent, Participant } from '../../../../models/Event';
import { Importance, Status } from '../../../../models/task-models/Status';
import { getISOTimeFormat } from '../../../../utilities/date-utils/date-format';

import ExitIcon from '../../../ui/icons/ExitIcon';
import { addYears } from '../../../../utilities/date-utils/date-control';
import IntervalInput from './form-parts/IntervalInput';
import {
    NoIdRecurringEvent,
    RecurringEvent,
} from '../../../../models/recurring-models/RecurringEvent';
import { isRecurringInterval, RecurringInterval } from '../../../../models/recurring-models';
import classes from './RecurringForm.module.scss';
import TimeInput from '../../../ui/input/form-inputs-sections/TimeInput';
import DurationInput from '../../../ui/input/form-inputs-sections/DurationInput';
import ImportanceInput from '../../../ui/input/form-inputs-sections/ImportanceInput';
import DescriptionInput from '../../../ui/input/form-inputs-sections/DescriptionInput';
import ActionButtons from '../../../ui/input/form-inputs-sections/ActionButtons';
import NameInput from '../../../ui/input/form-inputs-sections/NameInput';
import DynamicDateInput from '../../../ui/input/form-inputs-sections/DynamicDateInput';
import { faBallotCheck } from '@fortawesome/pro-duotone-svg-icons';
import CategoryInput from '../../../ui/input/form-inputs-sections/CategoryInput';
import { AbstractTask } from '../../../../models/task-models/AbstractTask';
import {
    NoIdRecurringTask,
    RecurringTask,
} from '../../../../models/recurring-models/RecurringTask';
import SubCategoryInput from '../../../ui/input/form-inputs-sections/SubCategoryInput';
import { Category, getSubCategory, SubCategory } from '../../../../models/task-models/Category';
import { getPlannerType } from '../../../../utilities/recurring-utils';
import { NoIdTask } from '../../../../models/task-models/Task';

export interface RecurringEventFormValues {
    name: string;
    date: string;
    durationHours: number;
    durationMinutes: number;

    importance: string;
    description: string;
    category: string;
    subCategory: string;

    // Extension properties for recurring items
    startDate: string;
    endDate: string;
    time: string;
    interval: string;
}

interface Props {
    beginningPeriod: Date;
    onSubmit(event: NoIdRecurringTask): void;
    onClose(): void;
    onDelete?: () => void;
    initialTask?: AbstractTask | RecurringTask;
    heading?: string;
    isEdit?: boolean;
}

const RecurringTaskForm: React.FC<Props> = (props) => {
    const { onSubmit, initialTask, beginningPeriod, heading, onClose, onDelete, isEdit } = props;

    const userId = useUser().user?.sub;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RecurringEventFormValues>();

    const submitHandler = (data: RecurringEventFormValues) => {
        if (!userId) {
            alert('User is not found!');
            return;
        }
        const {
            name,
            durationHours,
            durationMinutes,
            importance,
            description,
            category,
            subCategory,
            time,
            startDate: startDateStr,
            endDate: endDateStr,
            interval,
        } = data;
        const duration = parseInt(durationHours + '') * 60 + parseInt(durationMinutes + '');

        const startDate = new Date(
            `${startDateStr || beginningPeriod.toDateString()} ${
                time || getISOTimeFormat(beginningPeriod)
            }`,
        );

        const endDate = new Date(
            `${endDateStr || addYears(beginningPeriod, 1).toDateString()} ${time || '23:59'}`,
        );

        const validInterval = isRecurringInterval(interval)
            ? (interval as RecurringInterval)
            : RecurringInterval.WEEK;

        const newRecTask: NoIdRecurringTask = {
            name,
            startDate,
            interval: validInterval,
            endDate,
            duration,
            importance: importance as Importance,
            category: category as Category,
            subCategory: subCategory as SubCategory,
            description: description || '',
            plannerType: getPlannerType(validInterval),
            status: Status.OPEN,
            timeString: startDate.toString(),
            userId,
        };
        onSubmit(newRecTask);
    };

    const subCategoryList: SubCategory[] = getSubCategory(watch().category as Category);

    const headingText = heading || (isEdit ? 'Edit Recurring Task' : 'New Recurring Task');

    return (
        <form
            className={`${classes.form} ${classes['event-form']}`}
            onSubmit={handleSubmit(submitHandler)}
        >
            <h2 className={classes.heading}>{headingText}</h2>
            <ExitIcon onClose={onClose} />
            <div className={classes.content}>
                <NameInput
                    register={register}
                    initialItem={initialTask}
                    errors={errors}
                    icon={faBallotCheck}
                    className={'task'}
                />
                <div className={'flex gap-5 lg:gap-10 justify-between'}>
                    <DynamicDateInput
                        register={register}
                        label="Start Date"
                        name="startDate"
                        className={'task'}
                        disabled={!!isEdit}
                        defaultDate={beginningPeriod}
                    />
                    <TimeInput
                        register={register}
                        initialItem={initialTask}
                        className="task"
                        beginningPeriod={beginningPeriod}
                    />
                </div>
                <div className={'flex gap-5 lg:gap-10 justify-between'}>
                    <IntervalInput
                        register={register}
                        disabled={!!isEdit}
                        initialItem={initialTask}
                        className="task"
                    />
                    <DynamicDateInput
                        register={register}
                        label="End Date"
                        name="endDate"
                        className="task"
                        defaultDate={addYears(beginningPeriod, 1)}
                    />
                </div>
                <div className={`flex gap-5 lg:gap-10 justify-between`}>
                    <DurationInput
                        register={register}
                        initialItem={initialTask}
                        className="task"
                        errors={errors}
                    />
                    <ImportanceInput
                        register={register}
                        initialItem={initialTask}
                        className="task"
                    />
                </div>
                <div className={'flex gap-5 lg:gap-10 justify-between'}>
                    <CategoryInput
                        register={register}
                        initialItem={initialTask}
                        className={'task'}
                    />
                    <SubCategoryInput
                        register={register}
                        initialItem={initialTask}
                        subCategoryList={subCategoryList}
                        className="task"
                    />
                </div>
                <DescriptionInput
                    register={register}
                    initialItem={initialTask}
                    className={'task'}
                />
            </div>
            <ActionButtons onDelete={onDelete} />
        </form>
    );
};

export default RecurringTaskForm;
