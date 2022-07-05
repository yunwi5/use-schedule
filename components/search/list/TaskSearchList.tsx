import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/pro-light-svg-icons';

import { PlannerTask } from '../../../models/task-models/Task';
import { getTaskType } from '../../../utilities/tasks-utils/task-label';
import TaskCardNew from '../../tasks/TaskCardNew';
import classes from './SearchList.module.scss';

interface Props {
    tasks: PlannerTask[];
    onInvalidate(): void;
    expandMode: boolean;
}

const SearchTaskList: React.FC<Props> = (props) => {
    const { tasks, onInvalidate, expandMode } = props;

    return (
        <ul className={classes['search-list']}>
            {!tasks.length && (
                <h1 className="huge-heading">
                    <FontAwesomeIcon icon={faTriangleExclamation} className={classes.icon} />
                    No tasks found.
                </h1>
            )}
            {tasks.map((task) => {
                return (
                    <div key={task.id}>
                        <div
                            className={`${classes.label} ${
                                classes['label-' + task.plannerType]
                            }`}
                        >
                            <span>{getTaskType(task.plannerType) || '? Task'}</span>
                        </div>
                        <TaskCardNew
                            task={task}
                            onInvalidate={onInvalidate}
                            expand={expandMode}
                        />
                    </div>
                );
            })}
        </ul>
    );
};

export default SearchTaskList;
