import TableNav from '../planner-nav/TableNav';
import MontlyList from './MontlyList';
import { MontlyPlanner } from '../../../models/planner-models/MontlyPlanner';

interface Props {
    monthBeginning: Date;
    planner: MontlyPlanner;
    onChangeMonth: (direction: number) => void;
    onNavigateCurrentPeriod(): void;
    onMutate: () => void;
}

const MontlyTable: React.FC<Props> = (props) => {
    const { monthBeginning, planner, onChangeMonth, onNavigateCurrentPeriod, onMutate } = props;

    return (
        <div>
            <TableNav
                beginningPeriod={monthBeginning}
                planner={planner}
                onNavigateCurrentPeriod={onNavigateCurrentPeriod}
                onChangePeriod={onChangeMonth}
            />
            <MontlyList beginningPeriod={monthBeginning} planner={planner} onMutate={onMutate} />
        </div>
    );
};

export default MontlyTable;
