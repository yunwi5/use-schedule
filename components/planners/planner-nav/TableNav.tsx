import React, { useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/pro-duotone-svg-icons';

import TaskStatusSummary from './TaskStatusSummary';
import { Planner } from '../../../models/planner-models/Planner';
import TableNavCard from '../../ui/cards/TableNavCard';
import { getNavigationPeriod } from '../../../utilities/gen-utils/format-util';
import Button from '@mui/material/Button';
import classes from './TableNav.module.scss';
import DropDownToggler from '../../ui/icons/DropDownToggler';

interface Props {
    beginningPeriod: Date;
    planner: Planner;
    onNavigateCurrentPeriod(): void;
    onChangePeriod: (direction: number) => void;
}

// Manages week navigation & tasks status overview
const TableNav: React.FC<Props> = (props) => {
    const { beginningPeriod, planner, onNavigateCurrentPeriod, onChangePeriod } = props;
    const [showSummaryPanel, setShowSummaryPanel] = useState(false);

    const plannerMode = useSelector((state: RootStateOrAny) => state.planner.plannerMode);
    const navPeriod = getNavigationPeriod(beginningPeriod, plannerMode);

    return (
        <TableNavCard className={classes.container}>
            <div className={`flex gap-1 items-center ${classes.navigation}`}>
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
                <Button
                    size="large"
                    className={`!ml-3 md:!mr-auto`}
                    onClick={onNavigateCurrentPeriod}
                >
                    <span className="text-xl capitalize">Today</span>
                </Button>
                <DropDownToggler
                    className={`ml-auto !mr-[.3rem]`}
                    showDropDown={showSummaryPanel}
                    onToggle={() => setShowSummaryPanel((ps) => !ps)}
                />
            </div>
            <TaskStatusSummary
                planner={planner}
                className={showSummaryPanel ? '' : classes.hide}
            />
        </TableNavCard>
    );
};

export default TableNav;
