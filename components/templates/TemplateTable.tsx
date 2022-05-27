import { TemplatePlanner } from '../../models/template-models/TemplatePlanner';
import WeekdayTable from '../planners/tables/WeekdayTable';
import WeekdayList from '../planners/weekly-planner/WeekdayList';
import LoadingSpinner from '../ui/design-elements/LoadingSpinner';
import TemplateTableNav from './TemplateTableNav';

interface Props {
    weekBeginning: Date;
    planner: TemplatePlanner | null;
    onMutate: () => void;
}

const TemplateTable: React.FC<Props> = (props) => {
    const { weekBeginning, planner, onMutate } = props;

    if (!planner) return <LoadingSpinner />;

    return (
        <div>
            <TemplateTableNav planner={planner} />
            {/* <WeekdayList beginningPeriod={weekBeginning} planner={planner} onMutate={onMutate} /> */}
            <WeekdayTable beginningPeriod={weekBeginning} planner={planner} onMutate={onMutate} />
        </div>
    );
};

export default TemplateTable;
