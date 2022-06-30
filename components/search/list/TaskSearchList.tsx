import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/pro-light-svg-icons';
import { faCircleInfo } from '@fortawesome/pro-duotone-svg-icons';

import PlannerTaskCard from '../../tasks/TaskCard';
import { PlannerTask } from '../../../models/task-models/Task';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import {
    getCurrentMonthBeginning,
    getCurrentWeekBeginning,
    getCurrentYearBeginning,
} from '../../../utilities/date-utils/date-get';
import { TaskSort as SortingStandard } from '../../../models/sorting-models';
import { getTaskType } from '../../../utilities/tasks-utils/task-label';
import {
    getDateTimeFormat,
    getDurationFormat,
} from '../../../utilities/date-utils/date-format';

import classes from './SearchList.module.scss';
import TaskCardNew from '../../tasks/TaskCardNew';

interface Props {
    tasks: PlannerTask[];
    sortingStandard: SortingStandard | null;
    onInvalidate(): void;
}

function getTaskSortingInfo(task: PlannerTask, sortingStandard: SortingStandard | null) {
    const defaultValue = 'Not Set';
    let showInfo = true;
    let labelFormat: string | JSX.Element = '';

    switch (sortingStandard) {
        case SortingStandard.PLAN_DATE:
            const dateTimeFormat = getDateTimeFormat(task.dateTime);
            labelFormat = (
                <>
                    <strong>Plan Date</strong> {dateTimeFormat}
                </>
            );
            break;
        case SortingStandard.DUE_DATE:
            const dueDateFormat = task.dueDate
                ? getDateTimeFormat(task.dueDate)
                : defaultValue;
            labelFormat = (
                <>
                    <strong>Task Due</strong> {dueDateFormat}
                </>
            );
            break;
        case SortingStandard.DURATION:
            const durationFormat = getDurationFormat(task.duration).trim() || 'No Duration';
            labelFormat = (
                <>
                    <strong>Task Duration</strong> {durationFormat}
                </>
            );
            break;
        default:
            showInfo = false;
    }

    return {
        showInfo,
        labelFormat,
    };
}

const SearchTaskList: React.FC<Props> = (props) => {
    const { tasks, sortingStandard, onInvalidate } = props;

    const weekBeginning = getCurrentWeekBeginning();
    const monthBeginning = getCurrentMonthBeginning();
    const yearBeginning = getCurrentYearBeginning();

    return (
        <ul className={classes['search-list']}>
            {!tasks.length && (
                <h1 className="huge-heading">
                    <FontAwesomeIcon icon={faTriangleExclamation} className={classes.icon} />
                    No tasks found.
                </h1>
            )}
            {tasks.map((task) => {
                const { showInfo, labelFormat } = getTaskSortingInfo(task, sortingStandard);
                return (
                    <div key={task.id}>
                        <div
                            className={`${classes.label} ${
                                classes['label-' + task.plannerType]
                            }`}
                        >
                            <span>{getTaskType(task.plannerType) || '? Task'}</span>
                            {showInfo && (
                                <span className="ml-4">
                                    <FontAwesomeIcon
                                        icon={faCircleInfo}
                                        className={classes.icon}
                                    />
                                    <span className={classes['sorting-label']}>
                                        {labelFormat}
                                    </span>
                                </span>
                            )}
                        </div>
                        <TaskCardNew task={task} onInvalidate={onInvalidate} />
                    </div>
                );
            })}
        </ul>
    );
};

export default SearchTaskList;
