import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';
import Button from '@mui/material/Button';

import { Calendar } from '../../../../models/calendar-models/Calendar';
import { useAppDispatch, useAppSelector } from '../../../../store/redux';
import { calendarActions } from '../../../../store/redux/calendar-slice';
import { AgendaDayCell, AgendaItemsLabel } from './index';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';

interface Props {
    calendar: Calendar;
    onInvalidateItems(target?: CalendarItemType): void;
}

const CalendarAgenda: React.FC<Props> = ({ calendar, onInvalidateItems }) => {
    const calendarDays: Date[] = calendar.generateCalendarDays();

    const showAgendaDropdown: boolean = useAppSelector(
        (state) => state.calendar.showAgendaDropdown,
    );
    const dispatch = useAppDispatch();

    const toggleCollapsed = () => dispatch(calendarActions.toggleAgendaCollapsed());

    return (
        <section className="flex flex-col gap-5 pt-3 pb-6 px-2 xs:px-3 md:px-5 max-h-[86vh] overflow-y-scroll hide-scrollbar text-lg bg-slate-50/70 border-t-2 border-slate-300">
            <div className="flex justify-between -mb-3">
                <AgendaItemsLabel />
                <Button onClick={toggleCollapsed}>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className={`inline-block mr-1 max-w-[1.5rem] text-xl hover:scale-125 ml-auto cursor-pointer transition-all ${
                            showAgendaDropdown ? 'rotate-180' : ''
                        }`}
                    />
                    {showAgendaDropdown ? 'Collapse All' : 'Expand All'}
                </Button>
            </div>
            {calendarDays.map((day) => (
                <AgendaDayCell
                    key={day.getTime()}
                    date={day}
                    items={calendar.getItems(day)}
                    onInvalidateItems={onInvalidateItems}
                />
            ))}
        </section>
    );
};

export default CalendarAgenda;
