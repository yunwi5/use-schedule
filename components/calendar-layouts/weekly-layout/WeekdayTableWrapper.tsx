import { WeeklyPlanner } from '../../../models/planner-models/WeeklyPlanner';
import { TemplatePlanner } from '../../../models/template-models/TemplatePlanner';
import { TimeTableContextProvider } from '../../../store/context/time-table-context';
import WeekdayTable from './WeekdayTable';

interface Props {
    beginningPeriod: Date;
    planner: WeeklyPlanner | TemplatePlanner;
    onMutate: () => void;
}

const WeekTableWrapper: React.FC<Props> = (props) => {
    return (
        <TimeTableContextProvider planner={props.planner}>
            <WeekdayTable {...props} />
        </TimeTableContextProvider>
    );
};

export default WeekTableWrapper;
