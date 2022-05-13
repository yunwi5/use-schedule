import { MonthListWithAny } from '../../../models/date-models/Month';
import { YearlyPlanner } from '../../../models/planner-models/YearlyPlanner';
import TaskListContainer from '../../tasks/TaskListContainer';

interface Props {
    beginningPeriod: Date;
    planner: YearlyPlanner;
    onMutate: () => void;
}

const YearlyList: React.FC<Props> = (props) => {
    const { beginningPeriod, planner, onMutate } = props;

    return (
        // This component will need to be centered
        <div className="ml-5">
            {MonthListWithAny.map((month, idx) => {
                const tasks = planner.getTasks(month);

                return (
                    <TaskListContainer
                        key={idx}
                        beginningPeriod={beginningPeriod}
                        index={idx}
                        onMutate={onMutate}
                        tasks={tasks}
                    />
                );
            })}
        </div>
    );
};

export default YearlyList;
