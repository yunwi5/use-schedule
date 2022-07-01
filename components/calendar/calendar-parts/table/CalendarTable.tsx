import React, { useMemo, useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-regular-svg-icons';

import { Calendar } from '../../../../models/calendar-models/Calendar';
import { getShortWeekDayList } from '../../../../utilities/date-utils/weekday-util';
import useWindowInnerWidth from '../../../../hooks/useWindowInnerWidth';
import DayCell from './DayCell';
import classes from './CalendarTable.module.scss';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface Props {
    calendar: Calendar;
    onInvalidateItems(): void;
}

const CalendarTable: React.FC<Props> = ({ calendar, onInvalidateItems }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [leftPos, setLeftPos] = useState(0);
    const gridRef = useRef<HTMLSelectElement>(null);
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

    const weekDayList = useMemo(() => getShortWeekDayList(), []);
    const calendarDates = calendar.generateCalendarDays();

    const leftPosHandler = (dir: number) => {
        setLeftPos((prev) => Math.min(prev + dir, maxScrollPos));
    };

    // DOM manipulation, so useLayoutEffect instead of useEffect
    useEffect(() => {
        if (gridRef.current === null) return;
        gridRef.current.className = `${classes.grid} ${classes[`grid-${leftPos}`]}`;
    }, [leftPos]);

    const showLeftScrollNav = leftPos !== 0;
    const showRightScrollNav = leftPos !== maxScrollPos;

    return (
        <ClickAwayListener onClickAway={() => setSelectedId(null)}>
            <section className={`${classes.grid}`} ref={gridRef}>
                {weekDayList.map((day) => (
                    <div key={day} className={`${classes.cell} ${classes['day-label']}`}>
                        {day}
                    </div>
                ))}
                {showLeftScrollNav && (
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        onClick={leftPosHandler.bind(null, -1)}
                        className={`z-30 !absolute top-[50%] left-1 -translate-y-[50%] opacity-70 hover:opacity-100 w-[3rem] h-[3rem] inline-block rounded-full text-2xl border-2 border-slate-500 bg-slate-500 text-slate-50 cursor-pointer ${classes.navigator}`}
                    />
                )}
                {showRightScrollNav && (
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        onClick={leftPosHandler.bind(null, 1)}
                        className={`z-30 !absolute top-[50%] right-1 -translate-y-[50%] opacity-70 hover:opacity-100 w-[3rem] h-[3rem] inline-block rounded-full text-2xl border-2 border-slate-500 bg-slate-500 text-slate-50 cursor-pointer ${classes.navigator}`}
                    />
                )}
                {calendarDates.map((date, idx) => (
                    <DayCell
                        key={idx}
                        layoutId={date.toISOString()}
                        position={{
                            x: idx % 7,
                            y: Math.floor(idx / 7),
                            maxY: Math.floor((calendarDates.length - 1) / 7),
                        }}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        date={date}
                        items={calendar.getItems(date)}
                        onInvalidateItems={onInvalidateItems}
                        beginningPeriod={calendar.beginningPeriod}
                    />
                ))}
            </section>
        </ClickAwayListener>
    );
};

export default CalendarTable;
