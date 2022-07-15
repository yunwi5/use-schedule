import { faHourglass } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useSelector, RootStateOrAny } from 'react-redux';

import { PlannerMode } from '../../../../../models/planner-models/PlannerMode';
import { Task } from '../../../../../models/task-models/Task';
import {
    FormValues,
    getInitialDurationInput,
    getDuration,
    getEndTimeFormatted,
} from '../../../../../utilities/form-utils/task-form-util';
import classes from '../TaskForm.module.scss';

interface Props {
    initialTask?: Task;
    // register: UseFormRegister<FormValues>;
    register: UseFormRegister<any>;
    // watch: UseFormWatch<FormValues>;
    watch: UseFormWatch<any>;
    errors: any;
}

const DurationInput: React.FC<Props> = (props) => {
    const { initialTask, register, errors, watch } = props;

    const plannerMode: PlannerMode = useSelector(
        (state: RootStateOrAny) => state.planner.plannerMode,
    );

    // Initial time display for Edit mode.
    const {
        defaultDays = 0,
        defaultHours = 0,
        defaultMinutes,
    } = getInitialDurationInput(initialTask);

    // Duration user display related
    const currentDuration: number = getDuration(watch);
    const endTimeFormatted: string | null = getEndTimeFormatted(watch);

    const showDaysInput =
        plannerMode === PlannerMode.MONTLY || plannerMode === PlannerMode.YEARLY;
    const showEndTime = currentDuration > 0 && endTimeFormatted;

    return (
        <div
            className={`${classes.duration} ${showDaysInput ? classes.dayduration : ''} ${
                classes.section
            }`}
        >
            <div className={classes.duration__input}>
                <p className={classes.duration__heading}>
                    <FontAwesomeIcon icon={faHourglass} className={'icon-medium mr-2'} />
                    Duration
                </p>
                <div
                    className={`${classes.numbers} ${
                        showDaysInput ? classes['numbers-short'] : classes['numbers-long']
                    }`}
                >
                    {showDaysInput && (
                        <div className={classes.number}>
                            <input
                                type="number"
                                {...register('durationDays', {
                                    valueAsNumber: true,
                                    min: { value: 0, message: 'Days cannot be negative!' },
                                })}
                                id="durationDays"
                                defaultValue={defaultDays}
                                aria-invalid={errors.durationDays ? true : false}
                            />
                            <label htmlFor="durationDays">d</label>
                        </div>
                    )}
                    <div className={classes.number}>
                        <input
                            type="number"
                            {...register('durationHours', {
                                valueAsNumber: true,
                                min: { value: 0, message: 'Hours cannot be negative!' },
                            })}
                            id="durationHours"
                            defaultValue={defaultHours}
                            aria-invalid={errors.durationHours ? true : false}
                        />
                        <label htmlFor="durationHours">h</label>
                    </div>
                    <div className={classes.number}>
                        <input
                            type="number"
                            {...register('durationMinutes', {
                                valueAsNumber: true,
                                min: { value: 0, message: 'Minutes cannot be negative!' },
                                max: { value: 59, message: 'Minutes cannot exceed 60!' },
                            })}
                            id="durationMinutes"
                            defaultValue={defaultMinutes}
                            aria-invalid={errors.durationMinutes ? true : false}
                        />
                        <label htmlFor="durationMinutes">m</label>
                    </div>
                </div>
                <div className={classes.messages}>
                    {errors.durationDays && (
                        <p className={classes.error}>{errors.durationDays.message}</p>
                    )}
                    {errors.durationHours && (
                        <p className={classes.error}>{errors.durationHours.message}</p>
                    )}
                    {errors.durationMinutes && (
                        <p className={classes.error}>{errors.durationMinutes.message}</p>
                    )}
                </div>
            </div>
            <div className={classes.duration__endtime}>
                {showEndTime && (
                    <Fragment>
                        <p>Estimated Endtime</p>
                        <span className={classes.date}>{endTimeFormatted}</span>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default DurationInput;
