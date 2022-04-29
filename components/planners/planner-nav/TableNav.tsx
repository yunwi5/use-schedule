import React, { Fragment } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/pro-duotone-svg-icons";

import TaskStatusSummary from "./TaskStatusSummary";
import { Planner } from "../../../models/planner-models/Planner";
import { PlannerMode } from "../../../models/planner-models/PlannerMode";
import {
    getMonthWeekBeginning,
    getMonthWeekEnding,
    getWeekEnding,
    getYearEnding,
} from "../../../utilities/date-utils/date-get";
import { getMonthName } from "../../../utilities/date-utils/month-util";
import { getMonthMember } from "../../../models/date-models/Month";
import TableNavCard from "../../ui/cards/TableNavCard";

interface Props {
    beginningPeriod: Date;
    planner: Planner;
    onChangePeriod: (direction: number) => void;
}

function getPeriodFormat(beginningPeriod: Date, endingPeriod: Date): string {
    const beginDate = beginningPeriod.getDate();
    const beginMonth = getMonthName(beginningPeriod);
    const endDate = endingPeriod.getDate();
    const endMonth = getMonthName(endingPeriod);
    return `${beginDate}/${beginMonth} ~ ${endDate}/${endMonth}`;
}

// Needs to be fixed
function getNavigationPeriod(beginningPeriod: Date, plannerMode: PlannerMode) {
    let navPeriod: string | JSX.Element = "";
    if (plannerMode === PlannerMode.WEEKLY) {
        const weekEnding = getWeekEnding(beginningPeriod);
        navPeriod = getPeriodFormat(beginningPeriod, weekEnding);
    } else if (plannerMode === PlannerMode.MONTLY) {
        // const monthWeekBeginning = getMonthWeekBeginning(beginningPeriod);
        // const monthWeekEnding = getMonthWeekEnding(beginningPeriod);
        // navPeriod = getPeriodFormat(monthWeekBeginning, monthWeekEnding);
        // navPeriod = "" + beginningPeriod.toLocaleDateString('en-US', {
        // 	month: 'long'
        // });
        const year = beginningPeriod.getFullYear();
        const month = getMonthMember(beginningPeriod);
        navPeriod = (
            <Fragment>
                <span className="text-gray-600 text-[110%] font-semibold">{month}</span> ({year})
            </Fragment>
        );
    } else if (plannerMode === PlannerMode.YEARLY) {
        // const yearEnding = getYearEnding(beginningPeriod);
        navPeriod = "" + beginningPeriod.getFullYear();
    }
    // else throw new Error("Planner mode matches noting from TableNav");
    return navPeriod;
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
