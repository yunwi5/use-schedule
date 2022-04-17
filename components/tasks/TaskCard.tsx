import React, { Fragment, useState, useEffect } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAlarmClock,
    faCircleExclamationCheck,
    faListTree,
    faMagnifyingGlassPlus,
    faPenToSquare,
    faStar,
    faCommentPen,
} from "@fortawesome/pro-duotone-svg-icons";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import TaskDetail from "./task-modal/task-detail/TaskDetail";
import TaskComment from "./task-modal/task-comment/TaskComment";
import PlannerTaskEdit from "../planners/planner-crud/PlannerTaskEdit";
import { AbstractTask } from "../../models/task-models/AbstractTask";
import { PlannerTask } from "../../models/task-models/Task";
import { PlannerMode } from "../../models/planner-models/PlannerMode";
import { TaskStatus, TaskStatusList } from "../../models/task-models/Status";
import { copyClassObject } from "../../utilities/gen-utils/object-util";
import { getDateMonthFormat } from "../../utilities/time-utils/date-format";
import { updateTaskProperties } from "../../lib/planners/tasks-api";
import classes from "./TaskCard.module.scss";

interface Props {
    task: AbstractTask;
    beginningPeriod: Date;
    onMutate: () => void;
}

function getCardDateTimeFormat(task: AbstractTask) {
    let planDateFormat: null | string = "",
        dueDateFormat: null | string = "";
    const plannerType = task.plannerType;

    switch (plannerType) {
        case PlannerMode.WEEKLY:
        case PlannerMode.TEMPLATE:
            planDateFormat = task.durationFormat;
            dueDateFormat = task.dueDate && getDateMonthFormat(task.dueDate);
            break;
        case PlannerMode.YEARLY:
        case PlannerMode.MONTLY:
            planDateFormat = getDateMonthFormat(task.dateTime);
            dueDateFormat = task.dueDate && getDateMonthFormat(task.dueDate);
            break;
    }

    if (task.isAnyDateTime) planDateFormat = "Any Time";

    return { planDateFormat, dueDateFormat };
}

const TaskCard: React.FC<Props> = (props) => {
    const { task: initialTask, beginningPeriod, onMutate } = props;

    const [task, setTask] = useState(initialTask);
    const [isEditing, setIsEditing] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showComment, setShowComment] = useState(false);

    const { dueDate, category, subCategory, importance, status, comment } = task;
    const plannerMode = useSelector((state: RootStateOrAny) => state.planner.plannerMode);

    const updateTaskHandler = (updatedTask?: AbstractTask) => {
        onMutate();
        if (updatedTask) setTask(updatedTask);
    };

    const editHandler = () => {
        setShowDetail(false);
        setIsEditing(true);
    };

    const statusChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value.trim() as TaskStatus;
        const taskCopy = copyClassObject(task);
        taskCopy.status = newStatus;
        setTask(taskCopy);
        updateStatusHandler(newStatus);
    };

    const updateStatusHandler = async (newStatus: TaskStatus) => {
        // API call
        await updateTaskProperties(task.id, { status: newStatus }, task.plannerType || plannerMode);
        onMutate();
    };

    const updateCommentHandler = async (newComment: string) => {
        const newTask = new PlannerTask({ ...task, comment: newComment });
        setTask(newTask);
        // API call
        await updateTaskProperties(
            task.id,
            { comment: newComment },
            task.plannerType || plannerMode,
        );
    };

    // Whenever there is a global update of tasks, update card as well.
    useEffect(() => {
        setTask(initialTask);
    }, [initialTask]);

    const { planDateFormat, dueDateFormat } = getCardDateTimeFormat(task);

    const hideStatus = task.plannerType === PlannerMode.TEMPLATE;
    // Status color indicator
    const statusClass = "status-" + status.toLowerCase().replace(" ", "");

    return (
        <li className={`${classes.task}`}>
            <div className={`${classes.task__decorator} ${statusClass}-bg`} />
            {isEditing && (
                <PlannerTaskEdit
                    onClose={() => setIsEditing(false)}
                    onUpdate={updateTaskHandler}
                    beginningPeriod={beginningPeriod}
                    initialTask={task}
                />
            )}

            {showDetail && (
                <TaskDetail
                    onClose={setShowDetail.bind(null, false)}
                    onEdit={editHandler}
                    task={task}
                />
            )}

            {/* Heading */}
            <div className={`${classes.task__heading}`}>
                {/* Task Name */}
                <h4 className={classes.task__name}>{task.name}</h4>
                <ClickAwayListener onClickAway={setShowComment.bind(null, false)}>
                    <div className='ml-1 relative' onClick={setShowComment.bind(null, true)}>
                        {!showComment && (
                            <FontAwesomeIcon
                                icon={faCommentPen}
                                className={`max-w-lg text-xl text-slate-700 cursor-pointer hover:text-blue-600 ${classes.commentIcon}`}
                            />
                        )}
                        {showComment && (
                            <TaskComment
                                commentText={comment || ""}
                                onSubmit={updateCommentHandler}
                                className='absolute bottom-[1rem] translate-x-3'
                            />
                        )}
                    </div>
                </ClickAwayListener>

                {/* Planned Time */}
                <div className={classes.task__time}>
                    {planDateFormat && (
                        <Fragment>
                            <FontAwesomeIcon icon={faAlarmClock} className={classes.icon} />
                            <span>{planDateFormat}</span>
                        </Fragment>
                    )}
                </div>
                {/* Due Date */}
                <p className={classes.task__dueDate}>
                    {dueDate && <Fragment>(due {dueDateFormat})</Fragment>}
                </p>
                {/* Status Control. Displayed if it is not template task. */}
                {!hideStatus && (
                    <select
                        onChange={statusChangeHandler}
                        className={classes.task__select}
                        defaultValue={status}
                    >
                        {TaskStatusList.map((status) => (
                            <option key={status}>{status}</option>
                        ))}
                    </select>
                )}
            </div>
            {/* Body */}
            <div className={`${classes.task__body}`}>
                <p className={classes.task__category}>
                    <FontAwesomeIcon icon={faListTree} className={`${classes.icon}`} />
                    {category}
                    {subCategory && (
                        <Fragment>
                            <FontAwesomeIcon icon={faCircle} className={classes.task__icon_small} />
                            {subCategory}
                        </Fragment>
                    )}
                </p>
                <p className={classes.task__importance}>
                    <FontAwesomeIcon icon={faStar} className={`${classes.icon}`} />
                    {importance}
                </p>
                {!hideStatus && (
                    <p className={`${classes.task__status} ${statusClass}`}>
                        <FontAwesomeIcon
                            icon={faCircleExclamationCheck}
                            className={`${classes.icon}`}
                        />
                        {status}
                    </p>
                )}
                <div className={`${classes.task__btns}`}>
                    <button className={classes.task__detail} onClick={() => setShowDetail(true)}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlassPlus}
                            className={`${classes.icon}`}
                        />
                        Detail
                    </button>
                    <button className={classes.task__edit} onClick={() => setIsEditing(true)}>
                        <FontAwesomeIcon icon={faPenToSquare} className={`${classes.icon}`} />
                        Edit
                    </button>
                </div>
            </div>
        </li>
    );
};

export default TaskCard;
