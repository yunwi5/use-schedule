import { faAngleLeft, faAngleRight } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import useWindowInnerWidth from '../../../hooks/useWindowInnerWidth';
import { WeekdayListMondayToSunday } from '../../../models/date-models/WeekDay';
import { WeeklyPlanner } from '../../../models/planner-models/WeeklyPlanner';
import { TemplatePlanner } from '../../../models/template-models/TemplatePlanner';
import { useWTableContext } from '../../../store/context/weekday-table-context';
import { addDays } from '../../../utilities/date-utils/date-control';
import DayTimeLine from './DayTimeLine';
import WeekdayLabel from './WeekdayLabel';
import WeekdayLine from './WeekdayLine';

interface Props {
    beginningPeriod: Date;
    planner: WeeklyPlanner | TemplatePlanner;
    onMutate: () => void;
}

// Table breakpoint should be 1000px.
// At this breakpoint, the width of each col should not shrink anymore.
// This means it should maintain its width, but the container should now be a horizontal scrollber
const WeekTable: React.FC<Props> = ({ beginningPeriod, planner, onMutate }) => {
    const { getTotalTableHeight, minCellWidth } = useWTableContext();
    const tableHeight: string = getTotalTableHeight();

    //TODO: Need refactoring on layout control part
    const [leftPos, setLeftPos] = useState(0);
    const gridRef = useRef<HTMLDivElement>(null);
    // Max scroll position is different for different screen sizes
    // Mobile screen max scroll position = 2, tablet screen max scroll position = 1
    const [maxScrollPos, setMaxScrollPos] = useState(2);
    useWindowInnerWidth({
        breakPoint: 650,
        // Control max scrolling position of calendar table relative to window inner width.
        aboveBreakPointCallback: () => setMaxScrollPos(1),
        belowBreakPointCallback: () => setMaxScrollPos(2),
    });
    // The scroll navigator dissapeared at 900px, so scroll pos should be reset at 900px.
    useWindowInnerWidth({ breakPoint: 900, aboveBreakPointCallback: () => setLeftPos(0) });

    const leftPosHandler = (dir: number) => {
        setLeftPos((prev) => Math.min(prev + dir, maxScrollPos));
    };

    const gridClass = `relative min-w-[calc(${minCellWidth}rem*7)] transition-all`;

    // DOM manipulation, so useLayoutEffect instead of useEffect
    useEffect(() => {
        if (gridRef.current === null) return;
        gridRef.current.style.left = -leftPos * 2 * minCellWidth + 'rem';
    }, [leftPos, minCellWidth]);

    const showLeftScrollNav = leftPos !== 0;
    const showRightScrollNav = leftPos !== maxScrollPos;

    return (
        <section className={`relative mt-3 flex flex-col overflow-hidden overflow-x-scroll`}>
            {showLeftScrollNav && (
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    onClick={leftPosHandler.bind(null, -1)}
                    className={`z-30 !absolute top-[50%] left-1 -translate-y-[50%] opacity-70 hover:opacity-100 w-[3rem] h-[3rem] inline-block rounded-full text-2xl border-2 border-slate-500 bg-slate-500 text-slate-50 cursor-pointer lg:hidden`}
                />
            )}
            {showRightScrollNav && (
                <FontAwesomeIcon
                    icon={faAngleRight}
                    onClick={leftPosHandler.bind(null, 1)}
                    className={`z-30 !absolute top-[50%] right-1 -translate-y-[50%] opacity-70 hover:opacity-100 w-[3rem] h-[3rem] inline-block rounded-full text-2xl border-2 border-slate-500 bg-slate-500 text-slate-50 cursor-pointer lg:hidden`}
                />
            )}
            {/* Width controller */}
            <div className={gridClass} ref={gridRef}>
                <div className={`pl-[2.55rem] border-b-2 border-slate-300 flex w-full`}>
                    {WeekdayListMondayToSunday.map((day, idx) => (
                        <WeekdayLabel key={idx} date={addDays(beginningPeriod, idx)} />
                    ))}
                </div>
                <div
                    className={`pl-1 relative w-full h-[90vh] overflow-y-scroll overflow-x-hidden`}
                >
                    <div className={`overflow-y-hidden`} style={{ height: tableHeight }}>
                        <div
                            className={`pl-[2.55rem] absolute top-0 left-0 flex w-full overflow-hidden`}
                        >
                            {WeekdayListMondayToSunday.map((day, idx) => {
                                const tasks = planner.getTasks(day);
                                const thisDate = addDays(beginningPeriod, idx);
                                return (
                                    <WeekdayLine
                                        key={idx}
                                        date={thisDate}
                                        tasks={tasks}
                                        onMutate={onMutate}
                                    />
                                );
                            })}
                        </div>
                        <DayTimeLine />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeekTable;
