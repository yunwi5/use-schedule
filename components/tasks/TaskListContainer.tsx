import React, { useState, useMemo, Fragment, useCallback } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';

import TaskList from './TaskList';
import ListHeading from './task-support/ListHeading';
import { WeekDay, getWeekDayFromIndex } from '../../models/date-models/WeekDay';
import { Month, getMonthFromIndex } from '../../models/date-models/Month';
import { WeekNumber, getWeekFromIndex } from '../../models/date-models/WeekNumber';
import { Planner } from '../../models/planner-models/Planner';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { addDays } from '../../utilities/date-utils/date-control';
import { getMonthName, getWeekInterval } from '../../utilities/date-utils/month-util';
import { getShortName } from '../../utilities/gen-utils/string-util';
import { sortTaskByTime } from '../../utilities/sort-utils/sort-util';
import { getMonthEnding } from '../../utilities/date-utils/date-get';
import { getDaySuffixed } from '../../utilities/gen-utils/format-util';
import { Task } from '../../models/task-models/Task';

interface Props {
    beginningPeriod: Date;
    index: number;
    onMutate: () => void;
    tasks: Task[];
}

function getHeadingLabels(plannerMode: PlannerMode, beginningPeriod: Date, index: number) {
    let labelMain = '',
        labelSub = '',
        headingText: string | JSX.Element = '';
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
            const day = getWeekDayFromIndex(index);
            const shortDay = getShortName(day);

            const curr = addDays(beginningPeriod, index);
            const currMonth = getMonthName(curr);

            const isDateAny = day === WeekDay.ANY;
            let currDate = !isDateAny ? curr.getDate().toString() : '?';
            labelMain = currDate;
            labelSub = currMonth;
            headingText = shortDay;
            break;
        case PlannerMode.TEMPLATE:
            // let day = getWeekFromIndex(index);
            const templateShortDay = getShortName(getWeekDayFromIndex(index));
            labelMain = `${index + 1}`;
            labelSub = 'Day';
            headingText = templateShortDay;
            break;
        case PlannerMode.MONTLY:
            const week: WeekNumber = getWeekFromIndex(index);
            const weekNumber = index + 1;

            let beginning: Date, ending: Date;
            if (week !== WeekNumber.ANY) {
                [beginning, ending] = getWeekInterval(beginningPeriod, weekNumber);
            } else {
                beginning = beginningPeriod;
                ending = getMonthEnding(beginningPeriod);
            }
            const sameBeginAndEndingDay = beginning.getDate() === ending.getDate();
            const beginningDay = getDaySuffixed(beginning);
            const endingDay = getDaySuffixed(ending);

            const isWeekAny = week === WeekNumber.ANY;
            labelMain = !isWeekAny ? `${index + 1}` : '?';
            labelSub = 'week';

            const formatTextElem2 = !sameBeginAndEndingDay ? (
                <span className="text-lg">
                    {beginningDay}~{endingDay}
                </span>
            ) : (
                <span className="text-2xl">{beginningDay}</span>
            );

            headingText = !isWeekAny ? <span>{formatTextElem2}</span> : <span>Any</span>;
            break;
        case PlannerMode.YEARLY:
            const month = getMonthFromIndex(index);
            const isMonthAny = month === Month.ANY;

            labelMain = !isMonthAny ? `${index + 1}` : '?';
            labelSub = 'mon';
            headingText = getShortName(month);
            break;
    }

    return { labelMain, labelSub, headingText };
}

const TaskListContainer: React.FC<Props> = (props) => {
    const { beginningPeriod, index, onMutate, tasks } = props;
    const [isShrinked, setIsShrinked] = useState(false);

    const plannerMode = useSelector((state: RootStateOrAny) => state.planner.plannerMode);

    const handleShrinked = useCallback((shrink: boolean) => {
        setIsShrinked(shrink);
    }, []);

    // Possibly needs to be validated
    const sortedTasksList = useMemo(() => tasks.sort(sortTaskByTime), [tasks]);

    const { labelMain, labelSub, headingText } = getHeadingLabels(
        plannerMode,
        beginningPeriod,
        index,
    );

    return (
        <div className="ml-4 my-4">
            <ListHeading
                labelMain={labelMain}
                labelSub={labelSub}
                headingText={headingText}
                isShrinked={isShrinked}
                onToggleShrink={() => setIsShrinked((prevState) => !prevState)}
            />
            <TaskList
                beginningPeriod={beginningPeriod}
                onMutate={onMutate}
                onShrink={handleShrinked}
                taskList={!isShrinked ? sortedTasksList : []}
            />
        </div>
    );
};

export default TaskListContainer;
