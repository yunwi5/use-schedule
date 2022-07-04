import { useAppSelector } from '../../../store/redux';
import { WeeklyPlanner } from '../../../models/planner-models/WeeklyPlanner';
import { ItemsView } from '../../../models/ui-models';
import TableNav from '../planner-nav/TableNav';
import WeekdayList from './WeekdayList';
import WeekdayTableWrapper from '../tables/WeekdayTableWrapper';

interface Props {
    weekBeginning: Date;
    planner: WeeklyPlanner;
    onChangeWeek: (direction: number) => void;
    onNavigateCurrentPeriod(): void;
    onMutate: () => void;
}

const WeeklyTable: React.FC<Props> = (props) => {
    const { weekBeginning, planner, onChangeWeek, onNavigateCurrentPeriod, onMutate } = props;
    const itemsView = useAppSelector((state) => state.fold.itemsView);

    const childProps = { beginningPeriod: weekBeginning, planner, onMutate };
    return (
        <div>
            <TableNav
                beginningPeriod={weekBeginning}
                planner={planner}
                onChangePeriod={onChangeWeek}
                onNavigateCurrentPeriod={onNavigateCurrentPeriod}
            />
            {itemsView === ItemsView.LIST && <WeekdayList {...childProps} />}
            {itemsView === ItemsView.TABLE && <WeekdayTableWrapper {...childProps} />}
        </div>
    );
};

export default WeeklyTable;
