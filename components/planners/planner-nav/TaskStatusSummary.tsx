import { Planner } from '../../../models/planner-models/Planner';
import { getTaskStatusCount } from '../../../utilities/tasks-utils/task-status-util';
import classes from './TaskStatusSummary.module.scss';

interface Props {
    planner: Planner;
    className?: string;
}

const TaskStatusSummary: React.FC<Props> = ({ planner, className = '' }) => {
    const totalTasks = planner.allTasks.length;
    const { openedTasks, completedTasks, progressTasks, overDueTasks } =
        getTaskStatusCount(planner);

    return (
        <div
            className={`flex flex-wrap gap-3 lg:gap-5 text-base lg:text-lg ${classes.container} ${className}`}
        >
            <span className="py-2 px-4 rounded-full bg-slate-50 hover:bg-slate-400 hover:text-slate-50 text-slate-600">
                {totalTasks} Tasks Total
            </span>
            <span className="py-2 px-4 rounded-full bg-teal-50 hover:bg-teal-400 text-teal-600 hover:text-teal-50">
                {openedTasks} Tasks Opened
            </span>
            <span className="py-2 px-4 rounded-full bg-sky-50 hover:bg-sky-400 text-sky-600 hover:text-sky-50">
                {completedTasks} Tasks Completed
            </span>
            <span className="py-2 px-4 rounded-full bg-indigo-50 hover:bg-indigo-400 text-indigo-600 hover:text-indigo-50">
                {progressTasks} Tasks In Progress
            </span>
            <span className="py-2 px-4 rounded-full bg-red-50 hover:bg-red-400 text-red-600 hover:text-red-50">
                {overDueTasks} Tasks Overdue
            </span>
        </div>
    );
};

export default TaskStatusSummary;
