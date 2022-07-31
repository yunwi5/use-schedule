import { TemplatePlanner } from '../../models/template-models/TemplatePlanner';
import { ItemsView } from '../../models/ui-models';
import { useAppSelector } from '../../store/redux';
import WeekdayTableWrapper from '../calendar-layouts/weekly-layout/WeekdayTableWrapper';
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
    const itemsView = useAppSelector((state) => state.fold.itemsView);
    if (!planner) {
        return (
            <div className="w-full flex-center">
                <LoadingSpinner />
            </div>
        );
    }

    const isTableView = itemsView === ItemsView.TABLE;

    return (
        <div>
            <TemplateTableNav planner={planner} />
            {isTableView ? (
                <WeekdayTableWrapper
                    beginningPeriod={weekBeginning}
                    planner={planner}
                    onMutate={onMutate}
                />
            ) : (
                <WeekdayList
                    beginningPeriod={weekBeginning}
                    planner={planner}
                    onMutate={onMutate}
                />
            )}
        </div>
    );
};

export default TemplateTable;
