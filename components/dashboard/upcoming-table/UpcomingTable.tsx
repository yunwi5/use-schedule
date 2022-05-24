import React, { useMemo, useState } from 'react';
import { AnalysisItem } from '../../../models/analyzer-models/AnalysisItem';
import { CalendarItemType } from '../../../models/calendar-models/CalendarItemType';
import { IEvent, isInstanceOfEvent } from '../../../models/Event';
import { AbstractTask } from '../../../models/task-models/AbstractTask';
import { isInstanceOfTask } from '../../../models/task-models/Task';
import { compareByDateTime } from '../../../utilities/sort-utils/sort-util';
import { useDashboardContext } from '../dashboard-context';
import UpcomingEventItem from './UpcomingEventItem';
import UpcomingTaskItem from './UpcomingTaskItem';

const UpcomingItemModeList = [CalendarItemType.EVENT, CalendarItemType.TASK];

function getCurrentPeriodItemsInOrder(
    items: AnalysisItem[],
    currentPeriod: Date,
    limit: number = 20,
) {
    // excluding past items
    const upcomingItems = items.filter((item) => {
        // if the item is before the current date, filter it out
        return item.dateTime.getTime() >= currentPeriod.getTime();
    });

    const upcomingSortedList = upcomingItems.sort((itemA, itemB) =>
        compareByDateTime(itemA, itemB),
    );
    return upcomingSortedList.slice(0, limit);
}

const UpcomingTable: React.FC = () => {
    const { events, tasks, currentPeriod } = useDashboardContext();
    const [mode, setMode] = useState(CalendarItemType.EVENT);

    const upcomingItems = useMemo(() => {
        const selectedItems = mode === CalendarItemType.EVENT ? events : tasks;
        const upcomingItems = getCurrentPeriodItemsInOrder(selectedItems, currentPeriod, 20);
        return upcomingItems;
    }, [mode, currentPeriod, events, tasks]);

    return (
        <div className={''}>
            <div className="py-2 px-3 flex justify-between items-center bg-slate-100 border-b-2 border-slate-300">
                <h3 className="text-2xl">Upcomings</h3>
                <div className="text-lg flex gap-2 items-center">
                    {UpcomingItemModeList.map((itemMode) => (
                        <div key={itemMode}>
                            <button
                                onClick={() => setMode(itemMode)}
                                className={`inline-block min-w-[3.5rem] lg:min-w-[5rem] px-3 py-1 rounded-md ${
                                    mode === itemMode
                                        ? 'bg-slate-500/90 text-slate-50 shadow-md'
                                        : ''
                                }`}
                            >
                                {itemMode}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <ul className={`max-h-[20.7rem] overflow-scroll`}>
                {upcomingItems.map((item, idx) => {
                    if (isInstanceOfEvent(item)) {
                        return <UpcomingEventItem key={item.id} event={item as IEvent} />;
                    } else if (isInstanceOfTask(item)) {
                        return <UpcomingTaskItem key={item.id} task={item as AbstractTask} />;
                    }
                    return <span key={idx} />;
                })}
            </ul>
        </div>
    );
};

export default UpcomingTable;
