import { faMemoPad } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Task } from '../../../../../models/task-models/Task';
import { FormValues } from '../../../../../utilities/form-utils/task-form-util';
import classes from '../TaskForm.module.scss';

interface Props {
    initialTask?: Task;
    register: UseFormRegister<FormValues>;
    errors: any;
}

const DescriptionInput: React.FC<Props> = (props) => {
    const { register, initialTask, errors } = props;
    return (
        <div className={`${classes.description} ${classes.section}`}>
            <label htmlFor="description">
                <FontAwesomeIcon icon={faMemoPad} className={'icon-medium mr-2'} />
                Description
            </label>
            <textarea
                {...register('description', {
                    maxLength: { value: 300, message: 'Maximum 300 character!' },
                })}
                id="description"
                placeholder="Enter your task description"
                cols={30}
                rows={4}
                aria-invalid={errors.description ? true : false}
                defaultValue={initialTask ? initialTask.description : ''}
            />
            {errors.description && (
                <p className={classes.error}>{errors.description.message}</p>
            )}
        </div>
    );
};

export default DescriptionInput;
