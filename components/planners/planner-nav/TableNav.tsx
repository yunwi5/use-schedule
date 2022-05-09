import React, { Fragment } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/pro-duotone-svg-icons';

import TaskStatusSummary from './TaskStatusSummary';
import { Planner } from '../../../models/planner-models/Planner';
import TableNavCard from '../../ui/cards/TableNavCard';
import { getNavigationPeriod } from '../../../utilities/gen-utils/format-util';

interface Props {
    beginningPeriod: Date;
    planner: Planner;
    onChangePeriod: (direction: number) => void;
}

// Manages week navigation & tasks status overview
const TableNav: React.FC<Props> = (props) => {
    const { beginningPeriod, planner, onChangePeriod } = props;

    const plannerMode = useSelector((state: RootStateOrAny) => state.planner.plannerMode);
    const navPeriod = getNavigationPeriod(beginningPeriod, plannerMode);

    return (
        <TableNavCard>
            <div className="flex items-center gap-1 text-xl">
                <FontAwesomeIcon
                    className="text-4xl cursor-pointer max-w-[1.2rem]"
                    icon={faCaretLeft}
                    onClick={onChangePeriod.bind(null, -1)}
                />
                <p>{navPeriod}</p>
                <FontAwesomeIcon
                    className="text-4xl cursor-pointer max-w-[1.2rem]"
                    icon={faCaretRight}
                    onClick={onChangePeriod.bind(null, 1)}
                />
            </div>
            <TaskStatusSummary planner={planner} />
        </TableNavCard>
    );
};

export default TableNav;
