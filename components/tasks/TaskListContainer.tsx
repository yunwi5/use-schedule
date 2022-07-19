import React, { useState, useMemo, Fragment, useCallback } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';

import TaskList from './TaskList';
import ListHeading from './task-support/ListHeading';
import { WeekDay, getWeekDayFromIndex } from '../../models/date-models/WeekDay';
import { Month, getMonthFromIndex } from '../../models/date-models/Month';
import { WeekNumber, getWeekFromIndex } from '../../models/date-models/WeekNumber';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { addDays, addMonths, addWeeks } from '../../utilities/date-utils/date-control';
import { getMonthName, getWeekInterval } from '../../utilities/date-utils/month-util';
import { getShortName } from '../../utilities/gen-utils/string-util';
import { sortTaskByTime } from '../../utilities/sort-utils/sort-util';
import { getMonthEnding } from '../../utilities/date-utils/date-get';
import { getDaySuffixed } from '../../utilities/gen-utils/format-util';
import { Task } from '../../models/task-models/Task';
import TaskAdd from '../planners/planner-crud/TaskAdd';

interface Props {
    beginningPeriod: Date;
    index: number;
    onMutate: () => void;
    tasks: Task[];
}

function getHeadingInfo(plannerMode: PlannerMode, beginningPeriod: Date, index: number) {
    let labelMain = '',
        labelSub = '',
        headingText: string | JSX.Element = '';
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
            const day = getWeekDayFromIndex(index);
            const shortDay = getShortName(day);

            const date = addDays(beginningPeriod, index);
            const currMonth = getMonthName(date);

            const isDateAny = day === WeekDay.ANY;
            let dateFormat = !isDateAny ? date.getDate().toString() : '?';
            labelMain = dateFormat;
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

function getListDate(plannerMode: PlannerMode, beginningPeriod: Date, index: number): Date {
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
        case PlannerMode.TEMPLATE:
            return addDays(beginningPeriod, index);
        case PlannerMode.MONTLY:
            return addWeeks(beginningPeriod, index);
        case PlannerMode.YEARLY:
            return addMonths(beginningPeriod, index);
        default:
            console.warn('PlannerMode is invalid:', plannerMode);
            return beginningPeriod;
    }
}

const TaskListContainer: React.FC<Props> = (props) => {
    const { beginningPeriod, index, onMutate, tasks } = props;

    const plannerMode = useSelector((state: RootStateOrAny) => state.planner.plannerMode);
    const [showTaskAdd, setShowTaskAdd] = useState(false);
    const [isShrinked, setIsShrinked] = useState(false);

    const handleShrinked = useCallback((shrink: boolean) => {
        setIsShrinked(shrink);
    }, []);

    const handleTaskAdd = useCallback(() => {
        onMutate();
        setShowTaskAdd(false);
    }, [onMutate]);

    // Possibly needs to be validated
    const sortedTasksList = useMemo(() => tasks.sort(sortTaskByTime), [tasks]);

    const { labelMain, labelSub, headingText } = getHeadingInfo(
        plannerMode,
        beginningPeriod,
        index,
    );
    const listDate = getListDate(plannerMode, beginningPeriod, index);

    return (
        <>
            <div className="mt-8 lg:mt-4 first:mt-0 my-4 px-3 pr-3 lg:pr-10">
                <ListHeading
                    labelMain={labelMain}
                    labelSub={labelSub}
                    headingText={headingText}
                    isShrinked={isShrinked}
                    onShowTaskAdd={() => setShowTaskAdd(true)}
                    onToggleShrink={() => setIsShrinked((prevState) => !prevState)}
                />
                <TaskList
                    onMutate={onMutate}
                    onShrink={handleShrinked}
                    taskList={!isShrinked ? sortedTasksList : []}
                />
            </div>
            {showTaskAdd && (
                <TaskAdd
                    beginningPeriod={listDate}
                    onClose={() => setShowTaskAdd(false)}
                    onAddTask={handleTaskAdd}
                />
            )}
        </>
    );
};

export default TaskListContainer;
