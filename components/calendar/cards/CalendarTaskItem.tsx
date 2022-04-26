import React, { useCallback, useState } from "react";

import { PlannerMode } from "../../../models/planner-models/PlannerMode";
import { Status } from "../../../models/task-models/Status";
import { PlannerTask } from "../../../models/task-models/Task";
import PlannerTaskEdit from "../../planners/planner-crud/TaskEdit";
import TaskDetail from "../../tasks/task-modal/task-detail/TaskDetail";
import CalendarItemCard from "./CalendarItemCard";

interface Props {
    task: PlannerTask;
    onInvalidate: () => void;
}

function getTaskStyle(task: PlannerTask) {
    let bgClass = "bg-slate-200"; // style when the task is weekly task
    let textClass = "text-slate-700";
    let hoverBgClass = "hover:bg-slate-400";
    let hoverTextClass = "hover:text-slate-50";
    if (task.plannerType === PlannerMode.MONTLY) {
        bgClass = "bg-sky-100";
        textClass = "text-sky-700";
        hoverBgClass = "hover:bg-sky-400";
        hoverTextClass = "hover:text-sky-50";
    } else if (task.plannerType === PlannerMode.YEARLY) {
        bgClass = "bg-blue-100";
        textClass = "text-blue-700";
        hoverBgClass = "hover:bg-blue-400";
        hoverTextClass = "hover:text-blue-50";
    }
    return { bgClass, textClass, hoverBgClass, hoverTextClass };
}

const CalendarTaskItem: React.FC<Props> = ({ task, onInvalidate }) => {
    const { bgClass, textClass, hoverBgClass, hoverTextClass } = getTaskStyle(task);

    const [showDetail, setShowDetail] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const editHandler = useCallback(() => {
        setShowEditForm(true);
        setShowDetail(false);
    }, []);
    const updateHandler = (updateTask?: PlannerTask) => {
        onInvalidate();
    };

    return (
        <>
            <CalendarItemCard
                bgClass={bgClass}
                textClass={textClass}
                hoverBgClass={hoverBgClass}
                hoverTextClass={hoverTextClass}
                dateTime={task.dateTime}
                isCompleted={task.status === Status.COMPLETED}
                dueDate={task.dueDate}
                onClick={setShowDetail.bind(null, true)}
            >
                {task.name}
            </CalendarItemCard>
            {showDetail && (
                <TaskDetail
                    task={task}
                    onClose={setShowDetail.bind(null, false)}
                    onEdit={editHandler}
                    onInvalidate={onInvalidate}
                />
            )}
            {showEditForm && (
                <PlannerTaskEdit
                    initialTask={task}
                    onClose={setShowEditForm.bind(null, false)}
                    beginningPeriod={task.dateTime}
                    onUpdate={updateHandler}
                />
            )}
        </>
    );
};

export default CalendarTaskItem;
