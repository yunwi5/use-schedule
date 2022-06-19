import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { SortingDirection, EventSort, EventSortList } from '../../models/sorting-models';
import { shuffleList } from '../../utilities/gen-utils/list-util';
import ItemSorter from './ItemSorter';
import PageNav from '../ui/navigation/PageNav';
import classes from './SearchMain.module.scss';
import { IEvent } from '../../models/Event';
import { sortEvents } from '../../utilities/sort-utils/event-sort';
import { adjustOverdueevents } from '../../utilities/event-utils/event-util';
import EventSearchList from './list/EventSearchList';

interface Props {
    searchWord: string;
    onInvalidate(): void;
    searchedEvents: IEvent[];
}
const ITEMS_PER_PAGE = 7;

const EventSearchMain: React.FC<Props> = (props) => {
    const { searchWord, searchedEvents, onInvalidate } = props;
    const [currentEvents, setCurrentEvents] = useState(searchedEvents);

    const [page, setPage] = useState(1);
    const [pageEvents, setPageEvents] = useState<IEvent[]>([]);

    const [sortingStandard, setSortingStandard] = useState<EventSort | null>(null);

    const eventLength = useMemo(() => searchedEvents.length, [searchedEvents]);

    const pageNavHandler = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    const sortingHandler = useCallback(
        (standard: string, direction: SortingDirection) => {
            const validStandard = standard as EventSort;
            setSortingStandard(validStandard);
            if (!standard || !direction) return;

            const newSortedEvents = sortEvents([...searchedEvents], validStandard, direction);
            setCurrentEvents(newSortedEvents as IEvent[]);
        },
        [searchedEvents],
    );

    const randomizeHandler = useCallback(() => {
        const shuffledList = shuffleList([...searchedEvents]);
        setCurrentEvents(shuffledList);
    }, [searchedEvents]);

    useEffect(() => {
        const pageIndex = page - 1;
        const startingIndex = pageIndex * ITEMS_PER_PAGE;
        const newPageEvents = currentEvents.slice(startingIndex, startingIndex + ITEMS_PER_PAGE);
        setPageEvents(newPageEvents);
    }, [page, currentEvents]);

    useEffect(() => {
        adjustOverdueevents(searchedEvents);
        setCurrentEvents(searchedEvents);
    }, [searchedEvents]);

    return (
        <main className={`mx-auto ${classes.search}`}>
            <h2 className="text-4xl text-slate-600 mb-5">
                Events that match your search{' '}
                <span className="text-slate-400">&quot;{searchWord}&quot;</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-between gap-5 mt-9">
                <ItemSorter
                    onSort={sortingHandler}
                    sortList={EventSortList}
                    onRandomize={randomizeHandler}
                />
                {/* self-end h-[0px] max-w-xl text-right text-xl font-semibold text-slate-500 translate-y-[1.5rem] pr-2 */}
                <h5 className="self-start sm:self-center max-w-xl sm:text-right text-xl font-semibold text-slate-500 pr-2">
                    {eventLength} Events Found
                </h5>
            </div>
            <EventSearchList
                events={pageEvents}
                sortingStandard={sortingStandard}
                onInvalidate={onInvalidate}
            />
            <PageNav
                onChangePage={pageNavHandler}
                itemsPerPage={ITEMS_PER_PAGE}
                numberOfItems={eventLength}
            />
        </main>
    );
};

export default EventSearchMain;
