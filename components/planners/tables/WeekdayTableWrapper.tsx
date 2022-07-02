import { WeeklyPlanner } from '../../../models/planner-models/WeeklyPlanner';
import { TemplatePlanner } from '../../../models/template-models/TemplatePlanner';
import { WTableContextProvider } from '../../../store/context/weekday-table-context';
import WeekdayTable from './WeekdayTable';

interface Props {
    beginningPeriod: Date;
    planner: WeeklyPlanner | TemplatePlanner;
    onMutate: () => void;
}

const WeekTableWrapper: React.FC<Props> = (props) => {
    return (
        <WTableContextProvider planner={props.planner}>
            <WeekdayTable {...props} />
        </WTableContextProvider>
    );
};

export default WeekTableWrapper;
